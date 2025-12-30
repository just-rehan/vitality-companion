import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';

export default function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/dashboard');
  };

  return <LandingPage onStart={handleStart} />;
}


