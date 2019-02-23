import http from './../config/axios';

const getStream = (streamId) => {
  return http.get(`/streams/${streamId}`);
};

export default getStream;
