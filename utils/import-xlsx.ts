#!/usr/bin/env ts-node-script
// import XLSX from 'xlsx'
import IBuildingFields from "types/db/contentful"

const XLSX = require("xlsx")

interface IXlsx {
    read (fileBlob: Buffer): ISpreadSheet 
}

interface ISpreadSheet {
    Sheets: {
        [key: string]: {
            [key: string]: {
                v: string
            }
        }
    }
}

export class XlsxImporter {
    xlsx: IXlsx
    spreadSheet: ISpreadSheet
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

    findContent(): string {
        for (const sheet of this.sheets) {
            const addrCol = this.findAddressCol(sheet)
        }
        return ''
    }

    findAddressCol(sheet: string): string {
        for (const sheet of sheets) {

        }
        return ''
    }

    getCol(cell: string): string {
        const alpha = new RegExp(/[A-Z]/)
        return cell.match(alpha)?[0]
    }
}

