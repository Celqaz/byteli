// Handles the inline "reply to this post" form under each blog post.
// Submits to the Vercel serverless function at /api/contact (see api/contact.js).
(function () {
  var forms = document.querySelectorAll('.reply-form');
  if (!forms.length || !window.fetch) return;

  forms.forEach(function (form) {
    var status = form.querySelector('.reply-status');
    var submit = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var message = (form.querySelector('[name="message"]') || {}).value || '';
      if (!message.trim()) {
        form.querySelector('[name="message"]').focus();
        return;
      }

      var email = (form.querySelector('[name="email"]') || {}).value || '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        var emailField = form.querySelector('[name="email"]');
        if (emailField) emailField.focus();
        return;
      }

      var payload = {
        email: email,
        message: message,
        website: (form.querySelector('[name="website"]') || {}).value || '', // honeypot
        title: form.dataset.title || '',
        url: form.dataset.url || ''
      };

      setStatus(form, status, (form.dataset.sending || 'Sending…'), false);
      if (submit) submit.disabled = true;

      fetch(form.action || '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json().catch(function () { return {}; }); })
        .then(function (out) {
          if (out && out.ok) {
            setStatus(form, status, (form.dataset.success || 'Thanks!'), true);
            form.reset();
          } else {
            setStatus(form, status, (form.dataset.error || 'Something went wrong.'), false);
          }
        })
        .catch(function () {
          setStatus(form, status, (form.dataset.error || 'Something went wrong.'), false);
        })
        .finally(function () {
          if (submit) submit.disabled = false;
        });
    });
  });

  function setStatus(form, status, text, success) {
    if (!status) return;
    status.textContent = text;
    status.className = 'reply-status' + (success ? ' success' : ' error');
  }
})();
