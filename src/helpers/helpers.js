export const imageUrl = (book) => {
  let url = book && book.imageLinks ? book.imageLinks.thumbnail : '';
  return 'url(' + url + ')';
}

export const filterByType = (list, type) => {
  let key = Object.keys(type)[0];

  return list.filter((l) => l[key] === type[key]);
}

export const inArray = (item, arr) => arr.indexOf(item) > -1;