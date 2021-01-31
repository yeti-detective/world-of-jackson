#!/usr/bin/env ts-node-script
// import XLSX from 'xlsx'
const XLSX = require("xlsx")

if (XLSX !== undefined) {
    console.log("Hello, World! You passed the following filepath: ", process.argv[1])    
} else {
    console.log("You hecked up, bro")
}

export interface iAmAModuleNow {}