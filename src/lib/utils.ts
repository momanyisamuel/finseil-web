import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";
import api, { apiUrl } from "../../api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const logoutUser = async () => {
  try {
    // Clear tokens from localStorage on successful logout
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    window.location.reload();
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

// Example of login logic (usually inside a login component or context)
export const loginUser = async (credentials: { username: string; password: string }) => {
  try {
    const response = await api.post('/token/', credentials);
    
    console.log('Login successful:', response);
    // Store tokens on successful login
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    return response;
  } catch (error) {
    console.error('Login failed', error);
  }
};


// use zoho refresh token to get access token

export const getAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh');
    const response = await api.post('/zoho/auth/refresh/', { refresh: refreshToken });
    return response;
  } catch (error) {
    console.error('Failed to get access token:', error);
  }
};

export const sendEmail = async (
  message: string,
  subject: string,
  recipient_list: string[]
) => {
  const email = {
    subject: subject,
    message: message,
    recipient_list: [...recipient_list],
  };
  const result = await axios.post(`${apiUrl}email/send/`, email);
  return result;
};

interface CountryCodeMap {
  [key: string]: string;
}

// Mapping of country codes to their phone prefixes
const countryCodeMap: CountryCodeMap = {
  "KE": "254", // Kenya
  "US": "1",   // United States
  "GB": "44",  // United Kingdom
  // Add more countries as needed
};

export function normalizePhoneNumber(phoneNumber: string, countryCode: string): string {
  // Convert to uppercase for case insensitivity in country code lookup
  countryCode = countryCode.toUpperCase();
  
  // Get the country prefix from the map
  const prefix = countryCodeMap[countryCode];
  
  if (!prefix) {
      throw new Error(`Country code ${countryCode} not found in the map.`);
  }

  // Remove all non-digit characters, leading zeros, and normalize the number
  const normalizedNumber = phoneNumber.replace(/\D/g, '').replace(/^0+/, '');
  
  // Check if the number already starts with the prefix
  if (normalizedNumber.startsWith(prefix)) {
      return normalizedNumber;
  } else {
      // Add the prefix if it's not there
      return prefix + normalizedNumber;
  }
}