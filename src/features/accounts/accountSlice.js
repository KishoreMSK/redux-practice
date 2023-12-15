import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: ''
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action){
            state.balance += action.payload 
        },
        withdraw(state, action){
            state.balance -= action.payload
        },
        requestLoan:{
        //redux toolkit only accepts single parameter. so prepare is used to modifies the payload
        prepare(amount, purpose){
            return{
                    payload: {amount, purpose}
                }
            },
        reducer(state, action){
            if(state.loan > 0) return;
            state.loan = action.payload.amount
            state.loanPurpose = action.payload.purpose
            state.balance = action.payload.amount + state.balance
        }
    },
        payLoan(state){
            state.balance -= state.loan 
            state.loan = 0
            state.loanPurpose = ''
        }
    }
})
export const {deposit, withdraw, requestLoan, payLoan} = accountSlice.actions
export default accountSlice.reducer
console.log(accountSlice);
// export default function accountReducer(state = initialStateAccount, action){
//     switch(action.type){
//         case 'account/withdraw':
//             return {...state, balance: state.balance - action.payload}
//         case 'account/deposit':
//             // console.log(action.payload);
//             return {...state, balance: state.balance + action.payload}
//         case 'account/requestLoan':
//             if(state.loan > 0) return state;
//             return {...state, loan: action.payload.amount, loanPurpose: action.payload.loanPurpose, balance: action.payload.amount + state.balance}
//         case 'account/payLoan':
//             return {...state, loan: 0, loanPurpose:'', balance: state.balance - state.loan}
//         default: 
//             return state;
//     }
// }

// export function deposit(amount, currency){
//     if(currency === 'USD')
//     return{
//         type: 'account/deposit', payload: amount
//     }
//     //middleware function to change the currency to USD
//     return async function(dispatch, getState){
//         const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
//         const data = await res.json()
//         const converted = data.rates.USD;
//         dispatch({type: 'account/deposit', payload: converted})
//     }
// }

// export function withdraw(amount){
//     return{
//         type: 'account/withdraw', payload: amount
//     }
// }

// export function requestLoan(amount, purpose){
//     return{
//         type: 'account/requestLoan', 
//         payload: {
//             amount: amount, 
//             loanPurpose: purpose
//         }
//     }
// }

// export function payLoan(){
//     return{
//         type: 'account/payLoan'
//     }
// }