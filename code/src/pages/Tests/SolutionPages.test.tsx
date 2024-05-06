import { render, screen } from '@testing-library/react';
import SolutionPages from '../solution/[id]';

describe('SolutionPages', () => {
  it('renders without crashing', () => {
    const solution = { id: '1', title: 'Example Solution' };
    render(<SolutionPages solution={solution} hasSolution={true} />);
    const solutionTitle = screen.getByText(/Example Solution/i);
    expect(solutionTitle).toBeInTheDocument();
  });
});
