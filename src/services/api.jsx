import axios from 'axios';

//Base da URL: https://api.themoviedb.org/3/
//URL da api: /movie/now_playing?api_key=5bc4565984f5d84e202811fea28f3b64&language=pt-BR

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export default api;
