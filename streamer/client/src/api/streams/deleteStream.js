import http from './../config/axios';

const deleteStream = (streamId) => {
  return http.delete(`/streams/${streamId}`);
};

export default deleteStream;
