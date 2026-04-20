function wrapWithProfessionalStyling(htmlContent, template = 'modern') {
    // If the AI returned a complete HTML document — return it untouched.
    // The old code was stripping AI's CSS and replacing with a plain white theme.
    const isCompleteDoc = /<!DOCTYPE\s+html/i.test(htmlContent) || /<html[\s>]/i.test(htmlContent);
    if (isCompleteDoc) {
        return htmlContent;
    }

    // Fallback: wrap bare HTML fragments (rare edge case)
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #0a192f; color: #ccd6f6; line-height: 1.6; }
        a { color: #00d9ff; text-decoration: none; }
        html { scroll-behavior: smooth; }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;
}

module.exports = { wrapWithProfessionalStyling };
