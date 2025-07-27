import { LitElement, html, css, TemplateResult } from "lit";
import { translate } from "../utils/i18n.ts";
import {
  deleteEmployee,
  getEmployees,
  subscribeToEmployeeStore,
} from "../stores/employeeStore.ts";

import { getPromptDescription, capitalizeFirst } from "../utils/template.ts";
import "./action-prompt.ts";

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

export class EmployeeList extends LitElement {
  static styles = css`
    .employee-list {
      background: var(--color-white);
      border-radius: var(--border-radius-large);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .list-header {
      padding: var(--spacing-xl);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--spacing-medium);
    }
    .search-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-small);
      flex: 1;
      max-width: 400px;
    }
    .search-input {
      flex: 1;
      padding: var(--spacing-medium) var(--spacing-large);
      border: 2px solid var(--color-border);
      border-radius: var(--border-radius-medium);
      font-size: var(--font-size-medium);
      outline: none;
      transition: all 0.2s ease;
      background: var(--color-white);
      color: var(--color-text-primary);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .search-input::placeholder {
      color: var(--color-text-secondary);
    }

    .search-input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1);
      background: var(--color-white);
    }

    .search-input:hover {
      border-color: var(--color-primary);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .bulk-actions {
      display: flex;
      gap: var(--spacing-small);
    }
    .btn {
      padding: var(--spacing-small) var(--spacing-medium);
      border: none;
      border-radius: var(--border-radius-medium);
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-danger {
      background: #e74c3c;
      color: var(--color-white);
    }
    .btn-danger:hover {
      background: #c0392b;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .table-view {
      overflow-x: auto;
    }
    .employee-table {
      width: 100%;
      border-collapse: collapse;
    }
    .employee-table th,
    .employee-table td {
      padding: var(--spacing-medium);
      text-align: left;
      border-bottom: 1px solid var(--color-border);
    }
    .employee-table th {
      background: var(--color-bg-gray);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
    }
    .employee-table tr:hover {
      background: var(--color-bg-gray);
    }
    .checkbox-cell {
      width: 40px;
      text-align: center;
    }
    .checkbox {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
    .action-cell {
      width: 100px;
      text-align: center;
    }
    .action-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--spacing-small);
      border-radius: var(--border-radius-small);
      transition: background 0.2s;
    }
    .action-btn:hover {
      background: var(--color-bg-gray);
    }
    .action-btn img {
      width: 16px;
      height: 16px;
    }
    .list-view {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: var(--spacing-large);
      padding: var(--spacing-large);
    }

    .employee-card {
      display: flex;
      flex-direction: column;
      padding: var(--spacing-large);
      background: var(--color-white);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-large);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      position: relative;
    }

    .employee-card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    .employee-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-large);
      margin-bottom: var(--spacing-large);
    }

    .info-column {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-medium);
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
    }

    .info-label {
      font-size: var(--font-size-small);
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-medium);
    }

    .info-value {
      font-size: var(--font-size-medium);
      color: var(--color-text-primary);
      font-weight: var(--font-weight-medium);
    }

    .employee-name {
      font-size: var(--font-size-large);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin-bottom: var(--spacing-medium);
    }

    .card-actions {
      display: flex;
      gap: var(--spacing-medium);
      justify-content: flex-end;
      padding-top: var(--spacing-large);
      border-top: 1px solid var(--color-border);
    }

    .card-btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-small);
      padding: var(--spacing-small) var(--spacing-medium);
      border: none;
      border-radius: var(--border-radius-medium);
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .card-btn.edit {
      background: #6c5ce7;
      color: var(--color-white);
    }

    .card-btn.edit:hover {
      background: #5a4fcf;
      transform: translateY(-1px);
    }

    .card-btn.delete {
      background: var(--color-primary);
      color: var(--color-white);
    }

    .card-btn.delete:hover {
      background: #e65c00;
      transform: translateY(-1px);
    }

    .card-btn img {
      width: 14px;
      height: 14px;
      filter: brightness(0) invert(1);
    }
    .empty-state {
      text-align: center;
      padding: var(--spacing-xxl);
      color: var(--color-text-secondary);
    }
    .empty-state img {
      width: 120px;
      height: 120px;
      margin-bottom: var(--spacing-large);
      opacity: 0.5;
    }
    .empty-state h3 {
      margin: 0 0 var(--spacing-medium) 0;
      color: var(--color-text-primary);
    }
    .empty-state p {
      margin: 0;
      line-height: 1.5;
    }
  `;

  static properties = {
    employees: { type: Array },
    view: { type: String },
    searchTerm: { type: String },
    selectedEmployees: { type: Array },
    showDeleteConfirm: { type: Boolean },
    employeeToDelete: { type: Object },
    showBulkDeleteConfirm: { type: Boolean },
  };

