import { LitElement, html, css } from 'lit';
import { translate } from '../utils/i18n.js';
import { getEmployees, addEmployee, updateEmployee } from '../store/employeeStore.js';
import './action-prompt.js';

export class PersonEditor extends LitElement {
  static styles = css`
    .form-container {
      max-width: 50%;
      margin: 40px auto;
      background: var(--color-white);
      border-radius: var(--border-radius-large);
      box-shadow: 0 2px 16px rgba(0,0,0,0.07);
      padding: var(--spacing-xxl) var(--spacing-xl);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-large);

      @media (max-width: 992px) {
        max-width: 90%;
      }
    }
    .form-title {
      font-size: var(--font-size-xxl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      text-align: center;
      margin-bottom: var(--spacing-large);
    }
    form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-large);
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
    }
    label {
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      margin-bottom: 2px;
    }
    input, select {
      padding: var(--spacing-small) var(--spacing-medium);
      border: 1px solid #eee;
      border-radius: var(--border-radius-medium);
      font-size: var(--font-size-medium);
      background: var(--color-bg-gray);
      color: var(--color-text-primary);
      outline: none;
      transition: border 0.2s;
    }
    input[type="text"] {
      text-transform: none;
    }
    input[type="tel"] {
      -moz-appearance: textfield;
    }
    input[type="tel"]::-webkit-outer-spin-button,
    input[type="tel"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input:focus, select:focus {
      border: 1.5px solid var(--color-primary);
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-medium);
      margin-top: var(--spacing-large);
    }
    .form-fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-large) var(--spacing-large);
    }
    .btn {
      padding: var(--spacing-small) var(--spacing-xl);
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-bold);
      border: none;
      border-radius: var(--border-radius-medium);
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary {
      background: var(--color-primary);
      color: var(--color-white);
    }
    .btn-primary:hover {
      background: #ff7f32;
    }
    .btn-secondary {
      background: var(--color-bg-gray);
      color: var(--color-primary);
    }
    .error-message {
      color: var(--color-danger);
      font-size: 12px;
      margin-top: 2px;
    }
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-success, #28a745);
      color: white;
      padding: var(--spacing-medium) var(--spacing-large);
      border-radius: var(--border-radius-medium);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    }
    .toast.show {
      transform: translateX(0);
    }
    @media (max-width: 600px) {
      .form-container {
        padding: var(--spacing-large) var(--spacing-medium);
      }
    }
    @media (max-width: 700px) {
      .form-fields {
        grid-template-columns: 1fr;
      }
    }
    .btn-primary:disabled {
      background: #ccc;
      color: #666;
      cursor: not-allowed;
    }
    .btn-primary:disabled:hover {
      background: #ccc;
    }
  `;

  static properties = {
    employee: { type: Object },
    form: { type: Object },
    errors: { type: Object },
    showConfirm: { type: Boolean },
    showToast: { type: Boolean },
    originalForm: { type: Object },
    hasChanges: { type: Boolean }
  };

