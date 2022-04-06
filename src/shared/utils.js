export function declinationTitle(key, num) {
  const names = {
    productData: ['Изделия', 'Изделие'],
    componentData: ['Детали', 'Деталь'],
    workshopData: ['Цеха', 'Цех'],
    routeData: ['Маршрута', 'Маршрут'],
    default: ['Элемента', 'Элемент']
  }

  if(!names[key]) {
    key = 'default';
  }

  return names[key][num];
}

export function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function filterWorkshops(workshops, arr) {
  if(!arr.length) return workshops;

  return workshops.filter(workshop => arr.reduce((accum, item) => {
    return item.id === workshop.id ? false : true && accum
  }, true));
}
