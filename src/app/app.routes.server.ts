import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '/login',
    renderMode: RenderMode.Prerender
  },
  {
    path: '/home',
    renderMode: RenderMode.Prerender
  },
  {
    path: '/patients',
    renderMode: RenderMode.Prerender
  },
  {
    path: '/search',
    renderMode: RenderMode.Prerender
  }
];
