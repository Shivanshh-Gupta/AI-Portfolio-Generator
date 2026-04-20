const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
const fs = require('fs');
const path = require('path');

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function listModels() {
    try {
        console.log("Fetching models...");
        const response = await ai.models.list();

        let output = "Models found:\n";

        // Inspect response structure
        if (response && response.models) {
            response.models.forEach(m => {
                output += `- ${m.name} (Supported methods: ${m.supportedGenerationMethods})\n`;
            });
        } else if (Array.isArray(response)) {
            response.forEach(m => {
                output += `- ${m.name || m}\n`;
            });
        } else {
            output += JSON.stringify(response, null, 2);
        }

        fs.writeFileSync(path.join(__dirname, 'available_models.txt'), output);
        console.log("Models written to available_models.txt");
    } catch (error) {
        const errorMsg = `Error listing models: ${error.message}\n${JSON.stringify(error, null, 2)}`;
        console.error(errorMsg);
        fs.writeFileSync(path.join(__dirname, 'model_error.txt'), errorMsg);
    }
}

listModels();
