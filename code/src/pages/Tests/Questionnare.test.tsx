import { render, screen } from '@testing-library/react';
import QuestionairePage from '../QuestionairePage';

describe('QuestionairePage', () => {
  it('renders without crashing', () => {
    render(<QuestionairePage />);
    const questionaireBodyContent = screen.getByTestId('questionaire-body-content');
    expect(questionaireBodyContent).toBeInTheDocument();
  });
});
