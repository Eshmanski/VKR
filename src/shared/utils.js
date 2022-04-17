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

export function formalizeState(data) {
  if(data.items === undefined) {
    data.items = [];
    return data;
  }

  data.items = Object.keys(data.items).map(key => {
    switch(data.name) {
      case 'Маршруты':
        if(data.items[key].body.workshopNodes === undefined) data.items[key].body.workshopNodes = [];
        if(data.items[key].body.lines === undefined) data.items[key].body.lines = [];
        break;
      case 'Изделия':
        if(data.items[key].body.componentsId === undefined) data.items[key].body.componentsId = [];
        break;
      default: 
        break;
    }

    return {...data.items[key], id: key};
  });

  return data;
}

export function kitcut(text, limit) {
  text = text.trim();
  if( text.length <= limit) return text;

  text = text.slice(0, limit);

  return text.trim() + "...";
}