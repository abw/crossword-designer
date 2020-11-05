import { render, screen } from '@testing-library/react';
import Crossword from './Crossword';

test('renders learn react link', () => {
  render(<Crossword />);
  const linkElement = screen.getByText(/crossword/i);
  expect(linkElement).toBeInTheDocument();
});
