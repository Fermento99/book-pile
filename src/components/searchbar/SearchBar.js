import React, { useRef } from 'react';
import styled, { css } from 'styled-components';


const inputStyle = css`
  padding: .5em;
  margin: 1em 1.5em;
  border-radius: 8px;
  border: solid 1px #000;
`;

const Input = styled.input`
  ${inputStyle}
  width: ${props => props.width ? props.width : '15em'};
  margin-right: 2.5em;
`;

const Select = styled.select`
  ${inputStyle}
  background-color: #fff;
  margin-right: -.5em;
`;

const Button = styled.button`
  padding: .7em 3em;
  margin: 1em;
  border-radius: 8px;
  text-decoration: bold;
  color: #000;
  border: solid 3px #000;
  background-color: transparent;
  font-weight: bolder;

  :hover {
    color: #fff;
    background-color: #000;
  }
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #eee;
  padding: 1em 3em;
  white-space: normal;
  text-align: center;

  > div > div{
    display: inline-block;
    white-space: nowrap;
  }

  @media (max-width: 880px) {
    flex-direction: column;
    align-items: flex-start;
    > div > div {
      display: block;
      text-align: left;
    }
  } 
`;

function SearchBar({ callback }) {
  const titleRef = useRef();
  const authorRef = useRef();
  const languageRef = useRef();
  const publishedDateRef = useRef();
  const publishedDateSelectionRef = useRef();

  const handleClick = () => {
    const params = {
      intitle: titleRef.current.value,
      inauthor: authorRef.current.value,
      lang: languageRef.current.value,
      publishedDate: publishedDateRef.current.value,
      afterDate: publishedDateSelectionRef.current.value
    };

    // return query object if 'intitle' or 'inauthor' is specified
    if (params.intitle || params.inauthor) callback(params);
  };

  return (<BarContainer>
    <div>
      <div>
        <label htmlFor='title' >Title:</label>
        <Input id='title' type='text' placeholder='Animal Farm: A Fairy Story' ref={titleRef} />
      </div>
      <div>
        <label htmlFor='author'>Author:</label>
        <Input id='author' type='text' placeholder='Geroge Orwell' ref={authorRef} />
      </div>
      <div>
        <label htmlFor='language'>Language:</label>
        <Input id='language' type='text' placeholder='en' width="3em" ref={languageRef} />
      </div>
      <div>
        <label htmlFor='publishedDate'>Published Date:</label>
        <Select type='select' defaultValue='true' ref={publishedDateSelectionRef}>
          <option value='true'>after</option>
          <option value='false'>before</option>
        </Select>
        <Input id='publishedDate' type='date' ref={publishedDateRef} data-testid="date-picker" />
      </div>
    </div>
    <Button onClick={() => handleClick()}>SEARCH</Button>
  </BarContainer>
  );
}

export default SearchBar;