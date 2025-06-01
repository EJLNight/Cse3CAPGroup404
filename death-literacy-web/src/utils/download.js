import jsPDF from "jspdf";

// Accepts a quiz record object and downloads it as a PDF
export function downloadQuizResultAsPDF(record, username = "user") {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Quiz Result", 20, 20);

  doc.setFontSize(12);
  doc.text(`Username: ${username}`, 20, 35);
  doc.text(`Title: ${record.title}`, 20, 45);
  doc.text(`Score: ${record.score}`, 20, 55);
  doc.text(`Feedback: ${record.feedback}`, 20, 65);

  doc.save(`quiz_result_${username}.pdf`);
}
