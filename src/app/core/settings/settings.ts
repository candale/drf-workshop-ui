import { environment } from '@environment';

const baseUrl = environment.production ? 'https://mgr-api.florin.me/' : 'http://localhost:8000/';
const baseApiUrl = baseUrl + 'api/';

export const Settings = {
  baseUrl: baseUrl,
  baseAdmin: `${baseUrl}admin/`,
  api: {
    base: `${baseApiUrl}`,
    auth: {
      register: `${baseApiUrl}rest-auth/registration/`,
      login: `${baseApiUrl}rest-auth/login/`,
      user: `${baseApiUrl}rest-auth/user/`,
    },
    tasks: {
      boards: `${baseApiUrl}task/boards/`,
      items: `${baseApiUrl}task/items/`,
      done_items: `${baseApiUrl}task/items/done_tasks/`,
    }
  }
};
