import { environment } from '@environment';

const baseUrl = environment.production ? 'https://mgr-api.florin.me/' : 'http://localhost:8000/';
const baseApiUrl = baseUrl + 'manager/';

export const Settings = {
  baseUrl: baseUrl,
  baseAdmin: `${baseUrl}admin/`,
  api: {
    base: `${baseApiUrl}`,
    auth: {
      register: `${baseUrl}rest-auth/registration/`,
      login: `${baseUrl}rest-auth/`,
      user: `${baseUrl}rest-auth/user/`,
    },
    tasks: {
      boards: `${baseApiUrl}board/`,
      items: `${baseApiUrl}task/`,
      done_items: `${baseApiUrl}task/done_tasks/`,
    }
  }
};
