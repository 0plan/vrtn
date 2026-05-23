import { render, screen } from '@testing-library/react';
import SkeletonDemo from './demo';

describe('SkeletonDemo', () => {
  it('renders skeleton elements correctly', () => {
    render(<SkeletonDemo />);

    // Query by class to verify skeleton elements are rendered
    const skeletonElementsByClass = document.querySelectorAll('.animate-pulse');
    expect(skeletonElementsByClass.length).toBe(3);
  });

  it('renders the main container div with correct classes', () => {
    render(<SkeletonDemo />);

    // Find the main container by its class combination
    const container = document.querySelector('.flex.items-center.space-x-4');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('space-x-4');
  });

  it('renders multiple skeleton items', () => {
    render(<SkeletonDemo />);

    // The component should render 3 skeleton elements: 1 circular and 2 rectangular
    const skeletonElements = document.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBe(3);
  });

  it('applies correct classes to skeleton elements', () => {
    render(<SkeletonDemo />);

    // Find the circular skeleton (has rounded-full class)
    const circularSkeleton = document.querySelector('.rounded-full');
    expect(circularSkeleton).toBeInTheDocument();
    expect(circularSkeleton).toHaveClass('h-12');
    expect(circularSkeleton).toHaveClass('w-12');

    // Find skeleton elements and check for required classes
    const skeletonElements = document.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBe(3);

    // All skeleton elements should have animate-pulse and bg-muted classes
    skeletonElements.forEach(skeleton => {
      expect(skeleton).toHaveClass('animate-pulse');
      expect(skeleton).toHaveClass('bg-muted');
    });

    // Check that rectangular skeletons have rounded-md class
    const rectSkeletons = document.querySelectorAll('.animate-pulse.rounded-md');
    expect(rectSkeletons.length).toBe(2);
  });
});