import http from './../config/axios';

const createStream = (newStream) => {
  return http.post('/streams', newStream);
}

export default createStream;
