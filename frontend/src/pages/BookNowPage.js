import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const BookNowPage = () => {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useRevealOnScroll();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/rooms/');
        setRooms(res.data || []);
      } catch (e) {
        setError('Failed to load rooms.');
      }
    })();
  }, []);

  async function submitBooking(e) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await api.post('/bookings/', {
        room: Number(roomId),
        check_in: checkIn,
        check_out: checkOut,
        adults: Number(adults),
        children: Number(children),
        notes,
      });
      setMessage('Booking successful!');
    } catch (e) {
      setError('Booking failed. Please check your inputs or login status.');
    }
  }

  const canSubmit = useMemo(() => roomId && checkIn && checkOut, [roomId, checkIn, checkOut]);

  return (
    <div>
      <Navbar />
      <section className="ll-page">
        <div className="ll-container" style={{ maxWidth: 780 }}>
          <h1 className="title anim-up">Book a Room</h1>
          <form className="ll-card anim-scale" onSubmit={submitBooking}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Room</label>
                <select className="ll-input" value={roomId} onChange={(e)=>setRoomId(e.target.value)} required>
                  <option value="">Select a room</option>
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>{r.room_type} — ${Number(r.rate_per_night).toFixed(2)}/night</option>
                  ))}
                </select>
              </div>
              <div />
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Check-in</label>
                <input className="ll-input" type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Check-out</label>
                <input className="ll-input" type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Adults</label>
                <input className="ll-input" type="number" min="1" value={adults} onChange={(e)=>setAdults(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Children</label>
                <input className="ll-input" type="number" min="0" value={children} onChange={(e)=>setChildren(e.target.value)} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: 6 }}>Notes</label>
                <textarea className="ll-input" rows={4} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Any special requests" />
              </div>
            </div>
            {message && <p style={{ color: '#34d399', marginTop: 12 }}>{message}</p>}
            {error && <p style={{ color: '#f87171', marginTop: 12 }}>{error}</p>}
            <button className="ll-btn" disabled={!canSubmit} style={{ marginTop: 16 }}>Confirm Booking</button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BookNowPage;


