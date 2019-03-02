import store from './../state';
import { getCurrentUserId } from './authHelpers';

const getState = () => store.getState();

export const isStreamCreatedByCurrentUser = (stream) => {
  const currentUserId = getCurrentUserId();
  const { createdBy } = stream;

  if (currentUserId && createdBy && (currentUserId === createdBy)) {
    return true;
  }
  return false;
}
