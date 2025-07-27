import { fetchTranslationsAsync } from "./utils/i18n.ts";
import { routerService } from "./utils/router.ts";

(async (): Promise<void> => {
  await fetchTranslationsAsync();

  // Initialize router
  const outlet = document.querySelector("#outlet");
  if (outlet) {
    routerService.init(outlet);
  }

  import("./components/nav-bar.ts");
  import("./app/directory-page.ts");
  import("./app/editor-page.ts");
})();
