import React from 'react';
import styled from 'styled-components';
import ListElement from './ListElement';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2em 5%; 
  justify-content: space-evenly;
`;

function List({ items }) {
  console.log(items);

  return (
    <Row>{items.map((item, index) => <ListElement data={item} key={index} />)}</Row>
  );
}

export default List;