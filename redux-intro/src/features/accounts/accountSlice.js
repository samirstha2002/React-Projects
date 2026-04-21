const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

export function deposit(amt) {
  return { type: "account/deposit", payload: amt };
}
export function withdraw(amt) {
  return { type: "account/withdraw", payload: amt };
}

export function requestLoan(amt, pur) {
  return {
    type: "account/requestLoan",
    payload: { amount: amt, purpose: pur },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
