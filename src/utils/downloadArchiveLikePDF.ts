import { Archive } from "@/models/archive"
import { jsPDF } from "jspdf";

export const downloadArchiveLikePDF = ({ archive }: { archive: Archive }): void => {
    const doc = new jsPDF()
    doc.setTextColor('#000000')
    
    let Y = 16 // This is the Y Coordinate for texts
  
    archive.forEach(({ date, tasklist }) => {
      doc.setFontSize(26)
      doc.text(date, 10, Y)
      doc.setFontSize(20)
  
      tasklist.forEach(({ descriptionText })=> {
        Y += 10
        doc.text(descriptionText, 20, Y)
      })
  
      Y += 14
    })
  
    doc.save('archivo_Boar.pdf')
}