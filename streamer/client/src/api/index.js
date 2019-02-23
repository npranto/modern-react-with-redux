import createStream from './streams/createStream';
import getStreams from './streams/getStreams';
import getStream from './streams/getStream';
import updateStream from './streams/updateStream';
import deleteStream from './streams/deleteStream';

const API = {
  streams: {
    createStream,
    getStreams,
    getStream,
    updateStream,
    deleteStream,
  }
}

export default API;
