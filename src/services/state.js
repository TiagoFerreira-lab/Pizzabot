const store = new Map();
export function getState(user){ if(!store.has(user)) store.set(user,{step:'welcome', order:{}}); return store.get(user); }
export function setState(user, newState){ store.set(user, { ...getState(user), ...newState }); }
export function clearState(user){ store.delete(user); }
