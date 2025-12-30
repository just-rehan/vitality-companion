import React, { useState } from 'react';
import Page from '../components/ui/login-1';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            alert('Login failed. Please enter a valid email.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Page
            onLogin={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isSubmitting}
        />
    );
}
