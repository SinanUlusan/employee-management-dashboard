import{i as t,a as e,x as i}from"./lit-element-CI_CooFu.js";import{t as a}from"./main.js";import{g as s,d as r}from"./action-prompt-nWjAZJ9G.js";const n="table";class o extends t{static styles=e`
    :host {
      display: block;
      background: var(--color-white);
      border-radius: var(--border-radius-large);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
      padding: var(--spacing-large);
      margin-bottom: var(--spacing-large);
      overflow-x: visible;
    }
    .top-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: var(--spacing-large);
      margin-bottom: var(--spacing-large);
    }
    .search-input {
      padding: var(--spacing-small) var(--spacing-medium);
      border: 1px solid #eee;
      border-radius: var(--border-radius-medium);
      font-size: var(--font-size-medium);
      min-width: 220px;
      outline: none;
    }
    .view-toggle {
      display: flex;
      gap: var(--spacing-small);
    }
    .toggle-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--spacing-small);
      border-radius: var(--border-radius-medium);
      display: flex;
      align-items: center;
      color: var(--color-primary);
      opacity: 0.5;
      transition: background 0.2s, opacity 0.2s;
    }
    .toggle-btn.active {
      background: var(--color-bg-gray);
      opacity: 1;
    }
    .table-wrapper {
      width: 100%;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 900px;
    }
    th,
    td {
      padding: var(--spacing-small) var(--spacing-medium);
      text-align: left;
      font-size: var(--font-size-medium);
    }
    th {
      color: var(--color-primary);
      font-weight: var(--font-weight-bold);
      background: var(--color-white);
      border-bottom: 2px solid #f2f2f2;
    }
    tr {
      border-bottom: 1px solid #f2f2f2;
    }
    td {
      color: var(--color-text-primary);
    }
    .actions {
      display: flex;
      gap: var(--spacing-small);
    }
    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: var(--border-radius-small);
      color: var(--color-primary);
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-btn:hover {
      background: var(--color-bg-gray);
    }
    .list-view {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--spacing-large);
    }
    .list-card {
      position: relative;
      display: flex;
      flex-direction: column;
      background: var(--color-white);
      border-radius: var(--border-radius-large);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
      padding: var(--spacing-xl) var(--spacing-large) var(--spacing-xl)
        var(--spacing-large);
      min-height: 240px;
      transition: box-shadow 0.2s;
      overflow: hidden;
    }
    .list-card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
    .card-actions {
      position: absolute;
      bottom: var(--spacing-large);
      left: var(--spacing-large);
      right: var(--spacing-large);
      display: flex;
      gap: var(--spacing-medium);
      z-index: 2;
    }
    .edit-btn, .delete-btn {
      flex: 1;
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--spacing-small) var(--spacing-medium);
      border-radius: var(--border-radius-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-small);
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-bold);
      transition: all 0.2s;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--color-white);
    }
    .edit-btn img, .delete-btn img {
      filter: brightness(0) invert(1);
    }
    .edit-btn {
      background: #8B5CF6;
    }
    .edit-btn:hover {
      background: #7C3AED;
      transform: translateY(-1px);
    }
    .delete-btn {
      background: #F97316;
    }
    .delete-btn:hover {
      background: #EA580C;
      transform: translateY(-1px);
    }
    .card-content {
      display: flex;
      gap: var(--spacing-large);
      flex: 1;
      margin-bottom: var(--spacing-xl);
    }
    .card-left-column,
    .card-right-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-medium);
    }
    .info-row {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
      font-size: var(--font-size-medium);
      line-height: 1.4;
    }
    .info-label {
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-small);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.7;
    }
    .info-value {
      color: var(--color-text-primary);
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-medium);
      word-break: break-word;
    }
    .badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: var(--border-radius-medium);
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-bold);
      background: var(--color-bg-gray);
      color: var(--color-primary);
      margin-left: 4px;
    }
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-small);
      margin-top: var(--spacing-large);
      flex-wrap: wrap;
    }
    .page-btn {
      background: none;
      border: none;
      color: var(--color-primary);
      font-size: var(--font-size-medium);
      border-radius: var(--border-radius-medium);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
    }
    .page-btn.active,
    .page-btn:hover {
      background: var(--color-bg-gray);
    }
    @media (max-width: 900px) {
      table {
        min-width: 600px;
      }
      .list-view {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 600px) {
      :host {
        padding: var(--spacing-medium);
      }
      .table-wrapper {
        -webkit-overflow-scrolling: touch;
      }
      th,
      td {
        font-size: var(--font-size-small);
        padding: var(--spacing-small);
      }
      .list-card {
        padding: var(--spacing-large) var(--spacing-medium);
        min-height: 180px;
      }
      .card-avatar {
        width: 44px;
        height: 44px;
        font-size: var(--font-size-large);
        margin-bottom: var(--spacing-medium);
      }
      .info-label {
        min-width: 70px;
        font-size: var(--font-size-small);
      }
      .info-row {
        font-size: var(--font-size-small);
      }
    }
    .delete-selected-employees {
      background: var(--color-bg-gray);
      color: var(--color-primary);
      border: none;
      padding: var(--spacing-small) var(--spacing-medium);
      border-radius: var(--border-radius-medium);
      cursor: pointer;
      transition: background 0.2s;
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-bold);
      text-transform: uppercase;
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl) var(--spacing-large);
      text-align: center;
      background: var(--color-white);
      border-radius: var(--border-radius-large);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    .empty-state-icon {
      width: 64px;
      height: 64px;
      opacity: 0.5;
    }
    .empty-state-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-small);
    }
    .empty-state-description {
      font-size: var(--font-size-medium);
      color: var(--color-text-secondary);
      max-width: 400px;
      margin: 0 auto;
    }
  `;static properties={view:{type:String,reflect:!0},search:{type:String},page:{type:Number},pageSize:{type:Number},employees:{type:Array},showDeleteConfirm:{type:Boolean},employeeToDelete:{type:Object},selectedIds:{type:Array},showBulkDeleteConfirm:{type:Boolean}};constructor(){super(),this.view=n,this.search="",this.page=1,this.pageSize=10,this.employees=s(),this.showDeleteConfirm=!1,this.employeeToDelete=null,this.selectedIds=[],this.showBulkDeleteConfirm=!1,this._onLanguageChanged=this._onLanguageChanged.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("language-changed",this._onLanguageChanged)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("language-changed",this._onLanguageChanged)}_onLanguageChanged(){this.requestUpdate()}get filteredEmployees(){if(!this.search)return this.employees;const t=this.search.toLowerCase();return this.employees.filter((e=>e.firstName.toLowerCase().includes(t)||e.lastName.toLowerCase().includes(t)||e.email.toLowerCase().includes(t)||e.department.toLowerCase().includes(t)||e.position.toLowerCase().includes(t)))}get pagedEmployees(){const t=(this.page-1)*this.pageSize;return this.filteredEmployees.slice(t,t+this.pageSize)}get pageCount(){return Math.ceil(this.filteredEmployees.length/this.pageSize)}setView(t){this.view=t}setSearch(t){this.search=t.target.value,this.page=1}setPage(t){t<1||t>this.pageCount||(this.page=t)}emitEdit(t){this.dispatchEvent(new CustomEvent("edit",{detail:t,bubbles:!0,composed:!0}))}emitDelete(t){this.dispatchEvent(new CustomEvent("delete",{detail:t,bubbles:!0,composed:!0}))}willUpdate(t){t.has("view")&&this.requestUpdate()}checkAll(t){this.shadowRoot.querySelectorAll('input[type="checkbox"]').forEach((e=>{e.checked=t.target.checked}))}_onCheckboxChange(t,e){t.target.checked?this.selectedIds=[...this.selectedIds,e]:this.selectedIds=this.selectedIds.filter((t=>t!==e))}_onCheckAllChange(t){t.target.checked?this.selectedIds=this.pagedEmployees.map((t=>t.id)):this.selectedIds=[]}_isChecked(t){return this.selectedIds.includes(t)}_isAllChecked(){return this.pagedEmployees.length>0&&this.pagedEmployees.every((t=>this.selectedIds.includes(t.id)))}_onBulkDeleteClick(){this.showBulkDeleteConfirm=!0}_handleBulkDeleteProceed(){this.selectedIds.forEach((t=>r(t))),this.employees=s(),this.selectedIds=[],this.showBulkDeleteConfirm=!1}_handleBulkDeleteCancel(){this.showBulkDeleteConfirm=!1}_onDeleteClick(t){this.employeeToDelete=t,this.showDeleteConfirm=!0}_handleDeleteProceed(){this.employeeToDelete&&(r(this.employeeToDelete.id),this.employees=s()),this.showDeleteConfirm=!1,this.employeeToDelete=null}_handleDeleteCancel(){this.showDeleteConfirm=!1,this.employeeToDelete=null}renderEmptyState(){return i`
      <div class="empty-state">
        <img src="/assets/icons/empty-state.svg" alt="No data" class="empty-state-icon" />
        <h3 class="empty-state-title">${a("noEmployeesFound")}</h3>
      </div>
    `}renderTable(){return 0===this.pagedEmployees.length?this.renderEmptyState():i`
      <div class="table-wrapper">
        ${this.selectedIds.length>0?i`
          <div style="margin-bottom: var(--spacing-large); display: flex; justify-content: flex-end;">
            <button class="delete-selected-employees" @click=${this._onBulkDeleteClick}>
              ${a("deleteSelectedEmployees")}
            </button>
          </div>
        `:""}
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  class="check-all"
                  .checked=${this._isAllChecked()}
                  @change=${this._onCheckAllChange}
                />
              </th>
              <th>${a("firstName")}</th>
              <th>${a("lastName")}</th>
              <th>${a("employmentDate")}</th>
              <th>${a("birthDate")}</th>
              <th>${a("phone")}</th>
              <th>${a("email")}</th>
              <th>${a("department")}</th>
              <th>${a("position")}</th>
              <th>${a("actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${this.pagedEmployees.map((t=>i`
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      .checked=${this._isChecked(t.id)}
                      @change=${e=>this._onCheckboxChange(e,t.id)}
                    />
                  </td>
                  <td>${t.firstName}</td>
                  <td>${t.lastName}</td>
                  <td>${t.employmentDate}</td>
                  <td>${t.birthDate}</td>
                  <td>${t.phone}</td>
                  <td>${t.email}</td>
                  <td>${t.department}</td>
                  <td>${t.position}</td>
                  <td class="actions">
                    <button
                      class="icon-btn"
                      @click=${()=>this.emitEdit(t)}
                      title="Edit"
                    >
                      <img src="/assets/icons/edit.svg" alt="Edit" width="24" height="24" />
                    </button>
                    <button
                      class="icon-btn"
                      @click=${()=>this._onDeleteClick(t)}
                      title="Delete"
                    >
                      <img src="/assets/icons/trash.svg" alt="Delete" width="24" height="24" />
                    </button>
                  </td>
                </tr>
              `))}
          </tbody>
        </table>
      </div>
    `}renderList(){return 0===this.pagedEmployees.length?this.renderEmptyState():i`
      <div class="list-view">
        ${this.pagedEmployees.map((t=>i`
            <div class="list-card">
              <div class="card-actions">
                <button
                  class="icon-btn edit-btn"
                  @click=${()=>this.emitEdit(t)}
                  title="Edit"
                >
                   <img src="/assets/icons/edit.svg" alt="Edit" width="16" height="16" />
                   ${a("edit")}
                </button>
                <button
                  class="icon-btn delete-btn"
                  @click=${()=>this._onDeleteClick(t)}
                  title="Delete"
                >
                  <img src="/assets/icons/trash.svg" alt="Delete" width="16" height="16" />
                  ${a("delete")}
                </button>
              </div>
              <div class="card-content">
                <div class="card-left-column">
                  <div class="info-row">
                    <span class="info-label">${a("firstName")}:</span>
                    <span class="info-value">${t.firstName}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">${a("employmentDate")}:</span>
                    <span class="info-value">${t.employmentDate}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">${a("phone")}:</span>
                    <span class="info-value">${t.phone}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">${a("department")}:</span>
                    <span class="info-value">${t.department}</span>
                  </div>
                </div>
                <div class="card-right-column">
                  <div class="info-row">
                    <span class="info-label">${a("lastName")}:</span>
                    <span class="info-value">${t.lastName}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">${a("birthDate")}:</span>
                    <span class="info-value">${t.birthDate}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">${a("email")}:</span>
                    <span class="info-value">${t.email}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">${a("position")}:</span>
                    <span class="info-value">${t.position}</span>
                  </div>
                </div>
              </div>
            </div>
          `))}
      </div>
    `}renderPagination(){const t=[];if(this.pageCount<=1)return i``;for(let e=1;e<=this.pageCount;e++)1===e||e===this.pageCount||Math.abs(e-this.page)<=1?t.push(e):(2===e&&this.page>3||e===this.pageCount-1&&this.page<this.pageCount-2)&&t.push("...");return i`
      <div class="pagination">
        <button
          class="page-btn"
          ?disabled=${1===this.page}
          @click=${()=>this.setPage(this.page-1)}
        >
          &lt;
        </button>
        ${t.map((t=>"..."===t?i`<span>...</span>`:i`<button
                class="page-btn ${this.page===t?"active":""}"
                @click=${()=>this.setPage(t)}
              >
                ${t}
              </button>`))}
        <button
          class="page-btn"
          ?disabled=${this.page===this.pageCount}
          @click=${()=>this.setPage(this.page+1)}
        >
          &gt;
        </button>
      </div>
    `}render(){return i`
      <div class="top-bar">
        <input
          class="search-input"
          type="text"
          .value=${this.search}
          @input=${this.setSearch}
          placeholder="${a("search")||"Search..."}"
        />
      </div>
      ${this.view===n?this.renderTable():this.renderList()}

      ${this.pagedEmployees.length>0?this.renderPagination():""}

      <action-prompt
        .open=${this.showDeleteConfirm}
        .title=${a("deleteConfirmTitle")}
        .description=${a("deleteConfirmDesc").replace("{firstName}",this.employeeToDelete?.firstName||"").replace("{lastName}",this.employeeToDelete?.lastName||"")}
        @proceed=${this._handleDeleteProceed}
        @cancel=${this._handleDeleteCancel}
      ></action-prompt>
      <action-prompt
        .open=${this.showBulkDeleteConfirm}
        .title=${a("deleteSelectedEmployees")}
        .description=${a("deleteSelectedEmployeesDesc")}
        @proceed=${this._handleBulkDeleteProceed}
        @cancel=${this._handleBulkDeleteCancel}
      ></action-prompt>
    `}}customElements.define("people-directory",o);class l extends t{static styles=e`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-large);
    }

    .header-title {
      font-size: var(--font-size-xxl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
    }

    .view-toggle {
      display: flex;
      gap: var(--spacing-small);
    }
    .toggle-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--spacing-small);
      border-radius: var(--border-radius-medium);
      display: flex;
      align-items: center;
      color: var(--color-primary);
      opacity: 0.5;
      transition: background 0.2s, opacity 0.2s;
    }
    .toggle-btn.active {
      background: var(--color-bg-gray);
      opacity: 1;
    }
  `;static properties={view:{type:String}};constructor(){super(),this.view=n,this._onLanguageChanged=this._onLanguageChanged.bind(this)}setView(t){this.view=t}_onLanguageChanged(){this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener("language-changed",this._onLanguageChanged)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("language-changed",this._onLanguageChanged)}render(){return i`
      <div>
        <div class="header">
          <h2 class="header-title">${a("employeeList")}</h2>
          <div class="view-toggle">
            <button class="toggle-btn ${"table"===this.view?"active":""}" @click=${()=>this.setView("table")} title="Table View">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="6" height="6"/><rect x="12" y="2" width="6" height="6"/><rect x="2" y="12" width="6" height="6"/><rect x="12" y="12" width="6" height="6"/></svg>
            </button>
            <button class="toggle-btn ${"list"===this.view?"active":""}" @click=${()=>this.setView("list")} title="List View">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="14" height="3"/><rect x="3" y="10" width="14" height="3"/><rect x="3" y="16" width="14" height="3"/></svg>
            </button>
          </div>
        </div>
        <people-directory .view=${this.view} @edit=${this.handleEdit}></people-directory>
      </div>
    `}handleEdit(t){const e=t.detail;window.history.pushState({},"",`/edit/${e.id}`),window.dispatchEvent(new PopStateEvent("popstate"))}}customElements.define("directory-page",l);export{l as DirectoryPage};
