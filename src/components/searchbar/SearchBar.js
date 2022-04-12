import React, { useRef }  from 'react';

function SearchBar({ callback }) {
  const query = useRef();
  return (<div>
    <input type='text' ref={query} onChange={() => callback(query.current.value)}/>
    <button onClick={() => callback(query.current.value)}>search</button>
  </div>
  );
}

export default SearchBar;