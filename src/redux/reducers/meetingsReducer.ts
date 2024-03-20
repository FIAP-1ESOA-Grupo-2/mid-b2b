import { MeetingState } from '@/types/Meeting'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: MeetingState = {
    meetings: [],
    loading: true,
    initLoaded: false,
}

export const meetingsReducer = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        setMeetings: (state, action: PayloadAction<MeetingState['meetings']>) => {
            state.meetings = action.payload
        },
        setLoading: (state, action: PayloadAction<MeetingState['loading']>) => {
            state.loading = action.payload
        },
        setInitLoaded: (state, action: PayloadAction<MeetingState['initLoaded']>) => {
            state.initLoaded = action.payload
        }
    }
})

export const {
    setMeetings,
    setLoading,
    setInitLoaded
} = meetingsReducer.actions
export default meetingsReducer.reducer