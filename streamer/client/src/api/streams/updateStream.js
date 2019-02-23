import http from './../config/axios';

const updateStream = (streamId, newStream) => {
  return http.put(`/streams/${streamId}`, newStream);
};

export default updateStream;
