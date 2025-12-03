(function () {
  try {
    var t = localStorage.getItem('isDarkMode');
    var s = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && s)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
