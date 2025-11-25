import menu from '../../config/menu.json' assert { type: 'json' };

export function showMenu() {
  const sizes = menu.sizes.join(' / ');
  let text = `📜 *Menu Pizzaria Transalpina*\nTamanhos: ${sizes}\n\n*Pizzas Fixas:*\n`;
  menu.pizzas_fixed.forEach(p => {
    text += `• ${p.name} — ${p.prices.map((pr,i)=>`${menu.sizes[i]} ${pr.toFixed(2)}€`).join(' • ')}\n`;
  });
  text += '\n*Pão de alho:* \n';
  menu.pao_de_alho.forEach(p => text += `• ${p.name} — ${p.price.toFixed(2)}€\n`);
  text += '\n*Bebidas:* \n';
  menu.bebidas.forEach(d => text += `• ${d.name} — ${d.price.toFixed(2)}€\n`);
  text += '\n*Sobremesas:* \n';
  menu.sobremesas.forEach(s => text += `• ${s.name} — ${s.price.toFixed(2)}€\n`);
  return text;
}
