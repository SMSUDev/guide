(function () {
  // Get the base URL of the current page
  const baseURL = window.location.origin;

  // --- 1. Define Manifest Content ---
  const manifestContent = {
    name: 'SMSU One Stop Guide',
    short_name: 'SMSU Guide',
    start_url: `${baseURL}/`,
    icons: [
      {
        src: `${baseURL}/logo/web-app-manifest-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `${baseURL}/logo/web-app-manifest-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#0FA461',
    display: 'standalone',
  };

  // --- 2. Create and Link Manifest ---
  try {
    const stringifiedManifest = JSON.stringify(manifestContent);
    const blob = new Blob([stringifiedManifest], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(blob);

    const linkTag = document.createElement('link');
    linkTag.rel = 'manifest';
    linkTag.href = manifestURL;
    document.head.appendChild(linkTag);
    console.log('[PWA Setup] Manifest linked successfully.');
  } catch (error) {
    console.error('[PWA Setup] Error creating or linking manifest:', error);
  }

  // --- 3. Register Service Worker ---
  // if ('serviceWorker' in navigator) {
  //   window.addEventListener('load', () => {
  //     navigator.serviceWorker
  //       .register('/sw.js') // Path to sw.js in public folder
  //       .then((registration) => {
  //         console.log('[PWA Setup] Service Worker registered with scope:', registration.scope);
  //       })
  //       .catch((error) => {
  //         console.error('[PWA Setup] Service Worker registration failed:', error);
  //       });
  //   });
  // } else {
  //   console.log('[PWA Setup] Service Worker not supported in this browser.');
  // }
})();
