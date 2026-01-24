function wrapWithProfessionalStyling(htmlContent, template = 'modern') {
    // Extract body content from AI-generated HTML
    let bodyContent = htmlContent;

    // Try to extract just the body content if it's a complete HTML document
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
        bodyContent = bodyMatch[1];
    }

    // Extract any existing title
    const titleMatch = htmlContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1] : 'Professional Portfolio';

    // Professional styling template
    const styledHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            /* Theme colors will be injected by theme CSS */
            /* Default fallbacks only for non-color variables */
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        /* Navigation */
        nav {
            position: sticky;
            top: 0;
            background: rgba(255, 255, 255, 0.98);
            padding: 20px 0;
            box-shadow: var(--shadow);
            z-index: 1000;
            backdrop-filter: blur(10px);
        }
        
        nav .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }
        
        nav .logo {
            font-size: 24px;
            font-weight: 700;
            color: var(--primary-color);
            text-decoration: none;
        }
        
        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
            flex-wrap: wrap;
        }
        
        nav a {
            text-decoration: none;
            color: var(--text-color);
            font-weight: 500;
            transition: color 0.3s ease;
            position: relative;
        }
        
        nav a:hover {
            color: var(--primary-color);
        }
        
        nav a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-color);
            transition: width 0.3s ease;
        }
        
        nav a:hover::after {
            width: 100%;
        }
        
        .btn, button, .btn-chat, .btn-primary, .btn-secondary {
            background: var(--primary-color);
            color: white !important;
            padding: 12px 28px;
            border-radius: 6px;
            border: 2px solid var(--primary-color);
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
        }
        
        .btn:hover, button:hover, .btn-chat:hover, .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
        }
        
        .btn-secondary {
            background: transparent;
            color: var(--text-color) !important;
            border: 2px solid var(--text-color);
        }
        
        .btn-secondary:hover {
            background: var(--text-color);
            color: white !important;
        }
        
        /* Container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Sections */
        section {
            padding: 80px 20px;
            min-height: auto;
        }
        
        section:first-of-type {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }
        
        /* Headings */
        h1, h2, h3, h4, h5, h6 {
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 20px;
            color: var(--text-color);
        }
        
        h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            margin-bottom: 20px;
        }
        
        h2 {
            font-size: clamp(2rem, 4vw, 3rem);
            margin-bottom: 40px;
            text-align: center;
        }
        
        h3 {
            font-size: clamp(1.5rem, 3vw, 2rem);
        }
        
        p {
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 20px;
            color: #666;
        }
        
        /* Links */
        a {
            color: var(--primary-color);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        a:hover {
            color: #ff8c5a;
        }
        
        /* Lists */
        ul, ol {
            margin: 20px 0;
            padding-left: 30px;
        }
        
        li {
            margin: 10px 0;
            line-height: 1.6;
        }
        
        /* Cards */
        .card, article, .project, .skill, .experience-item {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: var(--shadow);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin-bottom: 30px;
        }
        
        .card:hover, article:hover, .project:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }
        
        /* Grid Layouts */
        .grid, .skills-grid, .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        
        /* Highlight/Accent Text */
        .highlight, span[style*="color"] {
            color: var(--primary-color) !important;
            font-weight: 600;
        }
        
        /* Images */
        img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
        }
        
        /* Footer */
        footer {
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 40px 20px;
            margin-top: 80px;
        }
        
        footer p {
            color: rgba(255, 255, 255, 0.8);
        }
        
        footer a {
            color: white;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            nav ul {
                display: none;
            }
            
            section {
                padding: 60px 20px;
            }
            
            h1 {
                font-size: 2.5rem;
            }
            
            h2 {
                font-size: 2rem;
            }
            
            .grid, .skills-grid, .projects-grid {
                grid-template-columns: 1fr;
            }
        }
        
        /* Animations */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        section > * {
            animation: fadeIn 0.6s ease-out;
        }
        
        /* Smooth Scrolling */
        html {
            scroll-behavior: smooth;
        }
        
        /* Selection */
        ::selection {
            background: var(--primary-color);
            color: white;
        }
    </style>
</head>
<body>
    ${bodyContent}
</body>
</html>`;

    return styledHTML;
}

module.exports = { wrapWithProfessionalStyling };
