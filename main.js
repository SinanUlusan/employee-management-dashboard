import { fetchTranslationsAsync } from './utils/i18n.js';

(async () => {
  await fetchTranslationsAsync();
  import('./router.js');
  import('./components/nav-bar.js');
  import('./views/directory-page.js');
  import('./views/editor-page.js');
})();