  declare employees: Employee[];
  declare view: string;
  declare searchTerm: string;
  declare selectedEmployees: string[];
  declare showDeleteConfirm: boolean;
  declare employeeToDelete: Employee | null;
  declare showBulkDeleteConfirm: boolean;
  private unsubscribe: (() => void) | null = null;

  constructor() {
    super();
    this.employees = [];
    this.view = "table";
    this.searchTerm = "";
    this.selectedEmployees = [];
    this.showDeleteConfirm = false;
    this.employeeToDelete = null;
    this.showBulkDeleteConfirm = false;
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this._loadEmployees();
    window.addEventListener(
      "language-changed",
      this._onLanguageChanged.bind(this)
    );

    // Subscribe to store changes
    this.unsubscribe = subscribeToEmployeeStore(() => {
      console.log("Store changed, reloading employees");
      this._loadEmployees();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(
      "language-changed",
      this._onLanguageChanged.bind(this)
    );

    // Unsubscribe from store changes
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  private _onLanguageChanged(): void {
    this.requestUpdate();
  }

  private async _loadEmployees(): Promise<void> {
    this.employees = await getEmployees();
    console.log("Employees loaded:", this.employees.length);
  }

  private _handleSearch(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  private _handleSelectAll(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.selectedEmployees = this.filteredEmployees.map((emp) => emp.id);
    } else {
      this.selectedEmployees = [];
    }
  }

  private _handleSelectEmployee(e: Event): void {
    const target = e.target as HTMLInputElement;
    const employeeId = target.value;

    if (target.checked) {
      this.selectedEmployees = [...this.selectedEmployees, employeeId];
    } else {
      this.selectedEmployees = this.selectedEmployees.filter(
        (id) => id !== employeeId
      );
    }
  }

  private _handleEdit(employee: Employee): void {
    this.dispatchEvent(new CustomEvent("edit", { detail: employee }));
  }

  private _handleDelete(employee: Employee): void {
    this.employeeToDelete = employee;
    this.showDeleteConfirm = true;
  }

  private _handleBulkDelete(): void {
    this.showBulkDeleteConfirm = true;
  }

  private _handleDeleteProceed(): void {
    if (this.employeeToDelete) {
      deleteEmployee(this.employeeToDelete.id);
      this.showDeleteConfirm = false;
      this.employeeToDelete = null;
    }
  }

  private _handleDeleteCancel(): void {
    this.showDeleteConfirm = false;
    this.employeeToDelete = null;
  }

  private _handleBulkDeleteProceed(): void {
    this.selectedEmployees.forEach((id) => {
      deleteEmployee(id);
    });
    this.selectedEmployees = [];
    this.showBulkDeleteConfirm = false;
  }

  private _handleBulkDeleteCancel(): void {
    this.showBulkDeleteConfirm = false;
  }

  get filteredEmployees(): Employee[] {
    if (!this.searchTerm) return this.employees;

    const searchLower = this.searchTerm.toLowerCase();
    return this.employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchLower) ||
        employee.lastName.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower) ||
        employee.position.toLowerCase().includes(searchLower)
    );
  }

  get deleteConfirmDescription() {
    return getPromptDescription(
      "deleteConfirmDesc",
      {
        firstName: this.employeeToDelete?.firstName || "",
        lastName: this.employeeToDelete?.lastName || "",
      },
      translate
    );
  }

  render(): TemplateResult {
    if (this.employees.length === 0) {
      return html`
        <div class="empty-state">
          <img src="/src/assets/icons/empty-state.svg" alt="No employees" />
          <h3>${translate("noEmployees")}</h3>
          <p>${translate("noEmployeesDesc")}</p>
        </div>
      `;
    }

    return html`
      <div class="employee-list">
        <div class="list-header">
          <div class="search-container">
            <input
              type="text"
              class="search-input"
              placeholder="${translate("searchEmployees")}"
              .value=${this.searchTerm}
              @input=${this._handleSearch}
            />
          </div>
          ${this.selectedEmployees.length > 0
            ? html`
                <div class="bulk-actions">
                  <button
                    class="btn btn-danger"
                    @click=${this._handleBulkDelete}
                  >
                    ${translate("deleteSelected")}
                    (${this.selectedEmployees.length})
                  </button>
                </div>
              `
            : ""}
        </div>

        ${this.view === "table"
          ? this._renderTableView()
          : this._renderListView()}

        <action-prompt
          .open=${this.showDeleteConfirm}
          .title=${translate("deleteConfirmTitle")}
          .description=${this.deleteConfirmDescription}
          @proceed=${this._handleDeleteProceed}
          @cancel=${this._handleDeleteCancel}
        ></action-prompt>

        <action-prompt
          .open=${this.showBulkDeleteConfirm}
          .title=${translate("bulkDeleteConfirmTitle")}
          .description=${translate("bulkDeleteConfirmDesc")}
          @proceed=${this._handleBulkDeleteProceed}
          @cancel=${this._handleBulkDeleteCancel}
        ></action-prompt>
      </div>
    `;
  }

