// backend/extraction/extract.js

const fs = require('fs'); // <--- ADD THIS LINE to import the File System module
const { PDFParse } = require('pdf-parse'); // Import the class

// 1. DEFINE AND POPULATE THE 'buffer' VARIABLE
// const pdfPath = 'sample.pdf'; // Correct file name is 'cv.pdf'
// const buffer = fs.readFileSync(pdfPath); 
// ---------------------------------------

// // --- FIX for 'parser is not defined' ---
// // Create the parser instance
// const parser = new PDFParse({ data: buffer });

// parser.getText().then((result)=>{
//     console.log(result.text);
// });

// parser.getInfo().then((result)=>{
//     console.log(result)
// }).finally(async ()=>{
//     await parser.destroy();
// });
// ---------------------------------------

const extractTextFromPDF = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const parser = new PDFParse({ data: dataBuffer });
        const result = await parser.getText();
        await parser.destroy();
        return result.text;
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw error;
    }
}

module.exports = { extractTextFromPDF };
