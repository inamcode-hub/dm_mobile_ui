import Cookies from 'js-cookie';
import { capitalize } from '../../lib/helpers';
import { toast } from 'react-toastify';

// Utility function to set a cookie
export const setCookie = (name, value, options = {}) => {
  const defaults = { expires: 30, secure: true, sameSite: 'none' };
  const finalOptions = { ...defaults, ...options };
  Cookies.set(name, value, finalOptions);
};

// =================== Redux functions ===================
// Example usage within your thunks
export const setUserCookies = (userData) => {
  const { token, role, firstName, lastName, email, dmSerial } = userData;
  setCookie('dryermaster_token', token);
  setCookie('dryermaster_role', role);
  setCookie('dryermaster_firstName', firstName);
  setCookie('dryermaster_lastName', lastName);
  setCookie('dryermaster_email', email);
  setCookie('dryermaster_dmSerial', dmSerial);
};

// =================== Redux functions ===================

// Utility function to remove user cookies
export const removeUserCookies = () => {
  Cookies.remove('dryermaster_token');
  Cookies.remove('dryermaster_role');
  Cookies.remove('dryermaster_firstName');
  Cookies.remove('dryermaster_lastName');
  Cookies.remove('dryermaster_email');
  Cookies.remove('dryermaster_dmSerial');
};

// =================== Redux functions ===================

// Utility function to produce goodby message
export const goodbyeMessage = () => {
  const firstName = Cookies.get('dryermaster_firstName') || '';
  const lastName = Cookies.get('dryermaster_lastName') || '';
  const capitalizedFirstName = firstName ? capitalize(firstName) : '';
  const capitalizedLastName = lastName ? capitalize(lastName) : '';
  const goodbyeMessage = `Goodbye ${capitalizedFirstName} ${capitalizedLastName} 👋🏼`;
  toast.info(goodbyeMessage);
};
