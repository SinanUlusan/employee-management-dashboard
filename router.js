import { Router } from '@vaadin/router';

const outlet = document.querySelector('#outlet');

const router = new Router(outlet);
router.setRoutes([
  { path: '/', component: 'directory-page' },
  { path: '/new', component: 'editor-page' },
  { path: '/edit/:id', component: 'editor-page' },
]);