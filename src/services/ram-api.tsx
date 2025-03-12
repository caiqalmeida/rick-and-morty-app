import axios from 'axios';

const ramApiHttpClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

ramApiHttpClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios Error:', error);
    // TO DO: Handle API errors
    throw error;
  }
);

export const getCharacters = async ({ page = 1, search }: { page?: number; search?: string }) => {
  try {
    const queryParams = new URLSearchParams({ page: page.toString() });

    if (search) {
      queryParams.append('name', search);
    }

    const response = await ramApiHttpClient.get(`character/?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};