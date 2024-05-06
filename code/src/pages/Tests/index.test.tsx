import { render, screen } from '@testing-library/react';
import Home from '../index';

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />);
    const questionairePage = screen.getByTestId('questionaire-page');
    expect(questionairePage).toBeInTheDocument();
  });
});
