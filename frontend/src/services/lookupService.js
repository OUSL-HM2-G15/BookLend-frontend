// API calls for dropdown data - locations and categories

import axios from "axios";
import { getFromStorage, saveToStorage } from "../utils/storage";

const API_URL = process.env.REACT_APP_API_URL;

// Load locations with caching
export const loadLocations = async () => {
  const stored = getFromStorage("locations");
  if (stored) return stored;

  const res = await axios.get(`${API_URL}/locations`);
  saveToStorage("locations", res.data);
  return res.data;
};

// Load categories with caching
export const loadCategories = async () => {
  const stored = getFromStorage("categories");
  if (stored) return stored;

  const res = await axios.get(`${API_URL}/categories`);
  saveToStorage("categories", res.data);
  return res.data;
};
