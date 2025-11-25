import menu from '../../config/menu.json' assert { type: 'json' };
export function priceCustomPizza(size, ingredientsCount){
  const sizePrices = menu.custom_pizzas.prices[size];
  if(!sizePrices) return null;
  const base = sizePrices[String(ingredientsCount)] ?? sizePrices['0'];
  if(ingredientsCount > 4){
    const extra = ingredientsCount - 4;
    return base + extra * sizePrices.per_ingredient;
  }
  return base;
}
export function listCustomCategories(){ return menu.custom_pizzas.categories; }
