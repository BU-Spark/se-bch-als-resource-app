import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { fetchMock } from '../../../testSetup'; // Assuming fetchMock setup is done in testSetup
import CommunicationPage from '../../pages/[type].tsx';
import { FocusedBookmarkProvider } from '../../contexts/FocusedBookmarkContext'; 
import '@testing-library/jest-dom';

// Mocking useRouter from next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(), // Mock push to assert navigation
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

fetchMock.enableMocks();

describe('CommunicationPage Tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('clicking a choice updates the UI correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ questions: [{ ref: "ref1", title: "Question 1", choices: [{ id: "1", label: "Choice 1", link: "nextRef" }] }] }));

    render(<FocusedBookmarkProvider>
        <CommunicationPage />
      </FocusedBookmarkProvider>);

    await waitFor(() => fireEvent.click(screen.getByText('Choice 1')));
    expect(screen.getByText('Question 1')).toBeInTheDocument(); // New question based on the choice
  });
});
