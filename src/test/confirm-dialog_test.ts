/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { ActionPrompt } from "../components/action-prompt.ts";
import { fixture, assert } from "@open-wc/testing";
import { html } from "lit/static-html.js";

suite("action-prompt", () => {
  test("is defined", () => {
    const el = document.createElement("action-prompt");
    assert.instanceOf(el, ActionPrompt);
  });

  test("does not render when open is false", async () => {
    const el = await fixture(
      html`<action-prompt .open=${false}></action-prompt>`
    );
    await el.updateComplete;
    // Check that no dialog content is rendered
    assert.isNull(el.shadowRoot?.querySelector(".overlay"));
  });

  test("renders when open is true", async () => {
    const el = await fixture(
      html`<action-prompt .open=${true} title="Test Title"></action-prompt>`
    );
    await el.updateComplete;
    assert.exists(el.shadowRoot?.querySelector(".overlay"));
  });

  test("emits proceed event when proceed button is clicked", async () => {
    const el = await fixture(
      html`<action-prompt .open=${true}></action-prompt>`
    );
    await el.updateComplete;

    let proceedEventFired = false;
    el.addEventListener("proceed", () => {
      proceedEventFired = true;
    });

    const proceedButton = el.shadowRoot?.querySelector(
      'button[class*="primary"]'
    ) as HTMLElement;
    if (proceedButton) {
      proceedButton.click();
      await el.updateComplete;
      assert.isTrue(proceedEventFired);
    }
  });

  test("emits cancel event when cancel button is clicked", async () => {
    const el = await fixture(
      html`<action-prompt .open=${true}></action-prompt>`
    );
    await el.updateComplete;

    let cancelEventFired = false;
    el.addEventListener("cancel", () => {
      cancelEventFired = true;
    });

    const cancelButton = el.shadowRoot?.querySelector(
      'button[class*="secondary"]'
    ) as HTMLElement;
    if (cancelButton) {
      cancelButton.click();
      await el.updateComplete;
      assert.isTrue(cancelEventFired);
    }
  });
});
