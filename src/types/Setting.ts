export type SettingTypes = 'notify_scheduled_meetings_web' | 'notify_scheduled_meetings_email' | 'unread_notification_indicator'
export type SettingValueTypes = 'true' | 'false'

export type Setting = {
    id: number
    setting: SettingTypes
    value: SettingValueTypes
}