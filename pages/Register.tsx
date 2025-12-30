import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/ui/login-1'; // Reusing the login component for UI consistency

export default function Register() {
    return (
        <div className="relative">
            {/* Overlay to customize the reused component */}
            <div className="absolute top-4 right-4 z-[9999]">
                <Link to="/login" className="text-white bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all">Back to Login</Link>
            </div>
            <Page />
            <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 pointer-events-none">
                <div className="p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl text-center pointer-events-auto">
                    <h2 className="text-2xl font-bold text-white mb-4">Registration</h2>
                    <p className="text-slate-400 mb-6">Registration is currently invite-only.</p>
                    <Link to="/login" className="px-6 py-3 bg-[var(--color-border)] text-white rounded-lg hover:bg-white/10 transition-all">Go to Login</Link>
                </div>
            </div>
        </div>
    );
}
