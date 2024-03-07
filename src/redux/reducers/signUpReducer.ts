import { SignUpState } from '@/types/Auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: SignUpState = {
    data: {
        name: '',
        cpf: '',
        phone_number: '',
        email: '',
        password: '',
        sector: '',
        role: '',
        emailVerified: false,
        accountType: 'buyer'
    },
    step: 0
}


export const signUpReducer = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<SignUpState['data']>) => {
            state.data = action.payload
        },
        setStep: (state, action: PayloadAction<SignUpState['step']>) => {
            state.step = action.payload
        },
        goToStep: (state, action: PayloadAction<SignUpState['step']>) => {
            if (
                (action.payload >= 0 && action.payload <= 1 && state.data.accountType) ||
                (action.payload >= 1 && action.payload <= 2 && state.data.name && state.data.cpf && state.data.email && state.data.password) ||
                (action.payload >= 2 && action.payload <= 3 && state.data.emailVerified)
            ) {
                state.step = action.payload
            }
        },
        goToNextStep: (state) => {
            if (
                (state.step == 0 && state.data.accountType) ||
                (state.step == 1 && state.data.name && state.data.cpf && state.data.email && state.data.password) ||
                (state.step == 2 && state.data.emailVerified)
            ) {
                state.step += 1
            }
        },
        goToPreviousStep: (state) => {
            if (state.step > 0) {
                state.step -= 1
            }
        }
    }
})

export const { setData, setStep, goToStep, goToNextStep, goToPreviousStep } = signUpReducer.actions
export default signUpReducer.reducer