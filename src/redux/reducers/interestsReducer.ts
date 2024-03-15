import { InterestState } from '@/types/Interest'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: InterestState = {
    interests: [],
    interestsFiltered: [],
    interestsSelected: [],
    interestsUserSelected: [],
    initLoaded: false,
    btnVisible: false
}

export const interestsReducer = createSlice({
    name: 'interests',
    initialState,
    reducers: {
        setInterests: (state, action: PayloadAction<InterestState['interests']>) => {
            state.interests = action.payload
        },
        setInterestsSelected: (state, action: PayloadAction<InterestState['interestsSelected']>) => {
            state.interestsSelected = action.payload
        },
        setInterestsFiltered: (state, action: PayloadAction<InterestState['interestsFiltered']>) => {
            state.interestsFiltered = action.payload
        },
        setInterestsUserSelected: (state, action: PayloadAction<InterestState['interestsUserSelected']>) => {
            state.interestsUserSelected = action.payload
        },
        setInitLoaded: (state, action: PayloadAction<InterestState['initLoaded']>) => {
            state.initLoaded = action.payload
        },
        setBtnVisible: (state, action: PayloadAction<InterestState['btnVisible']>) => {
            state.btnVisible = action.payload
        }
    }
})

export const {
    setInterests,
    setInterestsFiltered,
    setInterestsSelected,
    setInterestsUserSelected,
    setInitLoaded,
    setBtnVisible
} = interestsReducer.actions
export default interestsReducer.reducer