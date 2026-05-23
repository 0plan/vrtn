import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import Index from './_layout';
import authStore from '@/stores/auth';

// Mock the auth store
jest.mock('@/stores/auth');

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Now we can import the mocked useNavigate
const mockedUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

describe('Auth Layout', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders Outlet when user is authenticated', () => {
    // Mock the auth store to return isAuth: true
    (authStore as jest.Mock).mockReturnValue({ isAuth: true });

    render(
      <MemoryRouter initialEntries={['/auth/test']}>
        <Routes>
          <Route path="/auth/*" element={<Index />}>
            <Route path="test" element={<div>Auth Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Auth Content')).toBeInTheDocument();
  });

  it('redirects to home when user is not authenticated', async () => {
    // Mock the auth store to return isAuth: false
    (authStore as jest.Mock).mockReturnValue({ isAuth: false });

    render(
      <MemoryRouter initialEntries={['/auth/test']}>
        <Routes>
          <Route path="/auth/*" element={<Index />}>
            <Route path="test" element={<div>Some Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Wait for useEffect to run
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('renders properly with outlet when authenticated', () => {
    (authStore as jest.Mock).mockReturnValue({ isAuth: true });

    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});