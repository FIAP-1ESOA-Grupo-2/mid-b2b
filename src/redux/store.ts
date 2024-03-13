import { configureStore } from '@reduxjs/toolkit'
import signUpReducer from './reducers/signUpReducer'
import appReducer from './reducers/appReducer'

export const store = configureStore({
    reducer: {
        signUp: signUpReducer,
        app: appReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch