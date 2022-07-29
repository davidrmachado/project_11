// Coloque aqui suas actions:

export const ADD_USER = 'ADD_USER';

export function addUser(payload) {
  return {
    type: ADD_USER,
    payload,
  };
}
