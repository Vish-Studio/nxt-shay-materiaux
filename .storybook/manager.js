// Load fonts for Storybook manager UI
const loadFontsInManager = () => {
  // Load Urbanist font
  const urbanistLink = document.createElement('link');
  urbanistLink.rel = 'stylesheet';
  urbanistLink.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap';
  document.head.appendChild(urbanistLink);

  // Load Material Symbols font
  const symbolsLink = document.createElement('link');
  symbolsLink.rel = 'stylesheet';
  symbolsLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
  document.head.appendChild(symbolsLink);

  // Apply font styles
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --font-urbanist: 'Urbanist', sans-serif;
      --font-family-symbols: 'Material Symbols Rounded', monospace;
    }

    /* Apply consistent fonts in manager */
    body {
      font-family: var(--font-urbanist) !important;
    }
  `;
  document.head.appendChild(style);
};

// Load fonts when manager loads
loadFontsInManager();
