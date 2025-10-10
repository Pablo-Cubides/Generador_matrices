import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportButtons from '../src/components/ExportButtons';
import { vi, describe, it, expect } from 'vitest';

// Mock html2canvas and jsPDF
vi.mock('html2canvas', () => ({
  default: vi.fn().mockResolvedValue({ toDataURL: () => 'data:image/png;base64,abc', width: 100, height: 50 })
}));

vi.mock('jspdf', () => ({ jsPDF: vi.fn().mockImplementation(() => ({
  internal: { pageSize: { width: 210, height: 297 } },
  setFontSize: vi.fn(),
  text: vi.fn(),
  addImage: vi.fn(),
  save: vi.fn()
})) }));

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
    fireEvent.click(xlsBtn);

    // PDF export uses async html2canvas; click and ensure no throw
    await fireEvent.click(pdfBtn);
  });
});
