import XLSX from "sheetjs-style"
import FileSaver from "file-saver"

export const ExcelExportAdapter = (fileName, dataArray) => {
    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    let ws = XLSX.utils.json_to_sheet(dataArray)
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: filetype })
    FileSaver.saveAs(fileData, fileName + ".xlsx")
}