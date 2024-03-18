import { MeetingSuggestionState } from '@/types/Meeting'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: MeetingSuggestionState = {
    meetingSuggestions: [],
    loading: true,
    initLoaded: false,
}

export const meetingSuggestionsReducer = createSlice({
    name: 'meetingSuggestions',
    initialState,
    reducers: {
        setMeetingSuggestions: (state, action: PayloadAction<MeetingSuggestionState['meetingSuggestions']>) => {
            state.meetingSuggestions = action.payload
        },
        setLoading: (state, action: PayloadAction<MeetingSuggestionState['loading']>) => {
            state.loading = action.payload
        },
        setInitLoaded: (state, action: PayloadAction<MeetingSuggestionState['initLoaded']>) => {
            state.initLoaded = action.payload
        }
    }
})

export const {
    setMeetingSuggestions,
    setLoading,
    setInitLoaded
} = meetingSuggestionsReducer.actions
export default meetingSuggestionsReducer.reducer