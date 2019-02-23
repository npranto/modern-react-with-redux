import http from './../config/axios';

const getStreams = () => {
  return http.get('/streams');
};

export default getStreams;
