'use client';
import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

interface ExportButtonsProps {
  matrixType: 'leopold' | 'conesa' | 'battelle';
  caseId: string;
  data: any;
  matrixRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ExportButtons({ matrixType, caseId, data, matrixRef }: ExportButtonsProps) {
  
  const exportToPDF = async () => {
    const doc = new jsPDF('landscape', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    // Header
    doc.setFontSize(20);
    doc.text('Matriz de Evaluación de Impacto Ambiental', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`Método: ${matrixType.charAt(0).toUpperCase() + matrixType.slice(1)}`, pageWidth / 2, 30, { align: 'center' });
    doc.text(`Caso: ${caseId}`, pageWidth / 2, 40, { align: 'center' });
    
    // Fecha y hora
    const now = new Date();
    doc.setFontSize(10);
    doc.text(`Generado: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 20, pageHeight - 10);

    if (matrixType === 'leopold' && matrixRef?.current) {
      // Capturar la matriz Leopold como imagen (mejorar robustez y usar fallback de tabla)
      try {
        const el = matrixRef.current;
        const scale = typeof window !== 'undefined' ? (window.devicePixelRatio || 2) : 2;
        const canvas = await html2canvas(el, ({
          useCORS: true,
          logging: false,
          scale
        } as any));

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - 40;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // If image is taller than page, split it or fallback to table
        if (imgHeight < pageHeight - 80) {
          doc.addImage(imgData, 'PNG', 20, 50, imgWidth, imgHeight);
        } else {
          // Fallback: export tabla con autotable para mayor control de paginación
          doc.text('Vista previa extensa: exportando como tabla...', 20, 60);
          // intentar extraer filas simples del DOM si es posible
          const rows: any[] = [];
          try {
            const table = el.querySelector('table');
            if (table) {
              const headers = Array.from(table.querySelectorAll('thead th')).map(h => (h.textContent || '').trim());
              const bodyRows = Array.from(table.querySelectorAll('tbody tr'));
              bodyRows.forEach(r => {
                const cols = Array.from(r.querySelectorAll('td')).map(td => (td.textContent || '').trim());
                rows.push(cols);
              });
              autoTable(doc, { startY: 70, head: [headers], body: rows, styles: { fontSize: 8 } });
            } else {
              doc.text('No se pudo obtener la tabla para exportar.', 20, 70);
            }
          } catch (err) {
            console.error('Error building fallback table:', err);
            doc.text('Error al generar la tabla de fallback', 20, 70);
          }
        }
      } catch (error) {
        console.error('Error capturing matrix:', error);
        // Fallback simple: crear tabla a partir de data
        try {
          autoTable(doc, {
            startY: 50,
            head: [['Impacto', 'Magnitud', 'Importancia', 'S']],
            body: (data || []).map((d: any) => [d.impactoId || '-', d.magnitud || '-', d.importancia || '-', d.S || '-']),
            styles: { fontSize: 8 }
          });
        } catch (err) {
          doc.text('Error al generar PDF de respaldo', 20, 60);
        }
      }
    } else if (matrixType === 'conesa') {
      // Tabla para Conesa
      autoTable(doc, {
        startY: 50,
        head: [['Impacto', 'IN', 'EX', 'MO', 'PE', 'RV', 'SI', 'AC', 'EF', 'PR', 'MC', 'I', 'Categoría']],
        body: data?.map((item: any, index: number) => [
          `Impacto ${index + 1}`,
          item.IN || '-',
          item.EX || '-',
          item.MO || '-',
          item.PE || '-',
          item.RV || '-',
          item.SI || '-',
          item.AC || '-',
          item.EF || '-',
          item.PR || '-',
          item.MC || '-',
          item.I || '-',
          item.categoria || '-'
        ]) || [],
        styles: { fontSize: 8 },
        headStyles: { fillColor: [255, 193, 7] }
      });
    } else if (matrixType === 'battelle') {
      // Tabla para Battelle
      autoTable(doc, {
        startY: 50,
        head: [['Factor', 'Categoría', 'UIP', 'Cal.Sin', 'Cal.Con', 'PIA Sin', 'PIA Con', 'UIA']],
        body: data?.map((item: any, index: number) => [
          `Factor ${index + 1}`,
          item.categoria || '-',
          item.uip || '-',
          item.calidad_sin || '-',
          item.calidad_con || '-',
          item.pia_sin?.toFixed(0) || '-',
          item.pia_con?.toFixed(0) || '-',
          (item.uia >= 0 ? '+' : '') + (item.uia?.toFixed(0) || '-')
        ]) || [],
        styles: { fontSize: 8 },
        headStyles: { fillColor: [33, 150, 243] }
      });
    }

    // Footer con información adicional
    doc.setFontSize(8);
    doc.text('EIA Matrix Studio - Herramienta Educativa', pageWidth / 2, pageHeight - 5, { align: 'center' });

    doc.save(`matriz-${matrixType}-${caseId}-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const exportToCSV = () => {
    let csvContent = '';
    let filename = '';

    if (matrixType === 'leopold' && data) {
      csvContent = 'Impacto ID,Magnitud,Importancia,Significancia\n';
      data.forEach((item: any) => {
        csvContent += `${item.impactoId},${item.magnitud},${item.importancia},${item.S}\n`;
      });
      filename = `leopold-${caseId}`;
    } else if (matrixType === 'conesa' && data) {
      csvContent = 'Impacto ID,IN,EX,MO,PE,RV,SI,AC,EF,PR,MC,I,Categoría\n';
      data.forEach((item: any) => {
        csvContent += `${item.impactoId},${item.IN},${item.EX},${item.MO},${item.PE},${item.RV},${item.SI},${item.AC},${item.EF},${item.PR},${item.MC},${item.I},${item.categoria}\n`;
      });
      filename = `conesa-${caseId}`;
    } else if (matrixType === 'battelle' && data) {
      csvContent = 'Impacto ID,Categoría,UIP,Calidad Sin,Calidad Con,PIA Sin,PIA Con,UIA\n';
      data.forEach((item: any) => {
        csvContent += `${item.impactoId},${item.categoria},${item.uip},${item.calidad_sin},${item.calidad_con},${item.pia_sin},${item.pia_con},${item.uia}\n`;
      });
      filename = `battelle-${caseId}`;
    }

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    // For Excel, we'll use CSV format with Excel-specific formatting
    let excelContent = '';
    let filename = '';

    if (matrixType === 'leopold' && data) {
      excelContent = 'sep=,\nMatriz Leopold - Resultados\n\n';
      excelContent += 'Impacto ID,Magnitud,Importancia,Significancia,Interpretación\n';
      data.forEach((item: any) => {
        const interpretation = Math.abs(item.S) >= 60 ? 'Crítico' : Math.abs(item.S) >= 40 ? 'Moderado' : 'Leve';
        excelContent += `${item.impactoId},${item.magnitud},${item.importancia},${item.S},${interpretation}\n`;
      });
      filename = `leopold-${caseId}`;
    } else if (matrixType === 'conesa' && data) {
      excelContent = 'sep=,\nMatriz Conesa - Resultados\n\n';
      excelContent += 'Impacto ID,Intensidad,Extensión,Momento,Persistencia,Reversibilidad,Sinergia,Acumulación,Efecto,Periodicidad,Recuperabilidad,Importancia,Categoría\n';
      data.forEach((item: any) => {
        excelContent += `${item.impactoId},${item.IN},${item.EX},${item.MO},${item.PE},${item.RV},${item.SI},${item.AC},${item.EF},${item.PR},${item.MC},${item.I},${item.categoria}\n`;
      });
      filename = `conesa-${caseId}`;
    } else if (matrixType === 'battelle' && data) {
      excelContent = 'sep=,\nMatriz Battelle-Columbus - Resultados\n\n';
      excelContent += 'Impacto ID,Categoría,UIP,Calidad Sin Proyecto,Calidad Con Proyecto,PIA Sin,PIA Con,UIA,Interpretación\n';
      data.forEach((item: any) => {
        const interpretation = item.uia > 0 ? 'Positivo' : item.uia < 0 ? 'Negativo' : 'Neutral';
        excelContent += `${item.impactoId},${item.categoria},${item.uip},${item.calidad_sin},${item.calidad_con},${item.pia_sin},${item.pia_con},${item.uia},${interpretation}\n`;
      });
      filename = `battelle-${caseId}`;
    }

    // Download Excel
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={exportToPDF}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
        </svg>
        Exportar PDF
      </button>

      <button
        onClick={exportToExcel}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v10h10V5H5z" clipRule="evenodd" />
        </svg>
        Exportar Excel
      </button>

      <button
        onClick={exportToCSV}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586l1.293-1.293a1 1 0 111.414 1.414L10.414 12l1.293 1.293a1 1 0 01-1.414 1.414L9 13.414l-1.293 1.293a1 1 0 01-1.414-1.414L7.586 12 6.293 10.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Exportar CSV
      </button>

      <div className="text-xs text-gray-600 flex items-center">
        📊 Datos para análisis externo
      </div>
    </div>
  );
}
