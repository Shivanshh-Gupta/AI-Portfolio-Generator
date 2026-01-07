export const templateStyles = {
  modern: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background: var(--bg-color);
    }

    /* Hero Section */
    .hero, [class*="hero"], section:first-of-type {
      padding: 80px 20px;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(168, 85, 247, 0.1));
      text-align: center;
      border-bottom: 2px solid var(--primary-color);
    }

    .hero h1, [class*="hero"] h1, section:first-of-type h1 {
      font-size: 3.5rem;
      margin-bottom: 10px;
      color: var(--primary-color);
      font-weight: 800;
    }

    .hero h2, .hero p, [class*="hero"] h2, [class*="hero"] p {
      font-size: 1.2rem;
      color: var(--text-color);
      margin-bottom: 20px;
    }

    .hero-buttons, .cta-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 30px;
    }

    .hero-buttons a, .cta-buttons a, .btn {
      padding: 12px 30px;
      background: var(--primary-color);
      color: var(--bg-color);
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .hero-buttons a:hover, .cta-buttons a:hover, .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
    }

    /* Sections */
    section {
      padding: 60px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    section h2 {
      font-size: 2.5rem;
      margin-bottom: 40px;
      color: var(--primary-color);
      text-align: center;
      font-weight: 700;
    }

    /* Cards */
    .card, [class*="card"], .item, [class*="item"] {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--primary-color);
      padding: 25px;
      border-radius: 12px;
      transition: all 0.3s ease;
      margin-bottom: 20px;
    }

    .card:hover, [class*="card"]:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(37, 99, 235, 0.2);
      border-color: var(--primary-color);
    }

    .card h3, [class*="card"] h3 {
      color: var(--primary-color);
      margin-bottom: 10px;
      font-size: 1.4rem;
    }

    .card p, [class*="card"] p {
      color: var(--text-color);
      margin-bottom: 10px;
    }

    /* Grid Layouts */
    .grid, .cards-container, [class*="grid"], [class*="container"] {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      margin-bottom: 30px;
    }

    /* Footer */
    footer, [class*="footer"] {
      background: rgba(0, 0, 0, 0.1);
      border-top: 2px solid var(--primary-color);
      padding: 40px 20px;
      text-align: center;
      margin-top: 60px;
    }

    footer p, [class*="footer"] p {
      color: var(--text-color);
      margin-bottom: 15px;
    }

    footer a, [class*="footer"] a {
      color: var(--primary-color);
      text-decoration: none;
      margin: 0 10px;
      transition: all 0.3s ease;
    }

    footer a:hover, [class*="footer"] a:hover {
      text-decoration: underline;
      transform: scale(1.1);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero h1, section:first-of-type h1 {
        font-size: 2rem;
      }
      
      section h2 {
        font-size: 1.8rem;
      }

      .grid, .cards-container {
        grid-template-columns: 1fr;
      }

      .hero-buttons, .cta-buttons {
        flex-direction: column;
      }

      .hero-buttons a, .cta-buttons a {
        width: 100%;
      }
    }
  `,

  minimal: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Georgia', serif;
      line-height: 1.8;
      color: var(--text-color);
      background: var(--bg-color);
      letter-spacing: 0.5px;
    }

    .hero, [class*="hero"], section:first-of-type {
      padding: 100px 40px;
      text-align: center;
      border-bottom: 1px solid var(--primary-color);
    }

    .hero h1, [class*="hero"] h1, section:first-of-type h1 {
      font-size: 3rem;
      margin-bottom: 15px;
      color: var(--primary-color);
      font-weight: 400;
    }

    .hero h2, .hero p {
      font-size: 1.1rem;
      color: var(--text-color);
      margin-bottom: 15px;
      font-weight: 300;
    }

    section {
      padding: 80px 40px;
      max-width: 900px;
      margin: 0 auto;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    section h2 {
      font-size: 2rem;
      margin-bottom: 40px;
      color: var(--primary-color);
      font-weight: 400;
    }

    .card, [class*="card"], .item {
      padding: 30px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .card:last-child, [class*="card"]:last-child {
      border-bottom: none;
    }

    .card h3, [class*="card"] h3 {
      color: var(--primary-color);
      margin-bottom: 8px;
      font-size: 1.3rem;
      font-weight: 500;
    }

    .card p, [class*="card"] p {
      color: var(--text-color);
      margin-bottom: 8px;
    }

    a {
      color: var(--primary-color);
      text-decoration: none;
      border-bottom: 1px solid var(--primary-color);
      transition: all 0.3s ease;
    }

    a:hover {
      color: var(--bg-color);
      background: var(--primary-color);
      padding: 2px 4px;
    }

    footer {
      padding: 60px 40px;
      text-align: center;
      border-top: 1px solid var(--primary-color);
    }

    @media (max-width: 768px) {
      body {
        padding: 0 20px;
      }

      .hero h1 {
        font-size: 2rem;
      }

      section {
        padding: 60px 20px;
      }

      section h2 {
        font-size: 1.5rem;
      }
    }
  `,

  creative: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background: var(--bg-color);
      color: var(--text-color);
      overflow-x: hidden;
    }

    .hero, [class*="hero"], section:first-of-type {
      padding: 100px 20px;
      text-align: center;
      background: linear-gradient(45deg, rgba(37, 99, 235, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2));
      clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
    }

    .hero h1, [class*="hero"] h1, section:first-of-type h1 {
      font-size: 4rem;
      margin-bottom: 15px;
      color: var(--primary-color);
      animation: slideInDown 0.8s ease;
    }

    .hero h2, .hero p {
      font-size: 1.3rem;
      color: var(--text-color);
      margin-bottom: 20px;
      animation: slideInUp 0.8s ease;
    }

    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    section {
      padding: 80px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    section h2 {
      font-size: 2.5rem;
      margin-bottom: 50px;
      color: var(--primary-color);
      text-align: center;
    }

    .grid, .cards-container, [class*="grid"] {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }

    .card, [class*="card"], .item {
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(168, 85, 247, 0.1));
      border: 2px solid var(--primary-color);
      padding: 30px;
      border-radius: 20px;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
      position: relative;
      overflow: hidden;
    }

    .card::before, [class*="card"]::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .card:hover::before, [class*="card"]:hover::before {
      left: 100%;
    }

    .card:hover, [class*="card"]:hover {
      transform: translateY(-10px) rotateY(5deg);
      box-shadow: 0 20px 40px rgba(37, 99, 235, 0.3);
    }

    .card h3, [class*="card"] h3 {
      color: var(--primary-color);
      font-size: 1.5rem;
      margin-bottom: 12px;
    }

    .card p, [class*="card"] p {
      color: var(--text-color);
    }

    .btn, .cta-buttons a, .hero-buttons a {
      display: inline-block;
      padding: 15px 35px;
      background: linear-gradient(135deg, var(--primary-color), rgba(37, 99, 235, 0.8));
      color: var(--bg-color);
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid var(--primary-color);
      margin-top: 20px;
    }

    .btn:hover, .cta-buttons a:hover {
      transform: scale(1.05) rotate(-2deg);
      box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
    }

    footer {
      padding: 50px 20px;
      text-align: center;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(168, 85, 247, 0.1));
      border-top: 3px solid var(--primary-color);
    }

    @media (max-width: 768px) {
      .hero h1, section:first-of-type h1 {
        font-size: 2.5rem;
      }

      .grid {
        grid-template-columns: 1fr;
      }
    }
  `,

  professional: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Trebuchet MS', sans-serif;
      background: var(--bg-color);
      color: var(--text-color);
    }

    .hero, [class*="hero"], section:first-of-type {
      padding: 80px 40px;
      background: linear-gradient(to right, rgba(37, 99, 235, 0.05), rgba(37, 99, 235, 0.1));
      border-left: 5px solid var(--primary-color);
    }

    .hero h1, [class*="hero"] h1, section:first-of-type h1 {
      font-size: 2.8rem;
      margin-bottom: 10px;
      color: var(--primary-color);
      font-weight: 700;
    }

    .hero h2, .hero p {
      font-size: 1rem;
      color: var(--text-color);
      margin-bottom: 12px;
      font-weight: 500;
    }

    section {
      padding: 60px 40px;
      max-width: 1100px;
      margin: 0 auto;
      border-bottom: 1px solid rgba(37, 99, 235, 0.2);
    }

    section:last-of-type {
      border-bottom: none;
    }

    section h2 {
      font-size: 1.8rem;
      margin-bottom: 30px;
      color: var(--primary-color);
      border-left: 4px solid var(--primary-color);
      padding-left: 15px;
      font-weight: 700;
    }

    .card, [class*="card"], .item {
      background: rgba(255, 255, 255, 0.02);
      border-left: 4px solid var(--primary-color);
      padding: 20px;
      margin-bottom: 20px;
      transition: all 0.3s ease;
    }

    .card:hover, [class*="card"]:hover {
      background: rgba(37, 99, 235, 0.08);
      padding-left: 25px;
    }

    .card h3, [class*="card"] h3 {
      color: var(--primary-color);
      margin-bottom: 5px;
      font-size: 1.1rem;
      font-weight: 700;
    }

    .card p, [class*="card"] p {
      color: var(--text-color);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    .card .subtitle, [class*="card"] .subtitle {
      color: var(--primary-color);
      font-size: 0.85rem;
      font-style: italic;
      margin-bottom: 8px;
    }

    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    a:hover {
      text-decoration: underline;
    }

    footer {
      padding: 40px;
      background: rgba(37, 99, 235, 0.05);
      border-top: 2px solid var(--primary-color);
      text-align: center;
    }

    footer p {
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .hero {
        padding: 60px 20px;
      }

      .hero h1 {
        font-size: 2rem;
      }

      section {
        padding: 40px 20px;
      }

      section h2 {
        font-size: 1.4rem;
      }
    }
  `,
}