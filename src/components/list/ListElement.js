import React from 'react';
import styled from 'styled-components';

const ElementContainer = styled.div`
  width: 40%;
  min-width: 300px;
  text-align: center;
  margin: 1.5em;
  padding: 2em;
  border: 2px #000 solid;
  border-radius: 8px;

  > img {
    max-width: 128px;
  }
`;


function ListElement({ data }) {
  // console.log(data);

  return (
    <ElementContainer>
      <img src={data.volumeInfo.imageLinks?.thumbnail} alt={'book\'s cover'} />
      <h2>{data.volumeInfo.title}</h2>
      <p>{data.volumeInfo.description && data.volumeInfo.description?.length > 100 ? data.volumeInfo.description?.substring(0, 100) + '...' : data.volumeInfo.description}</p>
    </ElementContainer>
  );
}

export default ListElement;