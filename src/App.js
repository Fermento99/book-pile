import React, { useState } from 'react';
import List from './components/list/List';
import LoadingWindow from './components/LoadingWindow';
import SearchBar from './components/searchbar/SearchBar';
import { getBooks } from './services/googleBooks';

function App() {
  const [query, setQuery] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  // search for books according to query
  const search = (q) => {
    setLoaded(false);
    setQuery(q);
    getBooks(q, 0).then(res => {
      setData([...res.items]);
      setLoaded(true);
      setPage(res.unfilteredItems < res.totalItems ? res.unfilteredItems : false);
    });
  };

  // try loading more books with the same query
  const loadMore = () => {
    if (page) {
      setLoaded(false);
      getBooks(query, page).then(res => {
        data.push(...res.items);
        setLoaded(true);
        const newPage = page + res.unfilteredItems;
        setPage(newPage < res.totalItems ? newPage : false);
      });
    }
  };

  // if there is less 6 books try to load more books
  if (loaded && query && data.length < 6) loadMore();

  // if scrolled to the bottom try to load more books
  window.onscroll = () => {
    if (window.innerHeight + window.scrollY + 3 > document.body.offsetHeight) loadMore();
  };

  return (
    <div>
      <SearchBar callback={search} />
      <List items={data} />
      {query && !loaded && <LoadingWindow />}
    </div>
  );
}

export default App;
