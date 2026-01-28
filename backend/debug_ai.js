const { generatePortfolio } = require('./utils/aihelper');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
    try {
        console.log("Testing generatePortfolio...");
        const result = await generatePortfolio("This is a test resume content.", null, "new", "modern");
        console.log("Success! Result subset:", result.substring(0, 200));
    } catch (error) {
        console.error("Error occurred in generatePortfolio:");
        console.error(error);
    }
}

run();
