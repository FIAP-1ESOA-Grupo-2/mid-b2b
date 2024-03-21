export type Meeting = {
    id: number,
    interests: string,
    matchups: number,
    from_user_id: number,
    to_user_id: number,
    date?: Date | null | string,
    local?: string | null,
    closed: boolean
}

export type MeetingState = {
    meetings: Meeting[]
    meetingsClosed: Meeting[]
    loading: boolean
    loadingClosed: boolean
    initLoaded: boolean
    initLoadedClosed: boolean
}

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

export type MeetingMessage = {
    id: number,
    userId: number,
    body: string,
    type: 'text' | 'notification',
    createdAt: number | string
}