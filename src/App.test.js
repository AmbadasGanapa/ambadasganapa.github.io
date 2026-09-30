import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hobbies and contact sections', () => {
  render(<App />);
  expect(screen.getByText(/Hobbies/i)).toBeInTheDocument();
  expect(screen.getByText(/Let\'s Connect/i)).toBeInTheDocument();
});
