import axios from 'axios';

const API = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '36263090-4ac025e05887d3bdb206f17e0',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});

export const getImages = async (value, page = 1) => {
  try {
    const { data } = await API.get('', { params: { q: value, page } });
    return data;
  } catch (error) {
    console.log('error');
  }
};
