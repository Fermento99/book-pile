import React from 'react';
import styled from 'styled-components';

const Description = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  width: 40%;
  height: 3em;
`;


function ListElement({ data }) {
  console.log(data);
  return (
    <div>
      <img src={data.volumeInfo.imageLinks?.thumbnail} alt={`${data.volumeInfo.title} cover`} />
      <h2>{data.volumeInfo.title}</h2>
      <Description>{data.volumeInfo.description}</Description>
    </div>
  );
}

export default ListElement;