import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
	const { authState } = useAuth();
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const res = await api.get('/bookings/');
				setBookings(res.data || []);
			} catch (e) {
				setError('Failed to load bookings');
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<div>
			<Navbar />
			<section className="pt-24 pb-16 min-h-screen">
				<div className="ll-container">
					<div className="profile-header ll-card anim-scale" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
						<div className="profile-avatar" aria-hidden>{(authState.user?.email && authState.user.email.charAt(0).toUpperCase()) || 'A'}</div>
						<div>
							<h1 className="text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif", margin: 0 }}>{authState.user?.email?.split('@')[0]}</h1>
							<p className="text-muted">{authState.user?.email}</p>
							<div className="mt-2">
								<span className="ll-btn">Bookings: {bookings.length}</span>
							</div>
						</div>
					</div>
					<h2 className="mt-8 text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>My Bookings</h2>
					{loading && <p>Loading...</p>}
					{error && <p className="form-error">{error}</p>}
					<div className="mt-4 grid grid-cols-1 gap-4">
						{bookings.map((b) => (
							<div key={b.id} className="booking-item ll-card">
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<div>
										<p className="font-medium">{b.room_type || `Room #${b.room}`}</p>
										<p className="text-muted">{b.check_in} → {b.check_out} — <span className="status">{b.status}</span></p>
									</div>
									<div className="text-right">
										<p className="text-purple-300 font-bold">${Number(b.total_amount || 0).toFixed(2)}</p>
										<Link to={`/book/${b.room}`} className="ll-btn">View</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default ProfilePage;


