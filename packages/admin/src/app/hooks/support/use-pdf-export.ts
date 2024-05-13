import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

export const usePDF = (name: string, id: string) => {
  const doc = new jsPDF();

  const getPDF = () => {
    doc.text(name, 15, 10);
    autoTable(doc, {
      html: id,
      theme: "grid",
    });
    doc.save(`${name.replaceAll(" ", "_")}.pdf`);
  };

  return { getPDF };
};
