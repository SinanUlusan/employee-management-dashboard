import { LitElement, html, css, TemplateResult } from "lit";
import "../components/employee-form.ts";
import { getEmployees } from "../stores/employeeStore.ts";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employmentDate: string;
  birthDate: string;
}

export class EditorPage extends LitElement {
  static styles = css`
    .editor-container {
      padding: var(--spacing-xl);
      min-height: 100vh;
      background: var(--color-bg-gray);
    }
  `;

  static properties = {
    employee: { type: Object },
  };

  constructor() {
    super();
    this.employee = null;
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
    }
  }

  render(): TemplateResult {
    return html`
      <div class="editor-container">
        <person-editor></person-editor>
      </div>
    `;
  }
}

customElements.define("editor-page", EditorPage);
