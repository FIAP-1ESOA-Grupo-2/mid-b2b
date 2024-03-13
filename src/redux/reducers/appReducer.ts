import { AppState } from '@/types/App'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: AppState = {
    leftSidebarOpenDesktop: true,
    leftSidebarOpenMobile: false,
    deviceWidth: 0
}

export const appReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLeftSidebarDesktopToggle: (state) => {
            state.leftSidebarOpenDesktop = !state.leftSidebarOpenDesktop
        },
        setLeftSidebarMobileToggle: (state) => {
            state.leftSidebarOpenMobile = !state.leftSidebarOpenMobile
        },
        setDeviceWidth: (state, action: PayloadAction<AppState['deviceWidth']>) => {
            state.deviceWidth = action.payload
        }
    }
})

export const {
    setLeftSidebarDesktopToggle,
    setLeftSidebarMobileToggle,
    setDeviceWidth
} = appReducer.actions
export default appReducer.reducer