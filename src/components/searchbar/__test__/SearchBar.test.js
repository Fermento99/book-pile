import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import SearchBar from "../SearchBar";

const callback = jest.fn();

describe('SearchBar', () => {
  test('shows 3 text inputs', () => {
    render(<SearchBar callback={callback} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
  });

  test('shows date picker and select', () => {
    render(<SearchBar callback={callback} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByTestId(/date-picker/i)).toBeInTheDocument();
  });

  test('returns correct query object with callback function', () => {
    render(<SearchBar callback={callback} />);

    const titleInput = screen.getByLabelText(/title/i);
    const authorInput = screen.getByLabelText(/author/i);
    const languageInput = screen.getByLabelText(/language/i);
    const dateInput = screen.getByTestId(/date-picker/i);
    const afterInput = screen.getByRole('combobox');
    const button = screen.getByText(/search/i);

    fireEvent.change(titleInput, { target: { value: 'Ender\'s game' } });
    fireEvent.change(authorInput, { target: { value: 'Orson Scott Card' } });
    fireEvent.change(languageInput, { target: { value: 'en' } });
    fireEvent.change(dateInput, { target: { value: '2015-12-10' } });
    fireEvent.change(afterInput, { target: { value: 'false' } });
    fireEvent.click(button);

    expect(callback).toBeCalledWith({ afterDate: 'false', inauthor: 'Orson Scott Card', intitle: 'Ender\'s game', lang: 'en', publishedDate: '2015-12-10' });
  });

  test('returns correct query object with less fields', () => {
    render(<SearchBar callback={callback} />);

    const titleInput = screen.getByLabelText(/title/i);
    const button = screen.getByText(/search/i);

    fireEvent.change(titleInput, { target: { value: 'Ender\'s game' } });
    fireEvent.click(button);

    expect(callback).toBeCalledWith({ afterDate: 'true', inauthor: '', intitle: 'Ender\'s game', lang: '', publishedDate: '' });
  });
});