const loginView = document.querySelector('#loginView');
const dashboardView = document.querySelector('#dashboardView');
const loginForm = document.querySelector('#loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const toast = document.querySelector('#toast');
const dialog = document.querySelector('#forgotDialog');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

function showDashboard() {
  loginView.hidden = true;
  dashboardView.hidden = false;
  location.hash = 'inicio';
  window.scrollTo(0, 0);
}

function showLogin() {
  dashboardView.hidden = true;
  loginView.hidden = false;
  location.hash = 'login';
  password.value = '';
  window.scrollTo(0, 0);
  email.focus();
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailOk = email.value.trim().length > 0 && email.validity.valid;
  const passwordOk = password.value.trim().length > 0;
  document.querySelector('#emailError').textContent = emailOk ? '' : 'Informe um e-mail válido.';
  document.querySelector('#passwordError').textContent = passwordOk ? '' : 'Informe sua senha.';
  email.classList.toggle('invalid', !emailOk);
  password.classList.toggle('invalid', !passwordOk);
  if (emailOk && passwordOk) showDashboard();
});

document.querySelector('#togglePassword').addEventListener('click', (event) => {
  const showing = password.type === 'text';
  password.type = showing ? 'password' : 'text';
  event.currentTarget.setAttribute('aria-label', showing ? 'Mostrar senha' : 'Ocultar senha');
});

document.querySelector('#forgotButton').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-ok').addEventListener('click', () => dialog.close());
document.querySelector('#logoutButton').addEventListener('click', showLogin);
document.querySelector('#notificationButton').addEventListener('click', () => showToast('Você tem 2 notificações não lidas.'));

document.querySelectorAll('[data-section]').forEach((button) => {
  button.addEventListener('click', () => {
    const section = button.dataset.section;
    if (section === 'Início') return;
    showToast(`${section}: disponível na próxima etapa do projeto.`);
  });
});

window.addEventListener('hashchange', () => {
  if (location.hash === '#login') showLogin();
});

if (location.hash === '#inicio') showDashboard();
else location.hash = 'login';
