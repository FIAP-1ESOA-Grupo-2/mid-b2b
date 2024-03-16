import { configureStore } from '@reduxjs/toolkit'
import signUpReducer from './reducers/signUpReducer'
import appReducer from './reducers/appReducer'
import interestsReducer from './reducers/interestsReducer'
import notificationsReducer from './reducers/notificationsReducer'

export const store = configureStore({
    reducer: {
        signUp: signUpReducer,
        app: appReducer,
        interests: interestsReducer,
        notifications: notificationsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch