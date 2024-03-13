"use client"
import { SignOut } from './Signout';
import { PrivacyPolicy } from './PrivacyPolicy';
import { ManageNotifications } from './ManageNotifications';
import { TermsAndConditions } from './TermsAndConditions';
import { Notifications } from './ManageNotifications/Notifications';
import { Terms } from './TermsAndConditions/Terms';
import { Privacy } from './PrivacyPolicy/Privacy';

export const Settings = () => {
    return (
        <section className="flex flex-col bg-white rounded-xl border shadow-sm border-slate-200 p-8 gap-3">
            <h1 className="text-2xl">Configurações</h1>
            <Privacy />
        </section>
    )
}