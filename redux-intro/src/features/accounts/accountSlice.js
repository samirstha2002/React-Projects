const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

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

    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    try {
      const res = await fetch(
        `/latest?amount=${amount}&from=${currency}&to=USD`,
      );

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      const converted = data.rates.USD;

      dispatch({ type: "account/deposit", payload: converted });
    } catch (err) {
      console.error("Deposit failed:", err);
    }
  };
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
