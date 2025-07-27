import { LitElement, html, css, TemplateResult } from "lit";
import { translate } from "../utils/i18n.ts";
import { navigateToEdit } from "../utils/router.ts";
import "../components/employee-list.ts";

export class DirectoryPage extends LitElement {
  static styles = css`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--spacing-xl);
      margin-bottom: var(--spacing-xl);
      flex-wrap: wrap;
      gap: var(--spacing-medium);
      padding: var(--spacing-large);
      border-radius: var(--border-radius-large);
    }

    .header-title {
      font-size: var(--font-size-xxl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin: 0;
    }

    .view-toggle {
      display: flex;
      background: var(--color-bg-gray);
      border-radius: var(--border-radius-medium);
      padding: 4px;
      gap: 2px;
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border: none;
      background: transparent;
      border-radius: var(--border-radius-small);
      cursor: pointer;
      color: var(--color-text-secondary);
      transition: all 0.2s ease;
    }

    .toggle-btn:hover {
      background: rgba(255, 165, 0, 0.1);
      color: var(--color-primary);
    }

    .toggle-btn.active {
      background: var(--color-primary);
      color: var(--color-white);
      box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-large);
      }

      .header-title {
        text-align: center;
      }

      .view-toggle {
        align-self: center;
      }
    }
  `;

  static properties = {
    view: { type: String },
  };

  declare view: string;

  constructor() {
    super();
    this.view = "table";
  }

  connectedCallback(): void {
    super.connectedCallback();
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

  private setView(viewType: string): void {
    this.view = viewType;
  }

  private handleEdit(e: CustomEvent): void {
    const employee = e.detail;
    navigateToEdit(employee.id);
  }

  render(): TemplateResult {
    const tableActiveClass = this.view === "table" ? "active" : "";
    const listActiveClass = this.view === "list" ? "active" : "";

    return html`
      <div>
        <div class="header">
          <h2 class="header-title">${translate("employeeList")}</h2>
          <div class="view-toggle">
            <button
              class="toggle-btn ${tableActiveClass}"
              @click=${() => this.setView("table")}
              title="Table View"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="2" y="2" width="6" height="6" />
                <rect x="12" y="2" width="6" height="6" />
                <rect x="2" y="12" width="6" height="6" />
                <rect x="12" y="12" width="6" height="6" />
              </svg>
            </button>
            <button
              class="toggle-btn ${listActiveClass}"
              @click=${() => this.setView("list")}
              title="List View"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="4" width="14" height="3" />
                <rect x="3" y="10" width="14" height="3" />
                <rect x="3" y="16" width="14" height="3" />
              </svg>
            </button>
          </div>
        </div>
        <employee-list
          .view=${this.view}
          @edit=${this.handleEdit}
        ></employee-list>
      </div>
    `;
  }
}

customElements.define("directory-page", DirectoryPage);
