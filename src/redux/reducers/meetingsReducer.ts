import { MeetingState } from '@/types/Meeting'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: MeetingState = {
    meetings: [],
    meetingsClosed: [],
    loading: true,
    loadingClosed: true,
    initLoaded: false,
    initLoadedClosed: false
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
        },
        setMeetingsClosed: (state, action: PayloadAction<MeetingState['meetingsClosed']>) => {
            state.meetingsClosed = action.payload
        },
        setLoadingClosed: (state, action: PayloadAction<MeetingState['loadingClosed']>) => {
            state.loadingClosed = action.payload
        },
        setInitLoadedClosed: (state, action: PayloadAction<MeetingState['initLoadedClosed']>) => {
            state.initLoadedClosed = action.payload
        }
    }
})

export const {
    setMeetings,
    setLoading,
    setInitLoaded,
    setMeetingsClosed,
    setLoadingClosed,
    setInitLoadedClosed
} = meetingsReducer.actions
export default meetingsReducer.reducer