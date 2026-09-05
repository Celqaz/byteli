// Click-to-zoom lightbox for article images (no dependencies).
(function () {
  var overlay = null;

  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Enlarged image');

    var img = document.createElement('img');
    overlay.appendChild(img);

    function close() {
      overlay.classList.remove('open');
      document.body.classList.remove('zoom-lock');
    }
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    document.body.appendChild(overlay);
    return overlay;
  }

  document.addEventListener('click', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG') return;
    // Only zoom article images, never ones already inside a link or the overlay.
    if (img.closest('a')) return;
    if (!(img.closest('content') || img.closest('figure'))) return;

    var src = img.currentSrc || img.src;
    if (!src) return;

    e.preventDefault();
    var ov = ensureOverlay();
    var oimg = ov.querySelector('img');
    oimg.alt = img.alt || '';
    oimg.src = src;
    ov.classList.add('open');
    document.body.classList.add('zoom-lock');
  });
})();
