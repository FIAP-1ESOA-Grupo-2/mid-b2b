import { AppState } from '@/types/App'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AppState = {
    leftSidebarOpen: true
}

export const appReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLeftSidebarToggle: (state) => {
            state.leftSidebarOpen = !state.leftSidebarOpen
        },
        setLeftSidebarClose: (state) => {
            state.leftSidebarOpen = false
        }
    }
})

export const {
    setLeftSidebarToggle,
    setLeftSidebarClose
} = appReducer.actions
export default appReducer.reducer