import { REQUEST_CURRENCY, RECEIVE_CURRENCY_SUCCESS,
  SAVEEXPENSES, REMOVEEXPENSES, EDITMODEON,
  MODIFYEXPENSES, EDITMODEOFF } from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isFetching: false,
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return { ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCY_SUCCESS:
    return { ...state,
      currencies: action.payload,
      isFetching: false,
    };
  case SAVEEXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVEEXPENSES: {
    const ids = state.expenses.map((ele) => (ele.id));
    const index = ids.indexOf(action.payload);
    const newExpenses = [...state.expenses];
    newExpenses.splice(index, 1);
    return {
      ...state,
      expenses: newExpenses,
    };
  }
  case EDITMODEON:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case EDITMODEOFF:
    return {
      ...state,
      editor: false,
      idToEdit: action.payload,
    };
  case MODIFYEXPENSES: {
    const ids = state.expenses.map((ele) => (ele.id));
    const index = ids.indexOf(action.payload.id);
    const newExpenses = [...state.expenses];
    newExpenses[index] = action.payload;
    return {
      ...state,
      expenses: newExpenses,
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
