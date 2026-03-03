import { memo, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundGradient from '../components/layout/BackgroundGradient';
import LeftSideContent from '../components/marketing/LeftSideContent';
import SignUpForm from '../components/auth/SignUpForm';

const Login = memo(() => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    terms: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      <BackgroundGradient />
      <LeftSideContent />
      <SignUpForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
});

Login.displayName = 'Login';

export default Login;
