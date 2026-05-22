import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SliderDemo from './demo';

describe('SliderDemo', () => {
  test('renders slider with default value', () => {
    render(<SliderDemo />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  test('renders slider with correct max value', () => {
    render(<SliderDemo />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  test('applies custom className when provided', () => {
    render(<SliderDemo className="custom-class" />);
    
    // Find the slider container element with the custom class
    const sliderContainer = screen.getByRole('slider').closest('.custom-class');
    expect(sliderContainer).toBeInTheDocument();
  });

  test('accepts and applies additional props', () => {
    render(<SliderDemo aria-label="test-slider" data-testid="test-slider" />);
    
    const slider = screen.getByTestId('test-slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('aria-label', 'test-slider');
  });

  test('has correct default value', () => {
    render(<SliderDemo />);
    
    const slider = screen.getByRole('slider');
    expect(Number(slider.getAttribute('aria-valuenow'))).toBe(50);
  });

  test('slider can be interacted with using mouse events', () => {
    render(<SliderDemo />);
    
    const slider = screen.getByRole('slider');
    
    // Simulate clicking and dragging the slider
    fireEvent.mouseDown(slider);
    fireEvent.mouseMove(document, { clientX: 100 });
    fireEvent.mouseUp(document);
    
    // The slider should still be present after interaction
    expect(slider).toBeInTheDocument();
  });
});