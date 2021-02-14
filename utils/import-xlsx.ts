const XLSX = require("xlsx");
import { IBuildingFields } from "../types/db/contentful";

type ImportXlsx = {
  read(fileBlob: Buffer): ImportSpreadSheet;
};

type ImportSpreadSheet = {
  Sheets: {
    [key: string]: ImportWorkSheet;
  };
};

interface ImportWorkSheetIface {
  "!ref": string;
}

type ImportWorkSheet = ImportWorkSheetIface & {
  [key: string]: ImportCell;
};

type ImportCell = { v: string };

type colRowSheetName = { sheetName: string; col: string; row: string };

export class XlsxFormatter {
  xlsx: ImportXlsx;
  spreadSheet: ImportSpreadSheet;
  sheets: string[];
  propertyTable: object;
  buildings: IBuildingFields[];

  constructor() {
    this.xlsx = XLSX;
    // initialize properties to empty values
    this.spreadSheet = { Sheets: {} };
    this.sheets = [];
    this.propertyTable = {};
    this.buildings = [];
  }

  initSpreadsheet(fileBlob: Buffer) {
    this.spreadSheet = this.xlsx.read(fileBlob);
    this.sheets = Object.keys(this.spreadSheet.Sheets);
    this.findContent();
  }

  findContent() {
    let addrColRowSheet: colRowSheetName = { col: "", row: "", sheetName: "" };
    let contentSheet: ImportWorkSheet;
    let startOfData = 0;
    let endOfData = 0;
    const addressStrings: string[] = [];
    for (const sheet of this.sheets) {
      addrColRowSheet = this.findHeaderColRow(sheet, "Address");
      if (
        addrColRowSheet.col.length > 0 &&
        addrColRowSheet.row.length > 0 &&
        addrColRowSheet.sheetName.length > 0
      ) {
        contentSheet = this.spreadSheet.Sheets[sheet];
        startOfData = Number(addrColRowSheet.row) + 1
        endOfData = Number(this.getRow(contentSheet["!ref"].split(":")[1]));
        console.log(JSON.stringify(addrColRowSheet, undefined, 2));
        console.log(`data begins on row: ${startOfData} and ends on row ${endOfData}`);
        for (let i = startOfData; i <= endOfData; i++) {
          let cellName: string = `${addrColRowSheet.col}${i}`
          if (contentSheet[cellName]) {
            addressStrings.push(contentSheet[cellName].v)
          }
        }
        break;
      }
    }
    console.log(JSON.stringify(addressStrings, undefined, 2))
  }

  findHeaderColRow(sheet: string, header: string): colRowSheetName {
    let sheetName: string = "";
    let addressCol: string = "";
    let addressRow: string = "";
    const checkSheet = this.spreadSheet.Sheets[sheet];
    const cellNames: string[] = Object.keys(checkSheet);
    for (const cellName of cellNames) {
      if (
        cellName !== "!ref" &&
        checkSheet[cellName]?.v.toLowerCase() == header.toLowerCase()
      ) {
        sheetName = sheet;
        addressCol = this.getCol(cellName);
        addressRow = this.getRow(cellName);
        break;
      }
    }
    return {
      sheetName,
      col: addressCol,
      row: addressRow,
    };
  }

  getCol(cell: string): string {
    // if there is a way to use a RegExp matcher in Typescript, please implement it here
    return cell.split("").reduce((a, b): string => {
      const upperCode: number = b.toUpperCase().charCodeAt(0);
      if (upperCode >= 65 && upperCode <= 90) {
        a += b.toUpperCase();
      }
      return a;
    }, "");
  }

  getRow(cell: string): string {
    // see above re: String.match()
    return cell.split("").reduce((a, b): string => {
      const code: number = b.charCodeAt(0);
      if (code >= 48 && code <= 57) {
        a += b.toUpperCase();
      }
      return a;
    }, "");
  }
}
