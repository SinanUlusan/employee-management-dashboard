import { LitElement, html, css, TemplateResult } from "lit";
import { translate } from "../utils/i18n.ts";
import { addEmployee, updateEmployee } from "../stores/employeeStore.ts";
import { navigateToHome, goBack } from "../utils/router.ts";
import { validateEmployee, validateField } from "../utils/validation.ts";
import { getPromptDescription } from "../utils/template.ts";
import "./action-prompt.ts";
import { getEmployees } from "../stores/employeeStore.ts";

interface EmployeeForm {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employmentDate: string;
  birthDate: string;
}

interface FormErrors {
  [key: string]: string;
}

export class PersonEditor extends LitElement {
  static styles = css`
    .form-container {
      max-width: 900px;
      margin: 0 auto;
      padding: var(--spacing-xxl);
      background: var(--color-white);
      border-radius: var(--border-radius-large);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      position: relative;
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xxl);
      padding-bottom: var(--spacing-large);
      border-bottom: 2px solid var(--color-border);
    }

    .form-title {
      font-size: var(--font-size-xxl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin: 0;
      text-align: center;
      flex: 1;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-small);
      padding: var(--spacing-medium) var(--spacing-large);
      background: var(--color-bg-gray);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-medium);
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .back-btn:hover {
      background: var(--color-primary);
      color: var(--color-white);
      border-color: var(--color-primary);
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-xl);
      margin-bottom: var(--spacing-xxl);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
      position: relative;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-label {
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      font-size: var(--font-size-medium);
      margin-bottom: var(--spacing-small);
      display: flex;
      align-items: center;
      gap: var(--spacing-small);
    }

    .form-label::after {
      content: " *";
      color: #e74c3c;
      font-weight: var(--font-weight-bold);
    }

    .form-input {
      padding: var(--spacing-medium) var(--spacing-large);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-medium);
      font-size: var(--font-size-medium);
      outline: none;
      transition: all 0.2s ease;
      background: var(--color-bg-gray);
      color: var(--color-text-primary);
      position: relative;
    }

    .form-input::placeholder {
      color: var(--color-text-secondary);
    }

    .form-input:focus {
      border-color: var(--color-primary);
      background: var(--color-white);
      box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1);
    }

    .form-input.error {
      border-color: #e74c3c;
      background: #fdf2f2;
    }

    .form-select {
      padding: var(--spacing-medium) var(--spacing-large);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-medium);
      font-size: var(--font-size-medium);
      outline: none;
      transition: all 0.2s ease;
      background: var(--color-bg-gray);
      color: var(--color-text-primary);
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right var(--spacing-medium) center;
      background-size: 16px;
      padding-right: calc(var(--spacing-large) + 20px);
    }

    .form-select:focus {
      border-color: var(--color-primary);
      background-color: var(--color-white);
      box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1);
    }

    .form-select.error {
      border-color: #e74c3c;
      background-color: #fdf2f2;
    }

    .date-input-wrapper {
      position: relative;
    }

    .date-input-wrapper input {
      width: 385px;
    }

    .date-input-wrapper::after {
      content: "📅";
      position: absolute;
      right: 27px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      font-size: var(--font-size-medium);
    }

    .error-message {
      color: #e74c3c;
      font-size: var(--font-size-small);
      margin-top: var(--spacing-small);
      display: flex;
      align-items: center;
      gap: var(--spacing-small);
    }

    .error-message::before {
      content: "⚠️";
      font-size: var(--font-size-small);
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-large);
      margin-top: var(--spacing-xxl);
      padding-top: var(--spacing-xl);
      border-top: 2px solid var(--color-border);
    }

    .btn {
      padding: var(--spacing-medium) var(--spacing-xxl);
      border: none;
      border-radius: var(--border-radius-medium);
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 120px;
    }

    .btn-secondary {
      background: var(--color-white);
      color: var(--color-primary);
      border: 2px solid var(--color-primary);
    }

    .btn-secondary:hover {
      background: var(--color-primary);
      color: var(--color-white);
    }

    .btn-primary {
      background: var(--color-primary);
      color: var(--color-white);
    }

    .btn-primary:hover {
      background: #e65c00;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .form-container {
        margin: var(--spacing-medium);
        padding: var(--spacing-large);
      }

      .form-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-large);
      }

      .form-header {
        flex-direction: column;
        gap: var(--spacing-large);
        text-align: center;
      }

      .form-actions {
        flex-direction: column;
        gap: var(--spacing-medium);
      }

      .btn {
        width: 100%;
      }

      .date-input-wrapper input {
        width: 80%;
      }
    }

    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: var(--spacing-medium) var(--spacing-large);
      background: #27ae60;
      color: var(--color-white);
      border-radius: var(--border-radius-medium);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    }

    .toast.show {
      transform: translateX(0);
    }
  `;

