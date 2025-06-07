import axios from 'axios';

const API_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCampers = async (filters = {}) => {
  try {
    const params = {};

    if (filters.location) {
      params.location = filters.location;
    }

    if (filters.type?.length) {
      params.form = filters.type[0];
    }

    // Для обладнання — проставимо окремо, де потрібен true
    if (filters.equipment?.includes('AC')) params.AC = true;
    if (filters.equipment?.includes('Automatic')) params.transmission = 'automatic';
    if (filters.equipment?.includes('Kitchen')) params.kitchen = true;
    if (filters.equipment?.includes('TV')) params.TV = true;
    if (filters.equipment?.includes('Bathroom')) params.bathroom = true;

    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching campers:', error);
    throw error;
  }
};

export const fetchCamperDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching camper details:', error);
    throw error;
  }
};
