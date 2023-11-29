import axios from 'axios';

const { VITE_PUBLIC_API } = import.meta.env;
const customFetch = axios.create({
  baseURL: `${VITE_PUBLIC_API}/api/v1`,
});

// customFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`
// customFetchLocal.defaults.headers.common['Authorization'] = `Bearer ${token}`

export { customFetch };
