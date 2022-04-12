
const API_URL = 'https://www.googleapis.com/books/v1/volumes';

const getBooks = async (query) => {
  if (!query.q) throw Error('_q_ parameter required');

  const url = API_URL + '?q=' + query.q;

  return await fetch(url)
    .then(data =>{
      if (data.status >= 400) throw Error(data.status);
      return data.json()})
};

export { getBooks };