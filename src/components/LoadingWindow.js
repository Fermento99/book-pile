import React from 'react';
import styled from 'styled-components';

const Window = styled.div`
  position: fixed;
  bottom: 6em;
  left: 40%;
  width: 20%;
  z-index: 100;
  text-align: center;
  padding: 1em 0;
  border-radius: 8px;
  background-color: #aaa;
  opacity: .9;

  > h1 {
    margin: 0;
  }
`;

function LoadingWindow() {
  return (
    <Window><h1>Loading...</h1></Window>
  );
}

export default LoadingWindow;