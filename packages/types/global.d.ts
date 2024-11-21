import 'vue-router';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta {}
}

export interface WAdvAdminProAppConfigRaw {
  VITE_GLOB_API_URL: string;
}

export interface ApplicationConfig {
  apiURL: string;
}

declare global {
  interface Window {
    _WADV_ADMIN_PRO_APP_CONF_: WAdvAdminProAppConfigRaw;
  }
}
