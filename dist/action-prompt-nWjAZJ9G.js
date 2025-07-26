import{i as o,a as r,x as i}from"./lit-element-CI_CooFu.js";import{t}from"./main.js";let a=JSON.parse(localStorage.getItem("employees"))||[];const e=()=>a,s=o=>{o.id=crypto.randomUUID(),a.push(o),l()},n=o=>{a=a.map((r=>r.id===o.id?o:r)),l()},c=o=>{a=a.filter((r=>r.id!==o)),l()},l=()=>localStorage.setItem("employees",JSON.stringify(a));class d extends o{static styles=r`
    .overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.3);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialog {
      background: var(--color-white);
      border-radius: var(--border-radius-large);
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      padding: var(--spacing-xxl) var(--spacing-xl);
      min-width: 340px;
      max-width: 90vw;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-medium);
      position: relative;
      z-index: 1001;
    }
    .dialog-title {
      color: var(--color-primary);
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--spacing-small);
    }
    .dialog-desc {
      color: var(--color-text-primary);
      font-size: var(--font-size-medium);
      opacity: 0.8;
      margin-bottom: var(--spacing-large);
    }
    .dialog-actions {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
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
      background: var(--color-white);
      color: var(--color-secondary);
      border: 1.5px solid var(--color-secondary);
    }
    .close-btn {
      position: absolute;
      top: var(--spacing-medium);
      right: var(--spacing-medium);
      background: none;
      border: none;
      font-size: 24px;
      color: var(--color-secondary);
      cursor: pointer;
    }
  `;static properties={open:{type:Boolean},title:{type:String},description:{type:String}};constructor(){super(),this.open=!1,this.title="",this.description=""}_close(){this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}_proceed(){this.dispatchEvent(new CustomEvent("proceed",{bubbles:!0,composed:!0}))}render(){return this.open?i`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${o=>o.stopPropagation()}>
          <button class="close-btn" @click=${this._close} aria-label="Close">&times;</button>
          <div class="dialog-title">${this.title}</div>
          <div class="dialog-desc">${this.description}</div>
          <div class="dialog-actions">
            <button class="btn btn-primary" @click=${this._proceed}>${t("proceed")}</button>
            <button class="btn btn-secondary" @click=${this._close}>${t("cancel")}</button>
          </div>
        </div>
      </div>
    `:i``}}customElements.define("action-prompt",d);export{s as a,c as d,e as g,n as u};
