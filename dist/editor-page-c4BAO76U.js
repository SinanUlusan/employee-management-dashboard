import{i as e,a as i,x as t}from"./lit-element-CI_CooFu.js";import{t as a}from"./main.js";import{g as r,a as s,u as o}from"./action-prompt-nWjAZJ9G.js";class n extends e{static styles=i`
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
  `;static properties={employee:{type:Object},form:{type:Object},errors:{type:Object},showConfirm:{type:Boolean},showToast:{type:Boolean},originalForm:{type:Object},hasChanges:{type:Boolean}};constructor(){super(),this.form={firstName:"",lastName:"",email:"",phone:"",department:"",position:"",employmentDate:"",birthDate:""},this.originalForm={...this.form},this.errors={},this.showConfirm=!1,this.showToast=!1,this.hasChanges=!1,this._onLanguageChanged=this._onLanguageChanged.bind(this)}_onLanguageChanged(){this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener("language-changed",this._onLanguageChanged)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("language-changed",this._onLanguageChanged)}updated(e){e.has("employee")&&this.employee&&(this.form={...this.employee},this.originalForm={...this.employee},this.errors={},this.hasChanges=!1)}handleInput(e){const{name:i,value:t}=e.target;this.form={...this.form,[i]:t},this.errors={...this.errors,[i]:""},this._checkForChanges()}_checkForChanges(){this.originalForm?this.hasChanges=Object.keys(this.form).some((e=>this.form[e]!==this.originalForm[e])):this.hasChanges=!0}validate(){const e={};if(this.form.firstName||(e.firstName=a("required")),this.form.lastName||(e.lastName=a("required")),this.form.email?/^[^@]+@[^@]+\.[^@]+$/.test(this.form.email)||(e.email=a("invalidEmail")):e.email=a("required"),this.form.phone?/^\+?\d[\d\s\-()]{7,}$/.test(this.form.phone)||(e.phone=a("invalidPhone")):e.phone=a("required"),this.form.department||(e.department=a("required")),this.form.position||(e.position=a("required")),this.form.employmentDate||(e.employmentDate=a("required")),this.form.birthDate||(e.birthDate=a("required")),this.form.birthDate){const i=new Date(this.form.birthDate),t=new Date;t.setHours(0,0,0,0),i>t&&(e.birthDate=a("invalidBirthDate"))}if(this.form.birthDate&&this.form.employmentDate){const i=new Date(this.form.birthDate);new Date(this.form.employmentDate)<=i&&(e.employmentDate=a("employmentAfterBirth"))}return r().some((e=>e.email===this.form.email&&(!this.form.id||String(e.id)!==String(this.form.id))))&&(e.email=a("uniqueEmail")),e}handleSubmit(e){e.preventDefault(),this.errors=this.validate(),Object.keys(this.errors).length>0||(this.form.id?this.showConfirm=!0:(s({...this.form}),this.showToast=!0,setTimeout((()=>{this.showToast=!1,window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))}),2e3)))}_handleConfirmProceed(){o(this.form),this.showConfirm=!1,window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))}_handleConfirmCancel(){this.showConfirm=!1}handleCancel(){window.history.back()}render(){return t`
      <div class="form-container">
        <div class="form-title">${this.form.id?a("editEmployee"):a("addNew")}</div>
        <form @submit=${this.handleSubmit}>
          <div class="form-fields">
            <div class="form-group">
              <label for="firstName">${a("firstName")}</label>
              <input name="firstName" .value=${this.form.firstName} @input=${this.handleInput} placeholder=${a("firstName")} />
              ${this.errors.firstName?t`<div class="error-message">${this.errors.firstName}</div>`:""}
            </div>
            <div class="form-group">
              <label for="lastName">${a("lastName")}</label>
              <input name="lastName" .value=${this.form.lastName} @input=${this.handleInput} placeholder=${a("lastName")} />
              ${this.errors.lastName?t`<div class="error-message">${this.errors.lastName}</div>`:""}
            </div>
            <div class="form-group">
              <label for="email">${a("email")}</label>
              <input name="email" .value=${this.form.email} @input=${this.handleInput} placeholder=${a("email")} type="email" />
              ${this.errors.email?t`<div class="error-message">${this.errors.email}</div>`:""}
            </div>
            <div class="form-group">
              <label for="phone">${a("phone")}</label>
              <input name="phone" .value=${this.form.phone} @input=${this.handleInput} placeholder=${a("phone")} />
              ${this.errors.phone?t`<div class="error-message">${this.errors.phone}</div>`:""}
            </div>
            <div class="form-group">
              <label for="department">${a("department")}</label>
              <select name="department" .value=${this.form.department} @change=${this.handleInput}>
                <option value="">${a("select")}</option>
                <option value="Analytics">Analytics</option>
                <option value="Tech">Tech</option>
              </select>
              ${this.errors.department?t`<div class="error-message">${this.errors.department}</div>`:""}
            </div>
            <div class="form-group">
              <label for="position">${a("position")}</label>
              <select name="position" .value=${this.form.position} @change=${this.handleInput}>
                <option value="">${a("select")}</option>
                <option value="Junior">Junior</option>
                <option value="Medior">Medior</option>
                <option value="Senior">Senior</option>
              </select>
              ${this.errors.position?t`<div class="error-message">${this.errors.position}</div>`:""}
            </div>
            <div class="form-group">
              <label for="employmentDate">${a("employmentDate")}</label>
              <input name="employmentDate" .value=${this.form.employmentDate} @input=${this.handleInput} type="date" />
              ${this.errors.employmentDate?t`<div class="error-message">${this.errors.employmentDate}</div>`:""}
            </div>
            <div class="form-group">
              <label for="birthDate">${a("birthDate")}</label>
              <input name="birthDate" .value=${this.form.birthDate} @input=${this.handleInput} type="date" />
              ${this.errors.birthDate?t`<div class="error-message">${this.errors.birthDate}</div>`:""}
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click=${this.handleCancel}>${a("cancel")}</button>
            <button 
              type="submit" 
              class="btn btn-primary" 
              ?disabled=${this.form.id&&!this.hasChanges}
            >${a("save")}</button>
          </div>
        </form>
        <action-prompt
          .open=${this.showConfirm}
          .title=${a("editEmployee")}
          .description=${a("editConfirmDesc").replace("{firstName}",this.form.firstName).replace("{lastName}",this.form.lastName)}
          @proceed=${this._handleConfirmProceed}
          @cancel=${this._handleConfirmCancel}
        ></action-prompt>
        ${this.showToast?t`
          <div class="toast show">
            ${a("employeeAddedSuccess")}
          </div>
        `:""}
      </div>
    `}}customElements.define("person-editor",n);class l extends e{static properties={employee:{type:Object}};constructor(){super(),this.employee=null}connectedCallback(){super.connectedCallback();const e=new URL(window.location.href).pathname.split("/")[2];if(e){const i=r();this.employee=i.find((i=>String(i.id)===String(e)))}}render(){return t`<person-editor .employee=${this.employee}></person-editor>`}}customElements.define("editor-page",l);export{l as EditorPage};
