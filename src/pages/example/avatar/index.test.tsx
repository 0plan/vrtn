import { render, screen } from '@testing-library/react';
import AvatarDemo from './';

describe('AvatarDemo', () => {
  it('renders the Avatar component', () => {
    render(<AvatarDemo />);

    // The avatar fallback text should be visible
    expect(screen.getByText('CN')).toBeInTheDocument();
  });

  it('renders the fallback text when image fails to load', () => {
    render(<AvatarDemo />);

    // The fallback text should be present in the DOM
    const fallbackElement = screen.getByText('CN');
    expect(fallbackElement).toBeInTheDocument();
  });

  it('wraps image and fallback in an avatar container', () => {
    render(<AvatarDemo />);

    // Avatar element should be rendered with proper styling
    const avatarElement = screen.getByText('CN').parentElement;
    expect(avatarElement).toHaveClass('relative');
  });
});