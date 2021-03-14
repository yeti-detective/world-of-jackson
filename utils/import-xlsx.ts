const XLSX = require("xlsx");
import { IBuildingFields } from "../types/db/contentful";

export type tableConfig = {
  name: string;
  lat: string;
  long: string;
}

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

function validateTableConfig(config: tableConfig): tableConfig {
  if (
    config.name === undefined ||
    config.lat === undefined ||
    config.long === undefined
    ) {
      throw new Error("Invalid config. Must have properties: name, lat, long");
    }
    return config;
}

export class XlsxFormatter {
  xlsx: ImportXlsx;
  config: tableConfig;
  spreadSheet: ImportSpreadSheet;
  sheets: string[];
  buildings: IBuildingFields[];
  buildingsMap: {[key: string]: IBuildingFields};

  constructor(config: tableConfig) {
    this.xlsx = XLSX;
    this.config =  validateTableConfig(config);
    // initialize properties to empty values
    this.spreadSheet = { Sheets: {} };
    this.sheets = [];
    this.buildings = [];
    this.buildingsMap = {};
  }

  initSpreadsheet(fileBlob: Buffer) {
    this.spreadSheet = this.xlsx.read(fileBlob);
    this.sheets = Object.keys(this.spreadSheet.Sheets);
    
    const configs = Object.keys(this.config);
    for (const conf of configs) {
      this.findContent(conf);
    }
  }

  findContent(field: string) {
    let nameColRowSheet: colRowSheetName = { col: "", row: "", sheetName: "" };
    let contentSheet: ImportWorkSheet;
    let startOfData = 0;
    let endOfData = 0;
    const bldgStrings: string[] = [];
    for (const sheet of this.sheets) {
      nameColRowSheet = this.findHeaderColRow(sheet, field);
      if (
        nameColRowSheet.col.length > 0 &&
        nameColRowSheet.row.length > 0 &&
        nameColRowSheet.sheetName.length > 0
      ) {
        contentSheet = this.spreadSheet.Sheets[sheet];
        startOfData = Number(nameColRowSheet.row) + 1
        endOfData = Number(this.getRow(contentSheet["!ref"].split(":")[1]));
        console.log(JSON.stringify(nameColRowSheet, undefined, 2));
        console.log(`data begins on row: ${startOfData} and ends on row ${endOfData}`);
        for (let i = startOfData; i <= endOfData; i++) {
          let cellName: string = `${nameColRowSheet.col}${i}`
          if (contentSheet[cellName]) {
            bldgStrings.push(contentSheet[cellName].v)
          }
        }
        break;
      }
    }
    console.log(JSON.stringify(bldgStrings, undefined, 2))
  }

  findHeaderColRow(sheet: string, header: string): colRowSheetName {
    let sheetName: string = "";
    let addressCol: string = "";
    let addressRow: string = "";
    const checkSheet = this.spreadSheet.Sheets[sheet];
    const cellNames: string[] = Object.keys(checkSheet);
    for (const cellName of cellNames) {
      console.log(cellName)
      if (
        cellName !== "!ref" &&
        checkSheet[cellName]?.v.toLowerCase() == header.toLowerCase() || null
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
