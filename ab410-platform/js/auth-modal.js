export class AuthModal {
  constructor(authManager) {
    this.authManager = authManager;
    this.modal = null;
    this.isOpen = false;
  }

  create() {
    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.className = 'auth-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'auth-modal-title');

    modal.innerHTML = `
      <div class="auth-modal-backdrop"></div>
      <div class="auth-modal-content">
        <div class="auth-modal-card">
          <div class="auth-modal-header">
            <h2 id="auth-modal-title">Sign In</h2>
            <p>AB-410 Academy Progress Tracker</p>
          </div>

          <form id="auth-form" class="auth-form">
            <div class="auth-form-group">
              <label for="auth-email">Email</label>
              <input
                type="email"
                id="auth-email"
                name="email"
                placeholder="jama.mohamed@nhs.net"
                required
                autocomplete="email"
              />
            </div>

            <div class="auth-form-group">
              <label for="auth-password">Password</label>
              <input
                type="password"
                id="auth-password"
                name="password"
                placeholder="••••••••"
                required
                autocomplete="current-password"
              />
            </div>

            <div id="auth-error" class="auth-error"></div>

            <button type="submit" class="auth-submit-button">
              Sign In
            </button>
          </form>

          <div class="auth-modal-footer">
            <p class="auth-hint">Demo accounts:</p>
            <div class="demo-accounts">
              <button type="button" class="demo-button" data-email="jama.mohamed@nhs.net">
                <strong>Jama</strong>
                <span>jama.mohamed@nhs.net</span>
              </button>
              <button type="button" class="demo-button" data-email="ismail@nhs.net">
                <strong>Ismail</strong>
                <span>ismail@nhs.net</span>
              </button>
            </div>
            <p class="auth-small-text">
              <strong>Note:</strong> Progress is saved to Firestore and synced across devices.
            </p>
          </div>
        </div>
      </div>
    `;

    this.modal = modal;
    this.attachEventListeners();
    return modal;
  }

  attachEventListeners() {
    const form = this.modal.querySelector('#auth-form');
    const emailInput = this.modal.querySelector('#auth-email');
    const demoButtons = this.modal.querySelectorAll('.demo-button');

    form.addEventListener('submit', (e) => this.handleSubmit(e));

    demoButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        emailInput.value = btn.dataset.email;
        emailInput.focus();
      });
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const email = this.modal.querySelector('#auth-email').value;
    const password = this.modal.querySelector('#auth-password').value;
    const errorDiv = this.modal.querySelector('#auth-error');
    const submitBtn = this.modal.querySelector('.auth-submit-button');

    errorDiv.textContent = '';
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Signing in...';

    try {
      await this.authManager.login(email, password);
      this.close();
      // Success handled by auth state change listener
    } catch (error) {
      errorDiv.textContent = error.message || 'Sign in failed. Please check your credentials.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In';
    }
  }

  open() {
    if (!this.modal) {
      this.create();
    }
    if (!this.modal.parentElement) {
      document.body.appendChild(this.modal);
    }
    this.modal.classList.add('open');
    this.isOpen = true;
    this.modal.querySelector('#auth-email').focus();
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('open');
      this.isOpen = false;
    }
  }
}

export default AuthModal;
