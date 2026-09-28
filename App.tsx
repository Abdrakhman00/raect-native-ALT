import React, { useState } from 'react';
import Login from './src/components/Login';
import ForgetPassword from './src/components/ForgetPassword';
import VerifyCode from './src/components/VerifyCode';
import ResetPassword from './src/components/ResetPassword';
import Register from './src/components/Register';
import SelectCity from './src/components/SelectCity';

type Page = 'login' | 'forget' | 'verify' | 'reset' | 'register' | 'city';

export default function App() {
  const [page, setPage] = useState<Page>('login');
  const [phone, setPhone] = useState('');

  switch (page) {
    case 'forget':
      return (
        <ForgetPassword
          onBack={() => setPage('login')}
          onNext={(p) => {
            setPhone(p);
            setPage('verify');
          }}
        />
      );
    case 'verify':
      return (
        <VerifyCode
          phone={phone}
          onBack={() => setPage('forget')}
          onNext={() => setPage('reset')}
        />
      );
    case 'reset':
      return (
        <ResetPassword
          onBack={() => setPage('verify')}
          onDone={() => setPage('login')}
        />
      );
    case 'register':
      return (
        <Register
          onBack={() => setPage('login')}
          onLogin={() => setPage('login')}
          onSubmit={() => setPage('city')}
        />
      );
    case 'city':
      return (
        <SelectCity
          onBack={() => setPage('register')}
          onDone={(city) => console.log('Таңдалған қала:', city)}
        />
      );
    default:
      return (
        <Login
          onForgot={() => setPage('forget')}
          onRegister={() => setPage('register')}
        />
      );
  }
}