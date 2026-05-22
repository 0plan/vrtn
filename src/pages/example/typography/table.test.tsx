import { render, screen } from '@testing-library/react';
import TypographyTable from './table';

describe('TypographyTable', () => {
  test('renders the component without crashing', () => {
    render(<TypographyTable />);
    
    // Check if the main table element is present
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  test('displays the correct headers', () => {
    render(<TypographyTable />);
    
    // Check if header cells exist with correct text
    const header1 = screen.getByText("King's Treasury");
    const header2 = screen.getByText("People's happiness");
    
    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();
    
    // Check that they are header elements
    expect(header1.tagName).toBe('TH');
    expect(header2.tagName).toBe('TH');
  });

  test('displays the correct table data', () => {
    render(<TypographyTable />);
    
    // Check for all the table data cells
    const dataCells = [
      screen.getByText('Empty'),
      screen.getByText('Overflowing'),
      screen.getByText('Modest'),
      screen.getByText('Satisfied'),
      screen.getByText('Full'),
      screen.getByText('Ecstatic'),
    ];
    
    dataCells.forEach(cell => {
      expect(cell).toBeInTheDocument();
      expect(cell.tagName).toBe('TD');
    });
  });

  test('renders correct number of rows', () => {
    render(<TypographyTable />);
    
    // Count the rows in the tbody (excluding header row)
    // Should have 3 data rows
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4); // 1 header row + 3 data rows
    
    // Check that tbody has 3 rows
    const tableBody = screen.getByRole('table').querySelector('tbody');
    if (tableBody) {
      const bodyRows = tableBody.querySelectorAll('tr');
      expect(bodyRows.length).toBe(3);
    }
  });

  test('has correct CSS classes applied to table elements', () => {
    render(<TypographyTable />);

    // Check if the table element has the correct classes
    const tableElement = screen.getByRole('table');
    expect(tableElement).toHaveClass('w-full');

    // Check if table header cells have the correct classes
    const headerCells = screen.getAllByRole('columnheader');
    headerCells.forEach(header => {
      expect(header).toHaveClass('border', 'px-4', 'py-2', 'text-left', 'font-bold');
    });

    // Check if table data cells have the correct classes
    const dataCells = screen.getAllByRole('cell');
    dataCells.forEach(cell => {
      expect(cell).toHaveClass('border', 'px-4', 'py-2', 'text-left');
    });
  });

  // Additional test to ensure the container div has the correct classes
  test('renders container div with correct classes', () => {
    render(<TypographyTable />);

    // Get the table element and its parent container
    const tableElement = screen.getByRole('table');
    const containerDiv = tableElement.parentElement;

    expect(containerDiv).toHaveClass('my-6', 'w-full', 'overflow-y-auto');
  });
});