  private _renderTableView(): TemplateResult {
    return html`
      <div class="table-view">
        <table class="employee-table">
          <thead>
            <tr>
              <th class="checkbox-cell">
                <input
                  type="checkbox"
                  class="checkbox"
                  .checked=${this.selectedEmployees.length ===
                    this.filteredEmployees.length &&
                  this.filteredEmployees.length > 0}
                  @change=${this._handleSelectAll}
                />
              </th>
              <th>${translate("firstName")}</th>
              <th>${translate("lastName")}</th>
              <th>${translate("employmentDate")}</th>
              <th>${translate("birthDate")}</th>
              <th>${translate("phone")}</th>
              <th>${translate("email")}</th>
              <th>${translate("department")}</th>
              <th>${translate("position")}</th>
              <th class="action-cell">${translate("actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${this.filteredEmployees.map(
              (employee) => html`
                <tr>
                  <td class="checkbox-cell">
                    <input
                      type="checkbox"
                      class="checkbox"
                      .value=${employee.id}
                      .checked=${this.selectedEmployees.includes(employee.id)}
                      @change=${this._handleSelectEmployee}
                    />
                  </td>
                  <td>${capitalizeFirst(employee.firstName)}</td>
                  <td>${capitalizeFirst(employee.lastName)}</td>
                  <td>
                    ${new Date(employee.employmentDate)
                      .toISOString()
                      .split("T")[0]}
                  </td>
                  <td>
                    ${new Date(employee.birthDate).toISOString().split("T")[0]}
                  </td>
                  <td>${employee.phone}</td>
                  <td>${employee.email}</td>
                  <td>${capitalizeFirst(employee.department)}</td>
                  <td>${capitalizeFirst(employee.position)}</td>
                  <td class="action-cell">
                    <button
                      class="action-btn"
                      @click=${() => this._handleEdit(employee)}
                      title="${translate("edit")}"
                    >
                      <img src="/src/assets/icons/edit.svg" alt="edit" />
                    </button>
                    <button
                      class="action-btn"
                      @click=${() => this._handleDelete(employee)}
                      title="${translate("delete")}"
                    >
                      <img src="/src/assets/icons/trash.svg" alt="delete" />
                    </button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  private _renderListView(): TemplateResult {
    return html`
      <div class="list-view">
        ${this.filteredEmployees.map(
          (employee) => html`
            <div class="employee-card">
              <div class="employee-name">
                ${capitalizeFirst(employee.firstName)}
                ${capitalizeFirst(employee.lastName)}
              </div>
              <div class="employee-info">
                <div class="info-column">
                  <div class="info-item">
                    <div class="info-label">${translate("firstName")}</div>
                    <div class="info-value">
                      ${capitalizeFirst(employee.firstName)}
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${translate("employmentDate")}</div>
                    <div class="info-value">
                      ${new Date(employee.employmentDate)
                        .toISOString()
                        .split("T")[0]}
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${translate("phone")}</div>
                    <div class="info-value">${employee.phone}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${translate("department")}</div>
                    <div class="info-value">
                      ${capitalizeFirst(employee.department)}
                    </div>
                  </div>
                </div>
                <div class="info-column">
                  <div class="info-item">
                    <div class="info-label">${translate("lastName")}</div>
                    <div class="info-value">
                      ${capitalizeFirst(employee.lastName)}
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${translate("birthDate")}</div>
                    <div class="info-value">
                      ${new Date(employee.birthDate)
                        .toISOString()
                        .split("T")[0]}
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${translate("email")}</div>
                    <div class="info-value">${employee.email}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${translate("position")}</div>
                    <div class="info-value">
                      ${capitalizeFirst(employee.position)}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <button
                  class="card-btn edit"
                  @click=${() => this._handleEdit(employee)}
                  title="${translate("edit")}"
                >
                  <img src="/src/assets/icons/edit.svg" alt="edit" />
                  ${translate("edit")}
                </button>
                <button
                  class="card-btn delete"
                  @click=${() => this._handleDelete(employee)}
                  title="${translate("delete")}"
                >
                  <img src="/src/assets/icons/trash.svg" alt="delete" />
                  ${translate("delete")}
                </button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define("employee-list", EmployeeList);
