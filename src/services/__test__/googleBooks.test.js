import { getBooks } from "../googleBooks";

const mockResponseData = {
  items: [
    { volumeInfo: { publishedDate: '2010-05-12', language: 'en' } },
    { volumeInfo: { publishedDate: '2012-05-16', language: 'en' } },
    { volumeInfo: { publishedDate: '2015-06-09', language: 'de' } },
    { volumeInfo: { publishedDate: '2009-04-30', language: 'de' } },
    { volumeInfo: { publishedDate: '2003-01-12', language: 'fr' } },
    { volumeInfo: { publishedDate: '2020-01-14', language: 'fr' } },
    { volumeInfo: { publishedDate: '2019-10-17', language: 'pl' } },
    { volumeInfo: { publishedDate: '2018-12-11', language: 'pl' } }
  ],
  totalItems: 54,
};

describe('googleBooks', () => {

  test('calls API with correct title', async () => {
    fetch.once(req => req.url === 'https://www.googleapis.com/books/v1/volumes?q=+intitle:Ender%27s%20game&startIndex=0'
      ? Promise.resolve().then(res => JSON.stringify(mockResponseData))
      : Promise.reject(new Error('bad url: ' + req.url)));
    const res = await getBooks({
      afterDate: 'false',
      inauthor: '',
      intitle: 'Ender\'s game',
      lang: '',
      publishedDate: '',
    }, 0);
    expect(res).toStrictEqual({ ...mockResponseData, unfilteredItems: 8 });
  });

  test('calls API with correct author', async() => {
    fetch.once(req => req.url === 'https://www.googleapis.com/books/v1/volumes?q=+inauthor:Orson%20Scott%20Card&startIndex=0'
      ? Promise.resolve().then(res => JSON.stringify(mockResponseData))
      : Promise.reject(new Error('bad url: ' + req.url)));
    const res = await getBooks({
      afterDate: 'false',
      inauthor: 'Orson Scott Card',
      intitle: '',
      lang: '',
      publishedDate: '',
    }, 0);
    expect(res).toStrictEqual({ ...mockResponseData, unfilteredItems: 8 });
  });

  test('calls API with correct title and author', async() => {
    fetch.once(req => req.url === 'https://www.googleapis.com/books/v1/volumes?q=+intitle:Ender%27s%20game+inauthor:Orson%20Scott%20Card&startIndex=0'
      ? Promise.resolve().then(res => JSON.stringify(mockResponseData))
      : Promise.reject(new Error('bad url: ' + req.url)));
    const res = await getBooks({
      afterDate: 'false',
      inauthor: 'Orson Scott Card',
      intitle: 'Ender\'s game',
      lang: '',
      publishedDate: '',
    }, 0);
    expect(res).toStrictEqual({ ...mockResponseData, unfilteredItems: 8 });
  });

  test('filters Api response by date (after)', async() => {
    fetch.once(req => req.url === 'https://www.googleapis.com/books/v1/volumes?q=+intitle:Ender%27s%20game+inauthor:Orson%20Scott%20Card&startIndex=0'
      ? Promise.resolve().then(res => JSON.stringify(mockResponseData))
      : Promise.reject(new Error('bad url: ' + req.url)));
    const res = await getBooks({
      afterDate: 'true',
      inauthor: 'Orson Scott Card',
      intitle: 'Ender\'s game',
      lang: '',
      publishedDate: '2018-02-01',
    }, 0);
    expect(res.items.length).toBe(3);
  });

  test('filters Api response by date (before)', async() => {
    fetch.once(req => req.url === 'https://www.googleapis.com/books/v1/volumes?q=+intitle:Ender%27s%20game+inauthor:Orson%20Scott%20Card&startIndex=0'
      ? Promise.resolve().then(res => JSON.stringify(mockResponseData))
      : Promise.reject(new Error('bad url: ' + req.url)));
    const res = await getBooks({
      afterDate: 'false',
      inauthor: 'Orson Scott Card',
      intitle: 'Ender\'s game',
      lang: '',
      publishedDate: '2018-02-01',
    }, 0);
    expect(res.items.length).toBe(5);
  });

  test('filters Api response by lang', async() => {
    fetch.once(req => req.url === 'https://www.googleapis.com/books/v1/volumes?q=+intitle:Ender%27s%20game+inauthor:Orson%20Scott%20Card&startIndex=0'
      ? Promise.resolve().then(res => JSON.stringify(mockResponseData))
      : Promise.reject(new Error('bad url: ' + req.url)));
    const res = await getBooks({
      afterDate: 'false',
      inauthor: 'Orson Scott Card',
      intitle: 'Ender\'s game',
      lang: 'pl',
      publishedDate: '',
    }, 0);
    expect(res.items.length).toBe(2);
  });
});