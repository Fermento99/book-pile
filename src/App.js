import React, { useState } from 'react';
import List from './components/list/List';
import SearchBar from './components/searchbar/SearchBar';
import { getBooks } from './services/googleBooks';

function App() {
  const [query, setQuery] = useState(false);
  const [loading, setLoaded] = useState(false);

  const search = (q) => {
    setQuery(q);
    setLoaded(false);
    getBooks(q).then(data => setLoaded(data));

  };

  return (
    <div>
      <SearchBar callback={search} />
      {query && !loading && <p>loading...</p>}
      {loading && <List items={loading.items} />}
    </div>
  );
}

export default App;
