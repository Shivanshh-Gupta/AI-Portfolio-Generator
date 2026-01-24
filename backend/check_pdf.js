const fs = require('fs');
try {
    const pkg = require('pdf-parse/package.json');
    console.log(`pdf-parse version: ${pkg.version}`);

    const pdfParse = require('pdf-parse');
    console.log('Type of require("pdf-parse"):', typeof pdfParse);
    console.log('Keys of require("pdf-parse"):', Object.keys(pdfParse));

    if (pdfParse.PDFParse) {
        console.log('Has .PDFParse property');
    } else {
        console.log('Does NOT have .PDFParse property');
    }
} catch (e) {
    console.error(e);
}