  static properties = {
    employee: { type: Object },
    form: { type: Object },
    errors: { type: Object },
    showConfirm: { type: Boolean },
    showToast: { type: Boolean },
    hasChanges: { type: Boolean },
    originalForm: { type: Object },
  };

  declare employee: EmployeeForm | null;
  declare form: EmployeeForm;
  declare errors: FormErrors;
  declare showConfirm: boolean;
  declare showToast: boolean;
  declare hasChanges: boolean;
  declare originalForm: EmployeeForm | null;

  constructor() {
    super();
    this.form = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      employmentDate: "",
      birthDate: "",
    };
    this.errors = {};
    this.showConfirm = false;
    this.showToast = false;
    this.hasChanges = false;
    this.originalForm = null;
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this._loadEmployee();
    window.addEventListener(
      "language-changed",
      this._onLanguageChanged.bind(this)
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(
      "language-changed",
      this._onLanguageChanged.bind(this)
    );
  }

  private _onLanguageChanged(): void {
    this.requestUpdate();
  }

  private async _loadEmployee(): Promise<void> {
    const id = window.location.pathname.split("/").pop();

    if (id && id !== "new") {
      const employees = await getEmployees();
      this.employee = employees.find((emp) => emp.id === id) || null;

      if (this.employee) {
        this.form = { ...this.employee };
        this.originalForm = { ...this.employee };
      }
    }
  }

  private async validate(): Promise<FormErrors> {
    const result = await validateEmployee(this.form);
    return result.errors;
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    this.errors = await this.validate();
    if (Object.keys(this.errors).length > 0) return;

    if (this.form.id) {
      this.showConfirm = true;
    } else {
      this._handleConfirmProceed();
    }
  }

