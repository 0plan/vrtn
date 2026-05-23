import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import ProgressDemo from './demo';

// Mock the useEffect to control the timer behavior for testing
jest.useFakeTimers();

describe('ProgressDemo', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('renders with initial progress value', () => {
    render(<ProgressDemo />);

    // Check that the progress container element is in the document
    const progressContainer = screen.getByRole('progressbar');
    expect(progressContainer).toBeInTheDocument();

    // Check the progress indicator has the correct initial transform value (13% -> translateX(-87%))
    const progressIndicator = progressContainer.querySelector('.h-full.w-full.flex-1');
    expect(progressIndicator).toBeInTheDocument();
    expect(progressIndicator).toHaveStyle({ transform: 'translateX(-87%)' }); // 100 - 13 = 87%
  });

  it('updates progress after 500ms', async () => {
    render(<ProgressDemo />);

    // Initially the progress should start at 13 (transform: translateX(-87%))
    const progressIndicator = screen.getByRole('progressbar').firstChild as HTMLElement;
    expect(progressIndicator).toHaveStyle({ transform: 'translateX(-87%)' }); // 100 - 13 = 87%

    // Fast-forward time to trigger the timeout
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Wait for the update to happen
    await waitFor(
      () => {
        expect(progressIndicator).toHaveStyle({ transform: 'translateX(-34%)' }); // 100 - 66 = 34%
      },
      { timeout: 100 }
    );
  });

  it('has the correct width class', () => {
    render(<ProgressDemo />);

    const progressBar = screen.getByRole('progressbar');
    // Check that the progress bar container has the w-[60%] class
    expect(progressBar).toHaveClass('w-[60%]');
  });
});