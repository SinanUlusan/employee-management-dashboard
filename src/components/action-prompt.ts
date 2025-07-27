import { LitElement, html, css, TemplateResult } from "lit";

export class ActionPrompt extends LitElement {
  static styles = css`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .modal-overlay.open {
      opacity: 1;
      visibility: visible;
    }
    .modal-content {
      background: var(--color-white);
      border-radius: var(--border-radius-large);
      padding: var(--spacing-xl);
      max-width: 500px;
      width: 90%;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      transform: scale(0.9);
      transition: transform 0.3s ease;
    }
    .modal-overlay.open .modal-content {
      transform: scale(1);
    }
    .modal-header {
      margin-bottom: var(--spacing-large);
    }
    .modal-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      margin: 0;
    }
    .modal-description {
      font-size: var(--font-size-medium);
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin-bottom: var(--spacing-xl);
    }
    .modal-actions {
      display: flex;
      gap: var(--spacing-medium);
      justify-content: flex-end;
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
    .btn-secondary {
      background: var(--color-bg-gray);
      color: var(--color-text-primary);
    }
    .btn-secondary:hover {
      background: #e5e5e5;
    }
    .btn-danger {
      background: #e74c3c;
      color: var(--color-white);
    }
    .btn-danger:hover {
      background: #c0392b;
    }
  `;

  static properties = {
    open: { type: Boolean },
    title: { type: String },
    description: { type: String },
  };

  declare open: boolean;
  declare title: string;
  declare description: string;

  constructor() {
    super();
    this.open = false;
    this.title = "";
    this.description = "";
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

  private _handleProceed(): void {
    this.dispatchEvent(new CustomEvent("proceed"));
  }

  private _handleCancel(): void {
    this.dispatchEvent(new CustomEvent("cancel"));
  }

  private _handleOverlayClick(e: Event): void {
    if (e.target === e.currentTarget) {
      this._handleCancel();
    }
  }

  render(): TemplateResult {
    return html`
      <div
        class="modal-overlay ${this.open ? "open" : ""}"
        @click=${this._handleOverlayClick}
      >
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">${this.title}</h3>
          </div>
          <div class="modal-description">${this.description}</div>
          <div class="modal-actions">
            <button class="btn btn-secondary" @click=${this._handleCancel}>
              ${this.title.includes("Delete") ? "Cancel" : "Cancel"}
            </button>
            <button class="btn btn-danger" @click=${this._handleProceed}>
              ${this.title.includes("Delete") ? "Delete" : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("action-prompt", ActionPrompt);
