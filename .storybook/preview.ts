import type { Preview } from '@storybook/react';
import '../styles/global-icons.scss';
import '../styles/global.scss';

// Load fonts for Storybook
const loadFonts = () => {
  if (typeof document !== 'undefined') {
    // Load Urbanist font from Google Fonts (same as Next.js layout)
    const urbanistLink = document.createElement('link');
    urbanistLink.rel = 'stylesheet';
    urbanistLink.href =
      'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap';
    document.head.appendChild(urbanistLink);

    // Load Material Symbols font from Google Fonts
    const symbolsLink = document.createElement('link');
    symbolsLink.rel = 'stylesheet';
    symbolsLink.href =
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(symbolsLink);

    // Create CSS variables to match Next.js layout
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --font-urbanist: 'Urbanist', sans-serif;
        --font-family-symbols: 'Material Symbols Rounded', monospace;
      }

      /* Apply Urbanist font to body (matching Next.js layout) */
      body {
        font-family: var(--font-urbanist) !important;
      }

      /* Ensure Material Symbols work properly */
      .icon.symbol {
        font-family: var(--font-family-symbols) !important;
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        font-weight: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
      }
    `;
    document.head.appendChild(style);
  }
};

// Load the fonts when Storybook initializes
loadFonts();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    nextjs: {
      appDirectory: true
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'dark',
          value: '#333333'
        }
      ]
    }
  },
  tags: ['autodocs'],

  decorators: [
    (Story) => {
      // Ensure fonts are loaded for each story
      if (typeof document !== 'undefined') {
        document.body.style.fontFamily = 'var(--font-urbanist), Urbanist, sans-serif';
      }
      return Story();
    }
  ]
};

export default preview;
