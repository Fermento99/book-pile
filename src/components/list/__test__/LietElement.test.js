import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ListElement from "../ListElement";

const data1 = {
  volumeInfo: {
    description: 'some description',
    title: 'title',
    imageLinks: {
      thumbnail: 'img-url'
    }
  }
};

const data2 = {
  volumeInfo: {
    description: 'some description that is longer than 100 characters, im running out of ideas, lorem ipsum. I had a friend whose name was Pawel, I\'ve seen him by the ladybug shop eriler',
    title: 'title',
    imageLinks: {
      thumbnail: 'img-url'
    }
  }
};

describe('ListElement', () => {
  test('displays img from url', () => {
    render(<ListElement data={data1} />);
    const img = screen.getByAltText('book\'s cover');
    expect(img).toHaveAttribute('src', data1.volumeInfo.imageLinks.thumbnail);
  });

  test('displays book title', () => {
    render(<ListElement data={data1} />);
    expect(screen.getByText(data1.volumeInfo.title)).toBeInTheDocument();
  });

  test('displays description', () => {
    render(<ListElement data={data1} />);
    expect(screen.getByText(data1.volumeInfo.description)).toBeInTheDocument();
  });

  test('displays shorter description if needed', () => {
    render(<ListElement data={data2} />);
    expect(screen.getByText(data2.volumeInfo.description.substring(0, 100) + '...')).toBeInTheDocument();
  });
});