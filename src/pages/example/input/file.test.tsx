import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputFile from './file';

describe('InputFile Component', () => {
  test('renders the component with label and input', () => {
    render(<InputFile />);

    // Check that the label is present
    const label = screen.getByText(/picture/i);
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');

    // Check that the input is present
    const input = screen.getByLabelText(/picture/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('id', 'picture');
  });

  test('has correct DOM structure', () => {
    render(<InputFile />);

    // Check that the wrapper div with the specific classes exists in the document
    const container = document.querySelector('.grid.w-full.max-w-sm.items-center.gap-1\\.5');
    expect(container).toBeInTheDocument();

    // Verify it contains both the label and input elements
    const label = screen.getByText(/picture/i);
    const input = screen.getByLabelText(/picture/i);

    expect(container).toContainElement(label);
    expect(container).toContainElement(input);
  });

  test('input element has correct attributes', () => {
    render(<InputFile />);

    const input = screen.getByLabelText(/picture/i);
    expect(input).toHaveAttribute('id', 'picture');
    expect(input).toHaveAttribute('type', 'file');
  });

  test('can handle file selection', () => {
    render(<InputFile />);

    const input = screen.getByLabelText(/picture/i);
    expect(input).toBeInTheDocument();

    // Mock a file object
    const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });

    // Simulate file selection
    fireEvent.change(input, { target: { files: [mockFile] } });

    // Verify that the value changed
    expect(input.files).toHaveLength(1);
    expect(input.files![0]).toBe(mockFile);
  });

  test('accepts multiple files when selected', () => {
    render(<InputFile />);

    const input = screen.getByLabelText(/picture/i);
    expect(input).toBeInTheDocument();

    const file1 = new File(['content1'], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['content2'], 'test2.png', { type: 'image/png' });

    // Note: The current implementation doesn't have multiple attribute
    // So it should only accept one file even if we try to pass multiple
    fireEvent.change(input, { target: { files: [file1, file2] } });

    // As the input doesn't have multiple attribute, only first file should be considered
    if (input.files) {
      expect(input.files[0]).toBe(file1);
    }
  });

  test('renders with correct accessibility attributes', () => {
    render(<InputFile />);

    const label = screen.getByText(/picture/i);
    const input = screen.getByLabelText(/picture/i);

    // Check that the label is properly associated with the input
    expect(label).toHaveAttribute('for', 'picture');
    expect(input).toHaveAccessibleName(/picture/i);
  });

  test('displays label text correctly', () => {
    render(<InputFile />);

    const label = screen.getByText('Picture');
    expect(label).toBeInTheDocument();
  });
});