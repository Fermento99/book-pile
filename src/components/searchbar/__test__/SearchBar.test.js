import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SearchBar from "../SearchBar";

const callback = jest.fn();

describe('SearchBar', () => {
  test('shows 3 text inputs', () => {
    render(<SearchBar callback={callback} />);
    expect(screen.getByLabelText(/title./i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
  });

  test('shows date picker and select', () => {
    render(<SearchBar callback={callback} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByTestId(/date-picker/i)).toBeInTheDocument();
  });
});