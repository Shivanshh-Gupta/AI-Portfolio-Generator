export const enhancedTemplateStyles = {
    // 🎨 MONOCHROME MODERN - Sleek & Professional
    monochromeModern: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      line-height: 1.7;
      color: var(--text-color);
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0a0a0a 100%);
      overflow-x: hidden;
    }

    /* Animated Background */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    /* Hero Section with Glass Effect */
    .hero, [class*="hero"], section:first-of-type {
      position: relative;
      padding: 120px 40px;
      text-align: center;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
    }

    .hero::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    }

    .hero h1, [class*="hero"] h1, section:first-of-type h1 {
      font-size: 4rem;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #ffffff, #a0a0a0);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 800;
      letter-spacing: -2px;
      animation: fadeInUp 0.8s ease-out;
    }

    .hero h2, .hero p {
      font-size: 1.3rem;
      color: #b0b0b0;
      margin-bottom: 30px;
      animation: fadeInUp 1s ease-out;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Animated Buttons */
    .hero-buttons, .cta-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 40px;
      animation: fadeInUp 1.2s ease-out;
    }

    .hero-buttons a, .cta-buttons a, .btn {
      padding: 16px 40px;
      background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
      color: #ffffff;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
      position: relative;
      overflow: hidden;
    }

    .hero-buttons a::before, .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    .hero-buttons a:hover::before, .btn:hover::before {
      left: 100%;
    }

    .hero-buttons a:hover, .btn:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
    }

    /* Sections with Stagger Animation */
    section {
      position: relative;
      padding: 80px 40px;
      max-width: 1200px;
      margin: 0 auto;
      animation: fadeIn 1s ease-out;
    }

    section h2 {
      font-size: 3rem;
      margin-bottom: 60px;
      background: linear-gradient(135deg, #ffffff, #808080);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      font-weight: 700;
      letter-spacing: -1px;
    }

    /* Premium Cards with Hover Effects */
    .grid, .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .card, [class*="card"], .item {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 35px;
      border-radius: 16px;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
      transform: scaleX(0);
      transition: transform 0.4s ease;
    }

    .card:hover::before {
      transform: scaleX(1);
    }

    .card:hover {
      transform: translateY(-8px);
      box-shadow: 0 25px 50px rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
    }

    .card h3 {
      color: #ffffff;
      margin-bottom: 15px;
      font-size: 1.6rem;
      font-weight: 600;
    }

    .card p {
      color: #b0b0b0;
      line-height: 1.8;
      margin-bottom: 12px;
    }

    /* Skills/Tags */
    .skills, .tags, [class*="skill"], [class*="tag"] {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 15px;
    }

    .skill, .tag, [class*="skill"] span, [class*="tag"] span {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      font-size: 0.85rem;
      color: #d0d0d0;
      transition: all 0.3s ease;
    }

    .skill:hover, .tag:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    /* Footer with Gradient */
    footer, [class*="footer"] {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 60px 40px;
      text-align: center;
      margin-top: 80px;
    }

    footer p {
      color: #a0a0a0;
      margin-bottom: 20px;
    }

    footer a {
      color: #ffffff;
      text-decoration: none;
      margin: 0 15px;
      transition: all 0.3s ease;
      position: relative;
    }

    footer a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 1px;
      background: #ffffff;
      transition: width 0.3s ease;
    }

    footer a:hover::after {
      width: 100%;
    }

    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      section h2 { font-size: 2rem; }
      .grid { grid-template-columns: 1fr; }
      .hero-buttons { flex-direction: column; }
      .hero-buttons a { width: 100%; }
    }
  `,

    // 🎯 GLASS MORPHISM - Ultra Modern
    glassMorphism: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0a0a0a;
      color: #e0e0e0;
      position: relative;
      overflow-x: hidden;
    }

    /* Animated Gradient Background */
    body::before {
      content: '';
      position: fixed;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: 
        radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 50px 50px;
      background-position: 0 0, 25px 25px;
      animation: backgroundMove 20s linear infinite;
      z-index: 0;
    }

    @keyframes backgroundMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }

    /* Glass Container */
    .container, section, .hero {
      position: relative;
      z-index: 1;
    }

    .hero, section:first-of-type {
      padding: 100px 40px;
      text-align: center;
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      margin: 40px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .hero h1 {
      font-size: 4.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #ffffff 0%, #808080 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
      letter-spacing: -3px;
    }

    .hero p {
      font-size: 1.4rem;
      color: #b0b0b0;
      max-width: 700px;
      margin: 0 auto 40px;
      line-height: 1.8;
    }

    /* Glass Cards */
    section {
      padding: 60px 40px;
      max-width: 1400px;
      margin: 40px auto;
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
    }

    section h2 {
      font-size: 2.8rem;
      color: #ffffff;
      margin-bottom: 50px;
      text-align: center;
      font-weight: 600;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
    }

    .card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 30px;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .card:hover::before {
      opacity: 1;
    }

    .card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 60px rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .card h3 {
      color: #ffffff;
      font-size: 1.5rem;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .card p {
      color: #c0c0c0;
      line-height: 1.7;
    }

    /* Buttons */
    .btn, a.btn {
      display: inline-block;
      padding: 14px 32px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: #ffffff;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      margin: 10px;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(255, 255, 255, 0.15);
    }

    /* Footer */
    footer {
      padding: 50px 40px;
      text-align: center;
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin: 40px;
      border-radius: 24px;
    }

    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      .hero, section, footer { margin: 20px; padding: 40px 20px; }
      .grid { grid-template-columns: 1fr; }
    }
  `,

    // 💎 MINIMALIST ELITE - Clean & Sophisticated
    minimalistElite: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background: #000000;
      color: #ffffff;
      line-height: 1.8;
      letter-spacing: 0.3px;
    }

    .hero {
      padding: 120px 60px;
      max-width: 900px;
      margin: 0 auto;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .hero h1 {
      font-size: 5rem;
      font-weight: 300;
      letter-spacing: -4px;
      margin-bottom: 30px;
      color: #ffffff;
    }

    .hero p {
      font-size: 1.2rem;
      color: #a0a0a0;
      font-weight: 300;
      max-width: 600px;
    }

    section {
      padding: 100px 60px;
      max-width: 900px;
      margin: 0 auto;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    section:last-of-type {
      border-bottom: none;
    }

    section h2 {
      font-size: 2rem;
      font-weight: 300;
      margin-bottom: 50px;
      color: #ffffff;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .card {
      padding: 40px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;
    }

    .card:last-child {
      border-bottom: none;
    }

    .card:hover {
      padding-left: 20px;
    }

    .card h3 {
      font-size: 1.4rem;
      font-weight: 400;
      margin-bottom: 10px;
      color: #ffffff;
    }

    .card p {
      color: #909090;
      font-size: 1rem;
      line-height: 1.8;
    }

    .card .date, .card .subtitle {
      color: #606060;
      font-size: 0.9rem;
      margin-bottom: 10px;
      font-style: italic;
    }

    a {
      color: #ffffff;
      text-decoration: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
      padding-bottom: 2px;
    }

    a:hover {
      border-bottom-color: #ffffff;
    }

    footer {
      padding: 80px 60px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    footer p {
      color: #707070;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .hero, section, footer { padding: 60px 30px; }
      .hero h1 { font-size: 3rem; }
    }
  `
};

// Export for use
export default enhancedTemplateStyles;
