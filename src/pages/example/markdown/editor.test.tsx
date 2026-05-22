import { render, screen } from '@testing-library/react';
import Editor from './editor';

// Mock the markdown file import
jest.mock('./example.md', () => ({
  markdown: '# Sample Markdown Content\nThis is a sample markdown for testing purposes.'
}));

// Mock the MarkdownEditor component to test the Editor page
jest.mock('@/components/ui/markdown-editor', () => ({
  __esModule: true,
  default: ({ height, markdownMessage }: { height: number; markdownMessage: string }) => (
    <div data-testid="markdown-editor" data-height={height} data-message={markdownMessage}>
      Mock Markdown Editor - Height: {height}, Message: {markdownMessage}
    </div>
  ),
}));

// Import the markdown content after mocking
const { markdown } = require('./example.md');

describe('Editor', () => {
  it('should render the MarkdownEditor component', () => {
    render(<Editor />);
    
    const markdownEditor = screen.getByTestId('markdown-editor');
    expect(markdownEditor).toBeInTheDocument();
  });

  it('should pass the correct height prop to MarkdownEditor', () => {
    render(<Editor />);
    
    const markdownEditor = screen.getByTestId('markdown-editor');
    expect(markdownEditor).toHaveAttribute('data-height', '350');
  });

  it('should pass the markdown content to MarkdownEditor', () => {
    render(<Editor />);
    
    const markdownEditor = screen.getByTestId('markdown-editor');
    expect(markdownEditor).toHaveAttribute('data-message', markdown);
  });

  it('should render with the expected content', () => {
    render(<Editor />);
    
    const markdownEditor = screen.getByTestId('markdown-editor');
    expect(markdownEditor).toContainElement(
      screen.getByText(/Mock Markdown Editor - Height: 350/)
    );
    
    // Check that the markdown content is passed through
    expect(markdownEditor).toContainElement(
      screen.getByText(new RegExp(markdown.substring(0, 20))) // Check first 20 chars of markdown
    );
  });
});