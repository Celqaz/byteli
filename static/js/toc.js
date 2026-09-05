// Moves the inline table of contents below a leading Spotify embed (if the
// post starts with one); otherwise it stays right under the title/byline.
(function () {
  var toc = document.getElementById('toc-inline');
  if (!toc) return;
  var content = document.querySelector('content');
  if (!content) return;

  var iframes = content.querySelectorAll('iframe');
  var spotify = null;
  for (var i = 0; i < iframes.length; i++) {
    var src = iframes[i].getAttribute('src') || '';
    if (src.indexOf('spotify.com/embed') !== -1) { spotify = iframes[i]; break; }
  }
  if (!spotify) return;

  // Climb to the top-level block of the embed inside <content>.
  var block = spotify;
  while (block.parentNode && block.parentNode !== content) block = block.parentNode;

  var kids = Array.prototype.slice.call(content.children);
  if (kids[0] !== toc) return; // safety: inline TOC should be the first child
  var idx = kids.indexOf(block);
  if (idx >= 1 && idx <= 2) {
    content.insertBefore(toc, block.nextSibling);
  }
})();
