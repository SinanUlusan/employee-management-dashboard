import { LitElement, html } from 'lit';
import '../components/employee-form.js';
import { getEmployees } from '../store/employeeStore.js';

export class EditorPage extends LitElement {
  static properties = {
    employee: { type: Object },
  };

  constructor() {
    super();
    this.employee = null;
  }

  connectedCallback() {
    super.connectedCallback();
    const url = new URL(window.location.href);
    const parts = url.pathname.split('/');
    const id = parts[2];

    if (id) {
      const employees = getEmployees();
      this.employee = employees.find(e => String(e.id) === String(id));
    }
  }

  render() {
    return html`<person-editor .employee=${this.employee}></person-editor>`;
  }
}
customElements.define('editor-page', EditorPage);