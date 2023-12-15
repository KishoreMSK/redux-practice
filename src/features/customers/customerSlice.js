import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    fullName: '',
    nationalId: ''
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers:{
        createCustomer:{
            prepare(fullName, nationalId){
                return{
                    payload: {fullName, nationalId}
                }
            },
            reducer(state, action){
                state.fullName = action.payload.fullName
                state.nationalId = action.payload.nationalId
            }
            
        },
        updateName(state, action){
            state.fullName = action.payload.fullName
        }
    }
})

export const {createCustomer, updateName} = customerSlice.actions
export default customerSlice.reducer
console.log(customerSlice);

// export default function customerReducer(state = initialStateCustomer, action){
//     switch(action.type){
//         case 'customer/createCustomer':
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 nationalId: action.payload.nationalId
//             }
//         case 'customer/updateName':
//             return{
//                 ...state,
//                 fullname: action.payload
//             }
//         default:
//             return state
//     }
// }

// export function createCustomer(fullName, nationalId){
//     return{
//         type:'customer/createCustomer',
//         payload: {fullName, nationalId}
//     }
// }

// export function updateName(fullname){
//     return{
//         type:'customer/updateName',
//         payload: fullname
//     }
// }