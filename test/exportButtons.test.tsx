import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportButtons from '../src/components/ExportButtons';
import { vi, describe, it, expect } from 'vitest';

// Mock con dynamic imports - debe retornar default export
vi.mock('html2canvas', () => ({
  default: vi.fn().mockResolvedValue({ toDataURL: () => 'data:image/png;base64,abc', width: 100, height: 50 })
}));

vi.mock('jspdf', () => ({
  default: vi.fn().mockImplementation(() => ({
    internal: { pageSize: { width: 210, height: 297 } },
    setFontSize: vi.fn(),
    text: vi.fn(),
    addImage: vi.fn(),
    save: vi.fn()
  }))
}));

vi.mock('jspdf-autotable', () => ({
  default: vi.fn()
}));

vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: vi.fn(() => ({})),
    book_new: vi.fn(() => ({})),
    book_append_sheet: vi.fn(),
  },
  write: vi.fn(() => new ArrayBuffer(8))
}));

// Minimal mock for matrixRef
const MockMatrix = () => <div data-testid="matrix">Matrix</div>;

describe('ExportButtons', () => {
  it('renders buttons and triggers exports', async () => {
    render(<ExportButtons matrixType="leopold" caseId="test" data={[]} matrixRef={{ current: document.createElement('div') } as any} />);
    const pdfBtn = screen.getByText(/Exportar PDF/i);
    const csvBtn = screen.getByText(/Exportar CSV/i);
    const xlsBtn = screen.getByText(/Exportar Excel/i);

    expect(pdfBtn).toBeInTheDocument();
    expect(csvBtn).toBeInTheDocument();
    expect(xlsBtn).toBeInTheDocument();

    fireEvent.click(csvBtn);
    
    // Excel export con dynamic import
    await fireEvent.click(xlsBtn);

    // PDF export uses async html2canvas; click and ensure no throw
    await fireEvent.click(pdfBtn);
  });
});
