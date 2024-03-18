export type MeetingSuggestion = {
    id: number,
    from_user_id: number,
    to_user_id: number,
    interests: string,
    matchups: number,
    from_user_accepted: boolean,
    to_user_accepted: boolean,
    createdAt: Date
}

export type MeetingSuggestionState = {
    meetingSuggestions: MeetingSuggestion[]
    loading: boolean
    initLoaded: boolean
}