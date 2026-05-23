import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import MenubarDemo from './demo';

describe('MenubarDemo', () => {
  it('renders the menubar with all menu triggers', () => {
    render(<MenubarDemo />);

    // Check that the main Menubar component is present
    const menubar = screen.getByRole('menubar');
    expect(menubar).toBeInTheDocument();

    // Check that all main menu triggers are present by exact text
    expect(screen.getByRole('menuitem', { name: 'File' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'View' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Profiles' })).toBeInTheDocument();
  });

  it('renders basic structure correctly', () => {
    render(<MenubarDemo />);

    // Check that all main menu triggers are present
    const menuTriggers = screen.getAllByRole('menuitem');
    expect(menuTriggers.length).toBe(4); // File, Edit, View, Profiles

    // Check that the basic static elements (like the menubar itself) are present
    expect(screen.getByRole('menubar')).toBeInTheDocument();
  });
});