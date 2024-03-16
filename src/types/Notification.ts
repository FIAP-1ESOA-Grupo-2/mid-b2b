export type Notification = {
    id: number,
    type: 'error' | 'info' | 'success' | 'warning',
    title: string,
    message: string,
    userId: number,
    readedAt?: Date
    createdAt: Date
}

export type NotificationState = {
    notifications: Notification[]
    initLoaded: boolean
    drawerOpen: boolean
}