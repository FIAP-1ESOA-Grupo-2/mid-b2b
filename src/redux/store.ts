import { configureStore } from '@reduxjs/toolkit'
import signUpReducer from './reducers/signUpReducer'
import appReducer from './reducers/appReducer'
import interestsReducer from './reducers/interestsReducer'
import notificationsReducer from './reducers/notificationsReducer'
import meetingSuggestionsReducer from './reducers/meetingSuggestionsReducer'

export const store = configureStore({
    reducer: {
        signUp: signUpReducer,
        app: appReducer,
        interests: interestsReducer,
        notifications: notificationsReducer,
        meetingSuggestions: meetingSuggestionsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch