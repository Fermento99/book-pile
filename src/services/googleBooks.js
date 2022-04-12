
const API_URL = 'https://www.googleapis.com/books/v1/volumes';

const getBooks = async (query) => {

  let url = API_URL + '?q=';
  if (query.intitle) url += '+intitle:' + query.intitle;
  if (query.inauthor) url += '+inauthor:' + query.inauthor;

  return await fetch(url)
    .then(res => {
      if (res.status >= 400) throw Error(res.status);
      return res.json();
    })
    .then(data => {
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