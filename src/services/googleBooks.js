
const API_URL = 'https://www.googleapis.com/books/v1/volumes';

/**
 * Function sends book requests
 * @param {object} query object specifying search filters
 * @param {integer} startIndex number specifying first returned element
 * @returns filtered book list
 */
const getBooks = async (query, startIndex) => {
  // add API filters 
  let url = API_URL + '?q=';
  if (query.intitle) url += '+intitle:' + encodeURIComponent(query.intitle);
  if (query.inauthor) url += '+inauthor:' + encodeURIComponent(query.inauthor);
  
  // add pagination 
  url += '&startIndex=' + startIndex;
  
  // get data
  return await fetch(url)
    .then(res => {
      if (res.status >= 400) throw Error(res.status);
      return res.json();
    })
    .then(data => {
      data.unfilteredItems = data.items.length;
      if (query.publishedDate) {
        data.items = data.items.filter(item => query.afterDate === 'true' 
            ? Date.parse(item.volumeInfo.publishedDate) >= Date.parse(query.publishedDate)
            : Date.parse(item.volumeInfo.publishedDate) <= Date.parse(query.publishedDate)
        );
      }

      if (query.lang) {
        data.items = data.items.filter(item => query.lang === item.volumeInfo.language);
      }

      return data;
    });
};

export { getBooks };