import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import List from "../List";

const title = 'title';
const description = 'description';
const thumbnail = 'thumbnailurl';

const data = [...Array(10)].map(() => {
  return {
    volumeInfo: {
      imageLinks: { thumbnail },
      title,
      description
    }
  };
});

describe('List', () => {
  test('displays all children', () => {
    const { container } = render(<List items={data} />);
    expect(container.childNodes[0].childNodes.length).toBe(data.length);
  });
});