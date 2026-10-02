// WikiMove Academic Prototype Lightweight Client Script
document.addEventListener('DOMContentLoaded', () => {
  // Toast notification helper
  let toastEl = document.querySelector('.toast-msg');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast-msg';
    document.body.appendChild(toastEl);
  }

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.style.display = 'block';
    setTimeout(() => {
      toastEl.style.display = 'none';
    }, 2500);
  }

  // Attach mock action handlers
  document.querySelectorAll('.btn-keep, .btn-archive, .btn-delete, .btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const actionName = btn.textContent.trim();
      showToast(`Action simulated: [${actionName}] (Academic Prototype Representation)`);
    });
  });
});
