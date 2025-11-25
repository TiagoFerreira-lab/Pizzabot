import { getState, setState, clearState } from '../../services/state.js';
import { showMenu } from './menu.js';
import { showDrinks } from './drinks.js';
import { priceCustomPizza } from './custom_pizza.js';

export default async function conversationFlow(user, text){
  const state = getState(user);
  const msg = (text||'').trim().toLowerCase();

  if(state.step === 'welcome'){
    setState(user, { step: 'awaiting_action' });
    return 'Olá! Sou o Pizzabot 🍕. Queres ver o *menu* ou fazer um *pedido*?';
  }

  if(msg.includes('menu')) return showMenu();

  if(msg.includes('pedido') || msg.includes('fazer pedido')){
    setState(user, { step: 'choose_type' });
    return "Queres uma *pizza fixa* ou uma *pizza personalizada*? Responde: 'fixa' ou 'personalizada'.";
  }

  if(state.step === 'choose_type'){
    if(msg.includes('fixa')){ setState(user, { step: 'choose_fixed' }); return "Escreve o nome da pizza fixa que queres (ex: Transalpina, CBB...)."; }
    if(msg.includes('personalizada')|| msg.includes('personalizada')){ setState(user, { step: 'custom_size' }); return 'Qual o tamanho? (Pequena / Média / Familiar / Gigante)'; }
    return "Não entendi. Escreve 'fixa' ou 'personalizada'.";
  }

  if(state.step === 'choose_fixed'){
    setState(user, { step: 'confirm_fixed', pizza: text });
    return `Confirmas o pedido da pizza *${text}*? Escreve 'sim' para confirmar ou 'alterar' para escolher outra.`;
  }

  if(state.step === 'confirm_fixed'){
    if(msg === 'sim'){ setState(user, { step: 'ask_drink' }); return 'Queres adicionar bebida? Se sim, escreve o nome ou "não".'; }
    else{ setState(user, { step: 'choose_fixed' }); return 'Ok, escolhe outra pizza fixa.'; }
  }

  if(state.step === 'custom_size'){
    const sizeCap = ['Pequena','Média','Familiar','Gigante'].find(s=> s.toLowerCase()===msg);
    if(!sizeCap) return 'Não reconheci o tamanho. Escreve Pequena, Média, Familiar ou Gigante.';
    setState(user, { step: 'custom_count', size: sizeCap });
    return 'Quantos ingredientes queres (número)? (ex: 1, 2, 3, 4, 5...)';
  }

  if(state.step === 'custom_count'){
    const n = parseInt(msg,10);
    if(isNaN(n) || n<0) return 'Escreve um número válido de ingredientes.';
    setState(user, { step: 'custom_ingredients_count', count: n });
    const price = priceCustomPizza(state.size || 'Pequena', n);
    setState(user, { custom_price_preview: price });
    return `Preço estimado: ${price ? price.toFixed(2) : 'N/A'}€. Agora diz-me os ingredientes (separados por vírgula). Exemplos: Alho, Azeitonas, Bacon.`;
  }

  if(state.step === 'custom_ingredients_count'){
    setState(user, { ingredients: text.split(',').map(s=>s.trim()), step: 'confirm_custom' });
    return `Confirmas a pizza personalizada com: ${text}? Escreve 'confirmar' para finalizar ou 'alterar' para mudar.`;
  }

  if((state.step === 'confirm_custom' || state.step === 'ask_drink') && (msg === 'confirmar' || msg === 'sim')){
    const s = getState(user);
    const summaryParts = [];
    if(s.pizza) summaryParts.push(`Pizza fixa: ${s.pizza}`);
    if(s.size) summaryParts.push(`Pizza personalizada: ${s.size} - Ingredientes: ${s.ingredients?.join(', ')}`);
    if(s.bebida) summaryParts.push(`Bebida: ${s.bebida}`);
    const total = s.custom_price_preview || 0;
    clearState(user);
    return `✅ Pedido confirmado!\n${summaryParts.join('\n')}\nTotal estimado: ${total.toFixed(2)}€\nObrigado! 🍕`;
  }

  if(state.step === 'ask_drink'){
    if(msg === 'não' || msg === 'nao') { setState(user,{ step: 'finalize'}); return "Sem bebida. Escreve 'confirmar' para finalizar o pedido."; }
    else { setState(user,{ bebida: text, step: 'finalize'}); return `Adicionada bebida: ${text}. Escreve 'confirmar' para finalizar.`; }
  }

  return "Desculpa, não entendi. Escreve 'menu' para ver o menu ou 'pedido' para iniciar um pedido.";
}
