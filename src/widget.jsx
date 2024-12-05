import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.css'; // Tailwind CSS styles
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/react';

const queryClient = new QueryClient();

export function mountWidget(containerId = 'widget-container', props = {}) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  }

  // Attach a Shadow DOM root
  const shadowRoot = container.attachShadow({ mode: 'open' });

  // Create a new container inside the Shadow DOM
  const shadowContainer = document.createElement('div');
  shadowRoot.appendChild(shadowContainer);

  // Add Tailwind styles inside the Shadow DOM
  const tailwindStyles = document.createElement('style');
  tailwindStyles.textContent = `
    ${require('!css-loader!postcss-loader!./index.css').toString()}
  `;
  shadowRoot.appendChild(tailwindStyles);

  // Render React inside the Shadow DOM container
  const root = ReactDOM.createRoot(shadowContainer);

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <App {...props} />
        </NextUIProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );

  // Provide a way to clean up the widget
  return () => {
    root.unmount();
    container.remove();
  };
}
