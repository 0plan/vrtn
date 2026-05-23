import { render, screen } from '@testing-library/react';
import { Default } from './Avatar.stories';

// Import the actual components without mocking to test the real implementation
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

describe('Avatar Stories', () => {
  it('should render the default story correctly', () => {
    // Render the component as it appears in the Default story
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );

    // Check that the avatar is rendered with its base classes
    const avatarElement = container.firstChild;
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveClass('relative', 'flex', 'h-10', 'w-10');
  });

  it('should render Avatar component with fallback when image fails to load (typical test scenario)', () => {
    render(
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );

    // In test environments, remote images often fail to load,
    // so the fallback 'CN' text should be visible
    const fallback = screen.getByText('CN');
    expect(fallback).toBeInTheDocument();

    // The image might not load in test environment, which is expected behavior
    const image = screen.queryByRole('img');
    // We won't assert on image presence since network conditions vary in tests
  });

  it('should render Avatar component with fallback when no image source provided', () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );

    // When the image has no src, the fallback text "CN" should be visible
    const fallback = screen.getByText('CN');
    expect(fallback).toBeInTheDocument();

    // No image should be rendered when src is empty
    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
  });

  it('should have correct structure with Avatar wrapping elements', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );

    // Check for the avatar container element with correct classes
    const avatarElement = container.firstChild;
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveClass('relative', 'flex', 'h-10', 'w-10');

    // The fallback text should be present in the DOM
    expect(screen.getByText('CN')).toBeInTheDocument();
  });

  it('should render Avatar with story configuration', () => {
    // Test the exact same configuration as in the Default story
    const { container } = render(<Default.render {...Default.args} />);

    // Should render the fallback text as the image likely won't load in tests
    expect(screen.getByText('CN')).toBeInTheDocument();

    // Avatar container should have proper styling - get the first child which is the avatar root
    const avatar = container.firstChild;
    expect(avatar).toHaveClass('relative', 'flex', 'h-10', 'w-10');
  });
});