import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";


const mockResponseData = {
  items: [...Array(10)].map(() => {
    return {
      volumeInfo: {
        description: 'some description',
        title: 'title',
        imageLinks: {
          thumbnail: 'img-url'
        }
      }
    };
  }),
  totalItems: 20
};

describe('App', () => {
  beforeAll(() => {
    fetch.mockResponse(JSON.stringify(mockResponseData));
  });

  test('loads data from API', async () => {
    render(<App />);
    const titleInput = screen.getByLabelText(/title/i);
    const button = screen.getByText(/search/i);
    fireEvent.change(titleInput, { target: { value: 'Ender\'s game' } });
    fireEvent.click(button);
    expect((await screen.findAllByText('title')).length).toBe(10);
  });
});