  private _handleConfirmProceed(): void {
    if (this.form.id) {
      updateEmployee(this.form as any);
    } else {
      addEmployee(this.form);
    }
    this.showConfirm = false;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
      navigateToHome();
    }, 2000);
  }

  private _handleConfirmCancel(): void {
    this.showConfirm = false;
  }

  private handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    this.form = { ...this.form, [name]: value };

    // Real-time validation
    const error = validateField(name, value);
    if (error) {
      this.errors = { ...this.errors, [name]: error };
    } else {
      const newErrors = { ...this.errors };
      delete newErrors[name];
      this.errors = newErrors;
    }

    this._checkForChanges();
  }

  private _checkForChanges(): void {
    if (!this.originalForm) {
      this.hasChanges = Object.values(this.form).some((value) => value !== "");
      return;
    }

    this.hasChanges = Object.keys(this.form).some((key) => {
      return (
        this.form[key as keyof EmployeeForm] !==
        this.originalForm![key as keyof EmployeeForm]
      );
    });
  }

  private handleCancel(): void {
    goBack();
  }

  get editConfirmDescription() {
    return getPromptDescription(
      "editConfirmDesc",
      {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
      },
      translate
    );
  }

  render(): TemplateResult {
    return html`
      <div class="form-container">
        <div class="form-header">
          <h1 class="form-title">
            ${this.form.id
              ? translate("editEmployee")
              : translate("addEmployee")}
          </h1>
          <button class="back-btn" @click=${this.handleCancel}>
            ← ${translate("back")}
          </button>
        </div>

        <form @submit=${this.handleSubmit}>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">${translate("firstName")}</label>
              <input
                type="text"
                name="firstName"
                class="form-input ${this.errors.firstName ? "error" : ""}"
                .value=${this.form.firstName}
                @input=${this.handleInput}
                placeholder=${translate("firstName")}
                required
              />
              ${this.errors.firstName
                ? html`
                    <div class="error-message">${this.errors.firstName}</div>
                  `
                : ""}
            </div>

            <div class="form-group">
              <label class="form-label">${translate("lastName")}</label>
              <input
                type="text"
                name="lastName"
                class="form-input ${this.errors.lastName ? "error" : ""}"
                .value=${this.form.lastName}
                @input=${this.handleInput}
                placeholder=${translate("lastName")}
                required
              />
              ${this.errors.lastName
                ? html`
                    <div class="error-message">${this.errors.lastName}</div>
                  `
                : ""}
            </div>

            <div class="form-group">
              <label class="form-label">${translate("email")}</label>
              <input
                type="email"
                name="email"
                class="form-input ${this.errors.email ? "error" : ""}"
                .value=${this.form.email}
                @input=${this.handleInput}
                placeholder=${translate("email")}
                required
              />
              ${this.errors.email
                ? html` <div class="error-message">${this.errors.email}</div> `
                : ""}
            </div>

            <div class="form-group">
              <label class="form-label">${translate("phone")}</label>
              <input
                type="tel"
                name="phone"
                class="form-input ${this.errors.phone ? "error" : ""}"
                .value=${this.form.phone}
                @input=${this.handleInput}
                placeholder=${translate("phone")}
                required
              />
              ${this.errors.phone
                ? html` <div class="error-message">${this.errors.phone}</div> `
                : ""}
            </div>

            <div class="form-group">
              <label class="form-label">${translate("department")}</label>
              <select
                name="department"
                class="form-select ${this.errors.department ? "error" : ""}"
                .value=${this.form.department}
                @change=${this.handleInput}
                required
              >
                <option value="">${translate("select")}</option>
                <option
                  value="tech"
                  ?selected=${this.form.department === "tech"}
                >
                  Tech
                </option>
                <option
                  value="analytics"
                  ?selected=${this.form.department === "analytics"}
                >
                  Analytics
                </option>
              </select>
              ${this.errors.department
                ? html`
                    <div class="error-message">${this.errors.department}</div>
                  `
                : ""}
            </div>

            <div class="form-group">
              <label class="form-label">${translate("position")}</label>
              <select
                name="position"
                class="form-select ${this.errors.position ? "error" : ""}"
                .value=${this.form.position}
                @change=${this.handleInput}
                required
              >
                <option value="">${translate("select")}</option>
                <option
                  value="junior"
                  ?selected=${this.form.position === "junior"}
                >
                  Junior
                </option>
                <option
                  value="medior"
                  ?selected=${this.form.position === "medior"}
                >
                  Medior
                </option>
                <option
                  value="senior"
                  ?selected=${this.form.position === "senior"}
                >
                  Senior
                </option>
              </select>
              ${this.errors.position
                ? html`
                    <div class="error-message">${this.errors.position}</div>
                  `
                : ""}
            </div>

            <div class="form-group">
              <label class="form-label">${translate("employmentDate")}</label>
              <div class="date-input-wrapper">
                <input
                  type="date"
                  name="employmentDate"
                  class="form-input ${this.errors.employmentDate
                    ? "error"
                    : ""}"
                  .value=${this.form.employmentDate}
                  @input=${this.handleInput}
                  required
                />
              </div>
              ${this.errors.employmentDate
                ? html`
                    <div class="error-message">
                      ${this.errors.employmentDate}
                    </div>
                  `
                : ""}
            </div>

            <div class="form-group">
              <label class="form-label">${translate("birthDate")}</label>
              <div class="date-input-wrapper">
                <input
                  type="date"
                  name="birthDate"
                  class="form-input ${this.errors.birthDate ? "error" : ""}"
                  .value=${this.form.birthDate}
                  @input=${this.handleInput}
                  required
                />
              </div>
              ${this.errors.birthDate
                ? html`
                    <div class="error-message">${this.errors.birthDate}</div>
                  `
                : ""}
            </div>
          </div>

          <div class="form-actions">
            <button
              type="button"
              class="btn btn-secondary"
              @click=${this.handleCancel}
            >
              ${translate("cancel")}
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              ?disabled=${!this.hasChanges}
            >
              ${this.form.id ? translate("update") : translate("add")}
            </button>
          </div>
        </form>

        <action-prompt
          .open=${this.showConfirm}
          .title=${translate("editEmployee")}
          .description=${this.editConfirmDescription}
          @proceed=${this._handleConfirmProceed}
          @cancel=${this._handleConfirmCancel}
        ></action-prompt>

        ${this.showToast
          ? html`
              <div class="toast show">
                ${this.form.id
                  ? translate("employeeUpdated")
                  : translate("employeeAdded")}
              </div>
            `
          : ""}
      </div>
    `;
  }
}

customElements.define("person-editor", PersonEditor);
