import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiPost, apiPut } from '../util/api';

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { flightId } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cw, setCW] = useState('');

  useEffect(() => {
    if (!flightId) {
      navigate('/search-flights');
    }
  }, [flightId, navigate]);

  async function handleMockPayment(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      // Save visa info to user profile first
      await apiPut('/api/auth/updatedetails', {
        visaCardNumber: cardNumber,
        visaExpiry: expiry,
        visaCW: cw
      }, token);
      // Simulate payment process and generate a mock paymentId
      const paymentId = 'mock_' + Math.random().toString(36).substring(2, 15);
      // Call backend to create booking
      const res = await apiPost('/api/bookings', { flightId, paymentId }, token);
      if (res.success && res.data) {
        setSuccess(true);
        setBookingId(res.data._id);
      } else {
        setError(res.error || 'Booking failed');
      }
    } catch {
      setError('Booking failed');
    }
    setLoading(false);
  }

  if (!flightId) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
      <div className="bg-zinc-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border-2 border-zinc-800 mt-24">
        <h2 className="text-2xl font-bold mb-4 text-center">Book Your Flight</h2>
        {success ? (
          <div className="text-green-400 text-center">
            <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
            <p className="mb-2">Your booking has been confirmed and saved to your account.</p>
            <p>Booking ID: <span className="font-mono">{bookingId}</span></p>
            <button onClick={() => navigate('/account')} className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-900 to-purple-900 text-white font-bold shadow hover:scale-105 transition">Go to Account</button>
          </div>
        ) : (
          <form onSubmit={handleMockPayment} className="flex flex-col gap-4">
            <div className="text-center text-blue-200 mb-2">Enter your Visa card details to pay and book your ticket. (This is a mock payment, no real charge will occur.)</div>
            <label className="text-blue-200 font-semibold">Card Number
              <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" required pattern="\d{16}" maxLength={16} placeholder="1234 5678 9012 3456" />
            </label>
            <div className="flex gap-2">
              <label className="text-blue-200 font-semibold flex-1">Expiry
                <input type="text" value={expiry} onChange={e => setExpiry(e.target.value)} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" required placeholder="MM/YY" maxLength={5} />
              </label>
              <label className="text-blue-200 font-semibold flex-1">CW
                <input type="text" value={cw} onChange={e => setCW(e.target.value)} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" required pattern="\d{3}" maxLength={3} placeholder="123" />
              </label>
            </div>
            <div className="bg-zinc-800 rounded p-4 text-blue-100 text-center">
              <div className="mb-2 font-bold">Payment Summary</div>
              <div>Flight ID: <span className="font-mono">{flightId}</span></div>
              <div>Card: **** **** **** {cardNumber.slice(-4)}</div>
              <div>Amount: $ (see flight details)</div>
            </div>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-900 to-purple-900 text-white font-bold shadow hover:scale-105 transition disabled:opacity-50">
              {loading ? 'Processing...' : 'Pay & Book Now'}
            </button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
} 