  constructor() {
    super();
    this.form = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      employmentDate: '',
      birthDate: ''
    };
    this.originalForm = { ...this.form };
    this.errors = {};
    this.showConfirm = false;
    this.showToast = false;
    this.hasChanges = false;
    this._onLanguageChanged = this._onLanguageChanged.bind(this);
  }

  _onLanguageChanged() {
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', this._onLanguageChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('language-changed', this._onLanguageChanged);
  }

  updated(changedProps) {
    if (changedProps.has('employee') && this.employee) {
      this.form = { ...this.employee };
      this.originalForm = { ...this.employee };
      this.errors = {};
      this.hasChanges = false;
    }
  }

  handleInput(e) {
    const { name, value } = e.target;
    this.form = { ...this.form, [name]: value };
    this.errors = { ...this.errors, [name]: '' };
    this._checkForChanges();
  }

  handleKeyPress(e) {
    const { name } = e.target;

    // Prevent non-letter characters for first name and last name
    if (name === 'firstName' || name === 'lastName') {
      const allowedChars = /[a-zA-ZğüşıöçĞÜŞİÖÇ\s]/;
      if (!allowedChars.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
        e.preventDefault();
      }
    }

    // Allow only numbers, +, -, (, ), and space for phone
    if (name === 'phone') {
      const allowedChars = /[0-9+\-\s()]/;
      if (!allowedChars.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
        e.preventDefault();
      }
    }
  }

  _checkForChanges() {
    if (!this.originalForm) {
      this.hasChanges = true;
      return;
    }

    this.hasChanges = Object.keys(this.form).some(key => {
      return this.form[key] !== this.originalForm[key];
    });
  }

  validate() {
    const errors = {};

    // First name validation - only letters and spaces
    if (!this.form.firstName) {
      errors.firstName = translate('required');
    } else if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(this.form.firstName)) {
      errors.firstName = translate('onlyLetters');
    }

    // Last name validation - only letters and spaces
    if (!this.form.lastName) {
      errors.lastName = translate('required');
    } else if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(this.form.lastName)) {
      errors.lastName = translate('onlyLetters');
    }

    // Email validation - improved regex
    if (!this.form.email) {
      errors.email = translate('required');
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.form.email)) {
      errors.email = translate('invalidEmail');
    }

    // Phone validation - only numbers
    if (!this.form.phone) {
      errors.phone = translate('required');
    } else if (!/^[0-9+\-\s()]+$/.test(this.form.phone)) {
      errors.phone = translate('onlyNumbers');
    } else if (this.form.phone.replace(/[^0-9]/g, '').length < 10) {
      errors.phone = translate('invalidPhone');
    }

    if (!this.form.department) errors.department = translate('required');
    if (!this.form.position) errors.position = translate('required');
    if (!this.form.employmentDate) errors.employmentDate = translate('required');
    if (!this.form.birthDate) errors.birthDate = translate('required');

    if (this.form.birthDate) {
      const birth = new Date(this.form.birthDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (birth > today) {
        errors.birthDate = translate('invalidBirthDate');
      }
    }

    if (this.form.birthDate && this.form.employmentDate) {
      const birth = new Date(this.form.birthDate);
      const employment = new Date(this.form.employmentDate);
      if (employment <= birth) {
        errors.employmentDate = translate('employmentAfterBirth');
      }
    }

    const employees = getEmployees();
    if (employees.some(e => e.email === this.form.email && (!this.form.id || String(e.id) !== String(this.form.id)))) {
      errors.email = translate('uniqueEmail');
    }
    return errors;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.errors = this.validate();
    if (Object.keys(this.errors).length > 0) return;
    if (this.form.id) {
      this.showConfirm = true;
    } else {
      addEmployee({ ...this.form });
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 2000);
    }
  }

  _handleConfirmProceed() {
    updateEmployee(this.form);
    this.showConfirm = false;
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  _handleConfirmCancel() {
    this.showConfirm = false;
  }

  handleCancel() {
    window.history.back();
  }

  render() {
    return html`
      <div class="form-container">
        <div class="form-title">${this.form.id ? translate('editEmployee') : translate('addNew')}</div>
        <form @submit=${this.handleSubmit}>
          <div class="form-fields">
            <div class="form-group">
              <label for="firstName">${translate('firstName')}</label>
              <input 
                name="firstName" 
                .value=${this.form.firstName} 
                @input=${this.handleInput} 
                @keypress=${this.handleKeyPress}
                placeholder=${translate('firstName')} 
                type="text"
              />
              ${this.errors.firstName ? html`<div class="error-message">${this.errors.firstName}</div>` : ''}
            </div>
            <div class="form-group">
              <label for="lastName">${translate('lastName')}</label>
              <input 
                name="lastName" 
                .value=${this.form.lastName} 
                @input=${this.handleInput} 
                @keypress=${this.handleKeyPress}
                placeholder=${translate('lastName')} 
                type="text"
              />
              ${this.errors.lastName ? html`<div class="error-message">${this.errors.lastName}</div>` : ''}
            </div>
            <div class="form-group">
              <label for="email">${translate('email')}</label>
              <input 
                name="email" 
                .value=${this.form.email} 
                @input=${this.handleInput} 
                placeholder=${translate('email')} 
                type="email" 
              />
              ${this.errors.email ? html`<div class="error-message">${this.errors.email}</div>` : ''}
            </div>
            <div class="form-group">
              <label for="phone">${translate('phone')}</label>
              <input 
                name="phone" 
                .value=${this.form.phone} 
                @input=${this.handleInput} 
                @keypress=${this.handleKeyPress}
                placeholder=${translate('phone')} 
                type="tel"
              />
              ${this.errors.phone ? html`<div class="error-message">${this.errors.phone}</div>` : ''}
            </div>
            <div class="form-group">
              <label for="department">${translate('department')}</label>
              <select name="department" .value=${this.form.department} @change=${this.handleInput}>
                <option value="">${translate('select')}</option>
                <option value="Analytics">Analytics</option>
                <option value="Tech">Tech</option>
              </select>
              ${this.errors.department ? html`<div class="error-message">${this.errors.department}</div>` : ''}
            </div>
            <div class="form-group">
              <label for="position">${translate('position')}</label>
              <select name="position" .value=${this.form.position} @change=${this.handleInput}>
                <option value="">${translate('select')}</option>
                <option value="Junior">Junior</option>
                <option value="Medior">Medior</option>
                <option value="Senior">Senior</option>
              </select>
              ${this.errors.position ? html`<div class="error-message">${this.errors.position}</div>` : ''}
            </div>
            <div class="form-group">
              <label for="employmentDate">${translate('employmentDate')}</label>
              <input name="employmentDate" .value=${this.form.employmentDate} @input=${this.handleInput} type="date" />
              ${this.errors.employmentDate ? html`<div class="error-message">${this.errors.employmentDate}</div>` : ''}
            </div>
            <div class="form-group">
              <label for="birthDate">${translate('birthDate')}</label>
              <input name="birthDate" .value=${this.form.birthDate} @input=${this.handleInput} type="date" />
              ${this.errors.birthDate ? html`<div class="error-message">${this.errors.birthDate}</div>` : ''}
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click=${this.handleCancel}>${translate('cancel')}</button>
            <button 
              type="submit" 
              class="btn btn-primary" 
              ?disabled=${this.form.id && !this.hasChanges}
            >${translate('save')}</button>
          </div>
        </form>
        <action-prompt
          .open=${this.showConfirm}
          .title=${translate('editEmployee')}
          .description=${translate('editConfirmDesc').replace('{firstName}', this.form.firstName).replace('{lastName}', this.form.lastName)}
          @proceed=${this._handleConfirmProceed}
          @cancel=${this._handleConfirmCancel}
        ></action-prompt>
        ${this.showToast ? html`
          <div class="toast show">
            ${translate('employeeAddedSuccess')}
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('person-editor', PersonEditor);