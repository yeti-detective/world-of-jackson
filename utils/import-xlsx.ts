const XLSX = require('xlsx')
import { IBuildingFields } from "../types/db/contentful"

type ImportXlsx = {
    read (fileBlob: Buffer): ImportSpreadSheet 
}

type ImportWorkSheet = {
    [key: string]: {
        v: string
    }
}

type ImportSpreadSheet = {
    Sheets: ImportWorkSheet
}

export class XlsxImporter {
    xlsx: ImportXlsx
    spreadSheet: ImportSpreadSheet
    sheets: string[]
    propertyTable: object
    buildings: IBuildingFields[]

    constructor() {
       this.xlsx = XLSX;
       // initialize properties to empty values
       this.spreadSheet = { Sheets: {} };
       this.sheets = [];
       this.propertyTable = {};
       this.buildings = []
    }

    initSpreadsheet(fileBlob: Buffer) {
        this.spreadSheet = this.xlsx.read(fileBlob)
        this.sheets = Object.keys(this.spreadSheet.Sheets)
    }

    testMethod(filePath: string): string {
        return filePath
    }

    // findContent(): string {
    //     for (const sheet of this.sheets) {
    //         const addrCol = this.findAddressCol(sheet)
    //     }
    //     return ''
    // }

    // findAddressCol(sheet: string): string {
    //     // for (const sheet of sheets) {

    //     // }
    //     return ''
    // }

    // getCol(cell: string): string {
    //     const alpha: RegExp = new RegExp(/[A-Z]/)
    //     return cell.match(alpha)?[0]
    // }
}

