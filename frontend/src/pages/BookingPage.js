import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const BookingPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [room, setRoom] = useState(null);
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [adults, setAdults] = useState(1);
	const [children, setChildren] = useState(0);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const res = await api.get(`/rooms/${id}/`);
				setRoom(res.data);
			} catch (e) {
				setError('Failed to load room');
			}
		})();
	}, [id]);

	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);
		setMessage(null);
		try {
			await api.post('/bookings/', {
				room: Number(id),
				check_in: checkIn,
				check_out: checkOut,
				adults: Number(adults),
				children: Number(children),
			});
			setMessage('Booking successful!');
			setTimeout(() => navigate('/profile'), 800);
		} catch (e) {
			setError('Booking failed');
		}
	}

	useRevealOnScroll();
	return (
		<div>
			<Navbar />
			<section className="ll-page">
				<div className="ll-container" style={{ maxWidth: 720 }}>
					<h1 className="title anim-up">Book Room</h1>
					{room && <p className="anim-fade" style={{ color: '#b9c0c4' }}>{room.room_type} — ${Number(room.rate_per_night).toFixed(2)} / night</p>}
					<form onSubmit={handleSubmit} className="ll-card anim-scale" style={{ marginTop: 16 }}>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
							<input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} className="ll-input" required />
							<input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} className="ll-input" required />
						</div>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
							<input type="number" min="1" value={adults} onChange={(e)=>setAdults(e.target.value)} className="ll-input" placeholder="Adults" />
							<input type="number" min="0" value={children} onChange={(e)=>setChildren(e.target.value)} className="ll-input" placeholder="Children" />
						</div>
						{message && <p style={{ color: '#34d399', marginTop: 12 }}>{message}</p>}
						{error && <p style={{ color: '#f87171', marginTop: 12 }}>{error}</p>}
						<button className="ll-btn" style={{ marginTop: 14 }}>Confirm Booking</button>
					</form>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default BookingPage;


