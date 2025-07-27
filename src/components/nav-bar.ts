import { LitElement, html, css, TemplateResult } from "lit";
import {
  translate,
  switchLanguage,
  getCurrentLanguage,
} from "../utils/i18n.ts";
import { isCurrentRoute, routerService } from "../utils/router.ts";

export class TopNavigation extends LitElement {
  static styles = css`
    nav {
      background-color: var(--color-white);
      padding: var(--spacing-medium);
      color: var(--color-white);
      display: flex;
      justify-content: space-between;
      position: relative;
      align-items: center;
    }

    .logo-wrapper {
      display: flex;
      align-items: center;
      gap: var(--spacing-large);
      text-decoration: none;
      cursor: pointer;
      z-index: 2;

      span {
        font-size: var(--font-size-large);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);

        @media (max-width: 768px) {
          font-size: var(--font-size-medium);
        }
      }
    }

    .logo-wrapper img {
      width: 40px;
      object-fit: contain;
      border-radius: var(--border-radius-large);

      @media (max-width: 768px) {
        width: 30px;
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: var(--spacing-large);

      @media (max-width: 768px) {
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        max-width: 300px;
        height: 100vh;
        background-color: var(--color-white);
        flex-direction: column;
        padding: calc(var(--spacing-large) * 2) var(--spacing-large);
        gap: var(--spacing-large);
        transition: right 0.3s ease-in-out;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        z-index: 30;
        align-items: flex-start;

        &.active {
          right: 0;
        }
      }
    }

    .nav-link {
      color: var(--color-primary);
      text-decoration: none;
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-bold);
      opacity: 0.5;
      display: flex;
      align-items: center;
      gap: var(--spacing-small);
      cursor: pointer;

      @media (max-width: 768px) {
        font-size: var(--font-size-medium);
        width: 100%;
        padding: var(--spacing-small) 0;
      }

      &:hover {
        opacity: 1;
      }

      &.active {
        opacity: 1;
      }
    }

    .language-switcher {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--spacing-small);
      padding: var(--spacing-small);
      border-radius: var(--border-radius-medium);
      transition: background 0.2s;

      &:hover {
        background: var(--color-bg-gray);
      }

      img {
        width: 20px;
        height: 20px;
      }

      .language-switcher-text {
        font-size: var(--font-size-medium);
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);

        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
      z-index: 40;
      padding: var(--spacing-small);

      @media (max-width: 768px) {
        display: flex;
      }

      span {
        width: 25px;
        height: 3px;
        background-color: var(--color-primary);
        margin: 3px 0;
        transition: 0.3s;
      }

      &.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
      }

      &.active span:nth-child(2) {
        opacity: 0;
      }

      &.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
      }
    }

    .close-btn {
      position: absolute;
      top: var(--spacing-large);
      right: var(--spacing-large);
      background: none;
      border: none;
      cursor: pointer;
      z-index: 50;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 20;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;

      &.active {
        opacity: 1;
        visibility: visible;
      }
    }
  `;

  private _currentLang: string;
  private _isMenuOpen: boolean;

  constructor() {
    super();
    this._currentLang = localStorage.getItem("lang") || "tr";
    this._isMenuOpen = false;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._currentLang = getCurrentLanguage();
    window.addEventListener(
      "language-changed",
      this._onLanguageChanged.bind(this)
    );

    // Listen for route changes
    window.addEventListener("popstate", this._onRouteChange.bind(this));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(
      "language-changed",
      this._onLanguageChanged.bind(this)
    );

    // Remove route change listener
    window.removeEventListener("popstate", this._onRouteChange.bind(this));
  }

  private _onLanguageChanged(): void {
    this._currentLang = getCurrentLanguage();
    this.requestUpdate();
  }

  private _onRouteChange(): void {
    this.requestUpdate();
  }

  private _isActive(path: string): boolean {
    // Wait for router to be ready
    if (!routerService.isInitialized) {
      return window.location.pathname === path;
    }
    return isCurrentRoute(path);
  }

  private async _toggleLanguage(): Promise<void> {
    const newLang = this._currentLang === "tr" ? "en" : "tr";
    this._currentLang = newLang;
    await switchLanguage(newLang);
    this.requestUpdate();
  }

  private _toggleMenu(): void {
    this._isMenuOpen = !this._isMenuOpen;
    this.requestUpdate();
  }

  private _closeMenu(): void {
    this._isMenuOpen = false;
    this.requestUpdate();
  }

  render(): TemplateResult {
    return html`
      <nav>
        <a href="/" class="logo-wrapper">
          <img
            src="/src/assets/images/logo.png"
            alt="ING"
            width="40"
            height="40"
          />
          <span>ING</span>
        </a>
        <div
          class="hamburger ${this._isMenuOpen ? "active" : ""}"
          @click=${this._toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        ${this._isMenuOpen
          ? html`
              <button
                class="close-btn"
                @click=${this._closeMenu}
                aria-label="Menüyü Kapat"
              >
                <svg viewBox="0 0 32 32" fill="none">
                  <line
                    x1="8"
                    y1="8"
                    x2="24"
                    y2="24"
                    stroke="var(--color-primary)"
                    stroke-linecap="round"
                  />
                  <line
                    x1="24"
                    y1="8"
                    x2="8"
                    y2="24"
                    stroke="var(--color-primary)"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            `
          : ""}
        <div class="nav-links ${this._isMenuOpen ? "active" : ""}">
          <a
            href="/"
            class="nav-link ${this._isActive("/") ? "active" : ""}"
            @click=${this._closeMenu}
          >
            <img
              src="/src/assets/icons/employee.svg"
              alt="employee"
              width="20"
              height="20"
            />
            ${translate("employeeList")}</a
          >
          <a
            href="/new"
            class="nav-link ${this._isActive("/new") ? "active" : ""}"
            @click=${this._closeMenu}
          >
            <img
              src="/src/assets/icons/add.svg"
              alt="add"
              width="20"
              height="20"
            />${translate("addNew")}
          </a>
          <div class="language-switcher" @click=${this._toggleLanguage}>
            <img
              src="/src/assets/icons/${this._currentLang === "tr"
                ? "us"
                : "tr"}.svg"
              alt="${this._currentLang}"
              width="20"
              height="20"
            />
            <span class="language-switcher-text"
              >${this._currentLang === "tr" ? "English" : "Türkçe"}</span
            >
          </div>
        </div>
        ${this._isMenuOpen
          ? html`<div class="overlay active" @click=${this._closeMenu}></div>`
          : ""}
      </nav>
    `;
  }
}

customElements.define("nav-bar", TopNavigation);
