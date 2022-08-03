// Coloque aqui suas actions:
import getCurrencies from '../../services/currencyAPI';

export const ADD_USER = 'ADD_USER';

export function addUser(payload) {
  return {
    type: ADD_USER,
    payload,
  };
}

export const WALLET_DATA = 'WALLET_DATA';

export const walletData = (payload) => ({
  type: 'WALLET_DATA',
  payload,
});

export const ADD_ENTRY = 'ADD_ENTRY';

export const addEntry = (expenses) => ({
  type: ADD_ENTRY,
  expenses,
});

export const getCurrencyList = () => async (dispatch) => {
  const currencyList = Object.keys(await getCurrencies());
  currencyList.splice(1, 1); // Método splice usado para remover o item da posição 1 (array.splice(index, quantidade))
  dispatch(walletData(currencyList));
};
