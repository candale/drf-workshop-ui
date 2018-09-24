import { environment } from '@environment';

const baseUrl = environment.production ? 'https://mgr-api.florin.me/api/' : 'http://localhost:8000/api/';

export const Settings = {
  api: {
    base: baseUrl,
    auth: {
      login: `${baseUrl}rest-auth/login/`,
      user: `${baseUrl}rest-auth/user/`,
    },
    tasks: {
      boards: `${baseUrl}task/boards/`,
      items: `${baseUrl}task/items/`,
    }
  }
};
