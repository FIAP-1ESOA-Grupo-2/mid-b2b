import { NotificationState } from '@/types/Notification'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: NotificationState = {
    notifications: [],
    initLoaded: false,
    drawerOpen: false
}

export const notificationsReducer = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<NotificationState['notifications']>) => {
            state.notifications = action.payload
        },
        setNewNotification: (state, action: PayloadAction<NotificationState['notifications']>) => {
            state.notifications = [...state.notifications, ...action.payload]
        },
        setInitLoaded: (state, action: PayloadAction<NotificationState['initLoaded']>) => {
            state.initLoaded = action.payload
        },
        setDrawerOpen: (state, action: PayloadAction<NotificationState['drawerOpen']>) => {
            state.drawerOpen = action.payload
        }
    }
})

export const {
    setNotifications,
    setNewNotification,
    setInitLoaded,
    setDrawerOpen
} = notificationsReducer.actions
export default notificationsReducer.reducer