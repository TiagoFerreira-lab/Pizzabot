import menu from '../../config/menu.json' assert { type: 'json' };
export function showDrinks(){ let txt='🥤 *Bebidas disponíveis:*\n'; menu.bebidas.forEach(d=> txt += `• ${d.name} — ${d.price.toFixed(2)}€\n`); return txt; }
