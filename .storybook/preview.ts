import type { Preview } from '@storybook/react';
import '../styles/global-icons.scss';
import '../styles/global.scss';

// Load Material Symbols font for Storybook from Google Fonts
const loadMaterialSymbolsFont = () => {
  if (typeof document !== 'undefined') {
    // Create and inject Google Fonts link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(link);

    // Create CSS variables and override for Storybook
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --font-family-symbols: 'Material Symbols Rounded', monospace;
      }
      
      .symbol {
        font-family: 'Material Symbols Rounded', monospace !important;
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
    `;
    document.head.appendChild(style);
  }
};

// Load the font when Storybook initializes
loadMaterialSymbolsFont();

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
  tags: ['autodocs']
};

export default preview;
