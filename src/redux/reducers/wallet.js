// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_DATA, ADD_ENTRY, REMOVE_ENTRY } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  const { expenses } = action;
  switch (action.type) {
  case WALLET_DATA:
    return {
      ...state,
      currencies: action.payload };

  case ADD_ENTRY:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        expenses,
      ],
    };

  case REMOVE_ENTRY:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.expense),
    };

  default:
    return state;
  }
};

export default wallet;
