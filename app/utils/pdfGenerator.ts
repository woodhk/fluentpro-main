import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface ChangeRequestFormData {
  title: string;
  description: string;
  reason: string;
  priority: string;
  importance: string;
  deliverableImpact: string;
  noResponseImpact: string;
  milestone: string[];
  tasksAffected: string[];
  costEvaluation: string;
  qualityEvaluation: string;
  deadlineImpact: number;
  alternatives: string;
  finalComments: string;
}

interface TaskDetail {
  id: string;
  name: string;
  date: string;
  duration: string;
}

export const generateChangeRequestPDF = (formData: ChangeRequestFormData, taskDetails: TaskDetail[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  const brandColor: [number, number, number] = [0, 102, 204];
  const headingColor: [number, number, number] = [0, 102, 204];
  const marginLeft = 20;
  const bottomMargin = 30;
  let yPosition = 20;
  
  // Helpers
  const maxWidth = pageWidth - marginLeft * 2;
  
  const checkSpace = (neededHeight: number) => {
    // If we don't have enough space for the neededHeight, add a page
    if (yPosition + neededHeight > pageHeight - bottomMargin) {
      doc.addPage();
      yPosition = 20;
    }
  };
  
  const drawHorizontalLine = (y: number) => {
    doc.setDrawColor(...headingColor);
    doc.setLineWidth(0.5);
    doc.line(marginLeft, y, pageWidth - marginLeft, y);
  };
  
  const addHeading = (text: string) => {
    const headingHeight = 10; // estimated height for heading + line
    checkSpace(headingHeight);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...headingColor);
    doc.text(text.toUpperCase(), marginLeft, yPosition);
    yPosition += 2;
    drawHorizontalLine(yPosition);
    yPosition += 6;
  };
  
  const addWrappedText = (text: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const lines = doc.splitTextToSize(text || '', maxWidth);
    const neededHeight = lines.length * 6; // approximately 6px per line
    checkSpace(neededHeight);
    doc.text(lines, marginLeft, yPosition);
    yPosition += neededHeight + 2; // small gap after text
  };
  
  const addLabelValuePair = (label: string, value: string) => {
    const line = `${label}: ${value || 'Not specified'}`;
    const lines = doc.splitTextToSize(line, maxWidth);
    const neededHeight = lines.length * 6;
    checkSpace(neededHeight);
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, marginLeft, yPosition);
    doc.setFont('helvetica', 'normal');
    // Value on same line if it fits
    const labelWidth = doc.getTextWidth(`${label}: `);
    doc.text(value || 'Not specified', marginLeft + labelWidth + 2, yPosition);
    yPosition += neededHeight + 2;
  };
  
  const addTasksTable = (tasks: TaskDetail[]) => {
    const tableBody = tasks.map(t => [t.name, t.date, t.duration]);
    // Estimate table height: header + rows * approx line height
    const rowHeight = 8;
    const neededHeight = (tableBody.length + 1) * rowHeight + 10; 
    checkSpace(neededHeight);

    (doc as any).autoTable({
      startY: yPosition,
      head: [['Task Name', 'Timeline', 'Duration']],
      body: tableBody,
      styles: { font: 'helvetica', fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: brandColor, textColor: 255, fontStyle: 'bold' },
      margin: { left: marginLeft, right: marginLeft },
      theme: 'striped'
    });
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  };
  
  // Header
  doc.setFillColor(...brandColor);
  doc.rect(0, 0, pageWidth, 20, 'F');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Change Request Summary', pageWidth / 2, 13, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  yPosition = 30;
  
  // Change Description
  addHeading('Change Description');
  doc.setFont('helvetica', 'bold');
  doc.text('Change Title:', marginLeft, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 6;
  addWrappedText(formData.title);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Description of Change:', marginLeft, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 6;
  addWrappedText(formData.description);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Reason for Change:', marginLeft, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 6;
  addWrappedText(formData.reason);
  
  addLabelValuePair('Priority', formData.priority);
  addLabelValuePair('Importance', formData.importance);
  addLabelValuePair('Milestone', formData.milestone ? `Milestone ${formData.milestone}` : '');
  
  // Change Impact
  addHeading('Change Impact');
  
  doc.setFont('helvetica', 'bold');
  doc.text('Tasks/Scope Affected:', marginLeft, yPosition);
  yPosition += 6;
  if (formData.tasksAffected.length > 0) {
    const selectedTasks = taskDetails.filter(task => formData.tasksAffected.includes(task.id));
    addTasksTable(selectedTasks);
  } else {
    addWrappedText('No tasks selected');
  }
  
  // Impact Analysis
  addHeading('Impact Analysis');
  
  doc.setFont('helvetica', 'bold');
  doc.text('Impact on Deliverables:', marginLeft, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 6;
  addWrappedText(formData.deliverableImpact);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Impact of Not Responding:', marginLeft, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 6;
  addWrappedText(formData.noResponseImpact);
  
  // Evaluation
  addHeading('Evaluation');
  
  doc.setFont('helvetica', 'bold');
  doc.text('Cost Evaluation:', marginLeft, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 6;
  addWrappedText(formData.costEvaluation);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Quality Evaluation:', marginLeft, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 6;
  addWrappedText(formData.qualityEvaluation);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Impact on Deadline:', marginLeft, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 6;
  addWrappedText(`${formData.deadlineImpact} ${formData.deadlineImpact === 1 ? 'day' : 'days'}`);
  
  // Recommendations
  addHeading('Recommendations');
  
  doc.setFont('helvetica', 'bold');
  doc.text('Alternatives and Recommendations:', marginLeft, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 6;
  addWrappedText(formData.alternatives);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Final Comments:', marginLeft, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 6;
  addWrappedText(formData.finalComments);
  
  // Footer
  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Generated on: ${formattedDate} at ${formattedTime}`, marginLeft, pageHeight - 10);
  
  // Save PDF
  const sanitizedTitle = (formData.title || 'change-request').toLowerCase().replace(/[^a-z0-9]/g, '-');
  const timestamp = now.toISOString().split('T')[0];
  doc.save(`${sanitizedTitle}-${timestamp}.pdf`);
};
