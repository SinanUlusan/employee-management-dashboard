/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { ActionPrompt } from '../components/action-prompt.js';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('action-prompt', () => {
  test('is defined', () => {
    const el = document.createElement('action-prompt');
    assert.instanceOf(el, ActionPrompt);
  });

  test('does not render when open is false', async () => {
    const el = await fixture(html`<action-prompt .open=${false}></action-prompt>`);
    await el.updateComplete;
    // Check that no dialog content is rendered
    assert.isNull(el.shadowRoot.querySelector('.overlay'));
  });

  test('renders when open is true', async () => {
    const el = await fixture(html`<action-prompt .open=${true} title="Test Title"></action-prompt>`);
    await el.updateComplete;
    assert.exists(el.shadowRoot.querySelector('.overlay'));
    assert.exists(el.shadowRoot.querySelector('.dialog'));
    assert.equal(el.shadowRoot.querySelector('.dialog-title').textContent.trim(), 'Test Title');
  });

  test('emits proceed event when proceed button is clicked', async () => {
    const el = await fixture(html`<action-prompt .open=${true}></action-prompt>`);
    await el.updateComplete;

    let proceedEventFired = false;
    el.addEventListener('proceed', () => {
      proceedEventFired = true;
    });

    const proceedButton = el.shadowRoot.querySelector('.btn-primary');
    proceedButton.click();
    await el.updateComplete;

    assert.isTrue(proceedEventFired);
  });

  test('emits cancel event when cancel button is clicked', async () => {
    const el = await fixture(html`<action-prompt .open=${true}></action-prompt>`);
    await el.updateComplete;

    let cancelEventFired = false;
    el.addEventListener('cancel', () => {
      cancelEventFired = true;
    });

    const cancelButton = el.shadowRoot.querySelector('.btn-secondary');
    cancelButton.click();
    await el.updateComplete;

    assert.isTrue(cancelEventFired);
  });

  test('emits cancel event when close button is clicked', async () => {
    const el = await fixture(html`<action-prompt .open=${true}></action-prompt>`);
    await el.updateComplete;

    let cancelEventFired = false;
    el.addEventListener('cancel', () => {
      cancelEventFired = true;
    });

    const closeButton = el.shadowRoot.querySelector('.close-btn');
    closeButton.click();
    await el.updateComplete;

    assert.isTrue(cancelEventFired);
  });

  test('emits cancel event when clicking outside dialog', async () => {
    const el = await fixture(html`<action-prompt .open=${true}></action-prompt>`);
    await el.updateComplete;

    let cancelEventFired = false;
    el.addEventListener('cancel', () => {
      cancelEventFired = true;
    });

    // Create and dispatch a click event on the overlay
    const overlay = el.shadowRoot.querySelector('.overlay');
    const clickEvent = new Event('click', {
      bubbles: true,
      cancelable: true,
      composed: true
    });

    // Set the target to the overlay to ensure it's not the dialog
    Object.defineProperty(clickEvent, 'target', {
      value: overlay,
      writable: false
    });

    // Set the currentTarget to the overlay as well
    Object.defineProperty(clickEvent, 'currentTarget', {
      value: overlay,
      writable: false
    });

    overlay.dispatchEvent(clickEvent);
    await el.updateComplete;

    assert.isTrue(cancelEventFired, 'Cancel event should be fired when clicking outside dialog');
  });

  test('does not emit cancel event when clicking inside dialog', async () => {
    const el = await fixture(html`<action-prompt .open=${true}></action-prompt>`);
    await el.updateComplete;

    let cancelEventFired = false;
    el.addEventListener('cancel', () => {
      cancelEventFired = true;
    });

    // Create and dispatch a click event on the dialog
    const dialog = el.shadowRoot.querySelector('.dialog');
    const clickEvent = new Event('click', {
      bubbles: true,
      cancelable: true,
      composed: true
    });

    // Set the target to the dialog to ensure it's not the overlay
    Object.defineProperty(clickEvent, 'target', {
      value: dialog,
      writable: false
    });

    // Set the currentTarget to the dialog as well
    Object.defineProperty(clickEvent, 'currentTarget', {
      value: dialog,
      writable: false
    });

    dialog.dispatchEvent(clickEvent);
    await el.updateComplete;

    assert.isFalse(cancelEventFired, 'Cancel event should not be fired when clicking inside dialog');
  });
});