(function () {
  // Unique ID to ensure we don't inject the callout multiple times
  const CALLOUT_ID = 'custom-sop-deadline-callout';

  // The HTML component you provided
  const CALLOUT_HTML = `
    <div class="callout my-4 px-5 py-4 overflow-hidden rounded-2xl flex gap-3 border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-600/20" data-callout-type="danger">
      <div class="mt-0.5 w-4" data-component-part="callout-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="14" width="14" fill="currentColor" class="flex-none size-4 text-red-800 dark:text-red-300" aria-label="Danger">
          <path d="M17.1 292c-12.9-22.3-12.9-49.7 0-72L105.4 67.1c12.9-22.3 36.6-36 62.4-36l176.6 0c25.7 0 49.5 13.7 62.4 36L494.9 220c12.9 22.3 12.9 49.7 0 72L406.6 444.9c-12.9 22.3-36.6 36-62.4 36l-176.6 0c-25.7 0-49.5-13.7-62.4-36L17.1 292zm41.6-48c-4.3 7.4-4.3 16.6 0 24l88.3 152.9c4.3 7.4 12.2 12 20.8 12l176.6 0c8.6 0 16.5-4.6 20.8-12L453.4 268c4.3-7.4 4.3-16.6 0-24L365.1 91.1c-4.3-7.4-12.2-12-20.8-12l-176.6 0c-8.6 0-16.5 4.6-20.8 12L58.6 244zM256 128c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>
        </svg>
      </div>
      <div class="text-sm prose dark:prose-invert min-w-0 w-full [&_kbd]:bg-background-light dark:[&_kbd]:bg-background-dark [&_code]:!text-current [&_kbd]:!text-current [&_a]:!text-current [&_a]:border-current [&_strong]:!text-current text-red-800 dark:text-red-300" data-component-part="callout-content">
        <span data-as="p"><strong>สำคัญ</strong> : กรุณาส่งเปิดโครงการก่อนวันจัด<strong><u>อย่างน้อย 2 เดือน</u></strong></span>
      </div>
    </div>
  `;

  // Function to check if the current URL matches your conditions
  function shouldShowCallout(pathname) {
    // Remove trailing slash to ensure exact matches work regardless of how the URL is typed
    const path = pathname.replace(/\/$/, '');
    
    return (
      path === '/sop' || 
      path === '/sop/quicklinks' || 
      path.startsWith('/sop/project')
    );
  }

  // Core logic to inject or remove the callout
  function manageCalloutVisibility() {
    const isTargetPage = shouldShowCallout(window.location.pathname);
    const existingCallout = document.getElementById(CALLOUT_ID);

    if (isTargetPage) {
      // If we are on a target page and the callout isn't there yet, inject it
      if (!existingCallout) {
        // Mintlify pages reliably use <h1> for the page title.
        // We inject the callout right after the main title.
        const h1Element = document.querySelector('#header');
        
        if (h1Element) {
          const calloutWrapper = document.createElement('div');
          calloutWrapper.id = CALLOUT_ID;
          calloutWrapper.innerHTML = CALLOUT_HTML;
          
          // Insert it right after the H1 element
          h1Element.parentNode.insertBefore(calloutWrapper, h1Element.nextSibling);
        }
      }
    } else {
      // If we navigate away to a non-matching page, remove the callout
      if (existingCallout) {
        existingCallout.remove();
      }
    }
  }

  // 1. Attempt to run when the document initially loads
  document.addEventListener('DOMContentLoaded', manageCalloutVisibility);

  // 2. Set up a MutationObserver to handle SPA (Single Page Application) navigations
  // This watches the body for DOM updates and ensures the callout persists across React route changes
  const observer = new MutationObserver(() => {
    manageCalloutVisibility();
  });

  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
})();