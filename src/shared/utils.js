export function declinationTitle(key, num) {
  const names = {
    product: ['Изделия', 'Изделие'],
    component: ['Детали', 'Деталь'],
    workshop: ['Цеха', 'Цех'],
    route: ['Маршрута', 'Маршрут'],
    default: ['Элемента', 'Элемент']
  }

  if(!names[key]) {
    key = 'default';
  }

  return names[key][num];
}