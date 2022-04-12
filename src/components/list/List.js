import React from 'react'
import ListElement from './ListElement';

function List({items}) {
  // console.log(items);

  return (
    <div>{items.map((item, index) => <ListElement data={item} key={index} />)}</div>
  )
}

export default List