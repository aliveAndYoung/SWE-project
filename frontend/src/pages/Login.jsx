import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';

const initialRegisterData = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  location: '',
  ssn: '',
  dob: '',
};

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [registerStep, setRegisterStep] = useState(0);
  const [registerData, setRegisterData] = useState(initialRegisterData);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/account', { replace: true });
    } else {
      setLoginError('Invalid credentials');
    }
  }

  function handleRegisterStep(e) {
    e.preventDefault();
    setRegisterError('');
    const form = e.target;
    if (registerStep === 0) {
      const email = form.email.value;
      const password = form.password.value;
      const confirmPassword = form.confirmPassword.value;
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setRegisterError('Invalid email format');
        return;
      }
      if (password.length < 6) {
        setRegisterError('Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        setRegisterError('Passwords do not match');
        return;
      }
      setRegisterData(d => ({ ...d, email, password, confirmPassword }));
      setRegisterStep(1);
    } else if (registerStep === 1) {
      const firstName = form.firstName.value;
      const lastName = form.lastName.value;
      const location = form.location.value;
      if (!firstName || !lastName) {
        setRegisterError('First and last name are required');
        return;
      }
      setRegisterData(d => ({ ...d, firstName, lastName, location }));
      setRegisterStep(2);
    } else if (registerStep === 2) {
      const ssn = form.ssn.value;
      const dob = form.dob.value;
      setRegisterData(d => ({ ...d, ssn, dob }));
      setRegisterStep(3);
    } else if (registerStep === 3) {
      localStorage.setItem('user', JSON.stringify(registerData));
      navigate('/account', { replace: true });
    }
  }

  function renderLoginForm() {
    return (
      <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
        <div className="relative">
          <input name="email" type="email" required className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent" placeholder="Email" />
          <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">Email</label>
        </div>
        <div className="relative">
          <input name="password" type="password" required className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent" placeholder="Password" />
          <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">Password</label>
        </div>
        {loginError && <div className="text-red-500 text-sm text-center">{loginError}</div>}
        <button type="submit" className="rounded-full px-6 py-2 font-bold text-white bg-gradient-to-r from-blue-900 to-zinc-900 shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none">Sign In</button>
      </form>
    );
  }

  function renderRegisterForm() {
    return (
      <form className="w-full flex flex-col gap-6 animate-fadein" onSubmit={handleRegisterStep}>
        {registerStep === 0 && (
          <>
            <div className="relative">
              <input name="email" type="email" required className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent" placeholder="Email" defaultValue={registerData.email} />
              <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">Email</label>
            </div>
            <div className="relative">
              <input name="password" type="password" required className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent" placeholder="Password" defaultValue={registerData.password} />
              <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">Password</label>
            </div>
            <div className="relative">
              <input name="confirmPassword" type="password" required className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent" placeholder="Confirm Password" defaultValue={registerData.confirmPassword} />
              <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">Confirm Password</label>
            </div>
          </>
        )}
        {registerStep === 1 && (
          <>
            <div className="relative">
              <input name="firstName" type="text" required className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent" placeholder="First Name" defaultValue={registerData.firstName} />
              <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">First Name</label>
            </div>
            <div className="relative">
              <input name="lastName" type="text" required className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent" placeholder="Last Name" defaultValue={registerData.lastName} />
              <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">Last Name</label>
            </div>
            <div className="relative">
              <input name="location" type="text" className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent" placeholder="Location (optional)" defaultValue={registerData.location} />
              <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">Location (optional)</label>
            </div>
          </>
        )}
        {registerStep === 2 && (
          <>
            <div className="relative">
              <input name="ssn" type="text" className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent" placeholder="SSN (optional)" defaultValue={registerData.ssn} />
              <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">SSN (optional)</label>
            </div>
            <div className="relative">
              <input name="dob" type="date" className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent" placeholder="Date of Birth (optional)" defaultValue={registerData.dob} />
              <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">Date of Birth (optional)</label>
            </div>
          </>
        )}
        {registerStep === 3 && (
          <div className="text-blue-200 text-center space-y-2">
            <div className="text-lg font-bold mb-2">Review your info</div>
            <div>Email: {registerData.email}</div>
            <div>Name: {registerData.firstName} {registerData.lastName}</div>
            <div>Location: {registerData.location || <span className="text-zinc-400">(not set)</span>}</div>
            <div>SSN: {registerData.ssn || <span className="text-zinc-400">(not set)</span>}</div>
            <div>Date of Birth: {registerData.dob || <span className="text-zinc-400">(not set)</span>}</div>
          </div>
        )}
        {registerError && <div className="text-red-500 text-sm text-center">{registerError}</div>}
        <div className="flex gap-4 justify-between">
          {registerStep > 0 && registerStep < 3 && (
            <button type="button" onClick={() => setRegisterStep(s => s - 1)} className="rounded-full px-4 py-2 bg-blue-900 text-blue-100 font-semibold hover:bg-blue-800 transition">Back</button>
          )}
          <button type="submit" className="rounded-full px-6 py-2 font-bold text-white bg-gradient-to-r from-blue-900 to-zinc-900 shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none">
            <span className="relative z-10">{registerStep === 3 ? 'Sign Up' : 'Next'}</span>
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row items-stretch justify-center bg-zinc-950 p-2 sm:p-8 relative overflow-hidden">
      {/* Background image and overlay */}
      <img
        src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1500&q=80"
        alt="Login background"
        className="fixed inset-0 w-full h-full object-cover z-0 m-0 p-0"
      />
      <div className="fixed inset-0 bg-black/80 z-0 m-0 p-0" />
      {/* Left Panel */}
      <div className="hidden sm:flex flex-col justify-center items-center w-1/2 bg-gradient-to-b from-blue-900 to-zinc-900 relative rounded-r-3xl shadow-2xl overflow-hidden m-2 z-10">
        <div className="flex flex-col items-center gap-4 px-8">
          <div className="bg-zinc-900 rounded-full p-4 shadow-lg mb-2">
            <FaRocket className="text-blue-300 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-blue-100">Welcome to SkyWay</h2>
          <p className="text-blue-200/80 text-center max-w-xs">Book your next adventure with ease. Discover amazing destinations and exclusive deals!</p>
        </div>
        {/* Wave SVG */}
        <svg className="absolute right-0 top-0 h-full w-24 text-zinc-950" viewBox="0 0 100 800" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 Q100,400 0,800 Z" fill="currentColor" /></svg>
      </div>
      {/* Right Panel (Form) */}
      <div className="flex-1 flex flex-col justify-center items-center bg-zinc-900 rounded-3xl shadow-2xl p-4 sm:p-8 min-h-[80vh] max-w-md m-2 z-10 border-2 border-zinc-800">
        <div className="w-full max-w-sm">
          <div className="flex gap-4 mb-6 justify-center">
            <button
              className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${mode === 'login' ? 'bg-gradient-to-r from-blue-900 to-zinc-900 text-white shadow-lg scale-105' : 'bg-zinc-800 text-blue-200 hover:bg-zinc-700'}`}
              onClick={() => { setMode('login'); setRegisterStep(0); setRegisterError(''); }}
            >
              Sign In
            </button>
            <button
              className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${mode === 'register' ? 'bg-gradient-to-r from-blue-900 to-zinc-900 text-white shadow-lg scale-105' : 'bg-zinc-800 text-blue-200 hover:bg-zinc-700'}`}
              onClick={() => { setMode('register'); setRegisterStep(0); setRegisterError(''); }}
            >
              Sign Up
            </button>
          </div>
          {mode === 'login' ? renderLoginForm() : renderRegisterForm()}
        </div>
      </div>
      {/* Mobile Welcome Panel */}
      <div className="sm:hidden flex flex-col items-center justify-center w-full bg-gradient-to-b from-blue-900 to-zinc-900 py-8 rounded-3xl m-2 z-10">
        <div className="bg-zinc-900 rounded-full p-4 shadow-lg mb-2">
          <FaRocket className="text-blue-300 text-3xl" />
        </div>
        <h2 className="text-xl font-bold text-blue-100">Welcome to SkyWay</h2>
        <p className="text-blue-200/80 text-center max-w-xs text-sm">Book your next adventure with ease. Discover amazing destinations and exclusive deals!</p>
      </div>
      <style>{`
        .animate-fadein {
          animation: fadein 0.5s;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
} 