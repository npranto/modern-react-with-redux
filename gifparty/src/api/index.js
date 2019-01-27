import axios from 'axios';

import keys from './../config/keys.js';

export default {
  fetchTrendingGifs: async () => {
    const response = await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${keys.giphy.key}`);
    return response && response.data && response.data.data;
  },

  searchGifs: async (query) => {
    const response = await axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${keys.giphy.key}&q=${query}`);
    return response && response.data && response.data.data;
  }
} 