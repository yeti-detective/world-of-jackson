#!/usr/bin/env ts-node-script
import fs = require("fs");
import { XlsxFormatter } from "../../utils/import-xlsx"

const filePath: string = process.argv[2];

if (!filePath) {
    const usageMsg: string = `
    Usage: yarn import-xlsx <file path to excel file>
    `
    console.log(usageMsg)
} else {
    importXlsxPropertyList(filePath)
}

function importXlsxPropertyList(filePath: string) {
    let fileBlob: Buffer
    // first block, obtain input file
    try {
        // check for read access to file
        fs.accessSync(filePath, fs.constants.R_OK)
        fileBlob = fs.readFileSync(filePath)
        console.log(`successfully read ${fileBlob.length} bits from file`)
    } catch (err) {
        console.warn(err)
    }
    
    // second block, initialize spreadsheet
    const xlsxFormatter = new XlsxFormatter()
    try {
        xlsxFormatter.initSpreadsheet(fileBlob)
    } catch (err) {
        console.warn(err)
    }
    // third block, parse file to intermediate format
}
