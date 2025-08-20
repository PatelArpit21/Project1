import React from 'react';
import { Link } from 'react-router-dom';

const images = [
	{ src: '/images/ximg-tile.jpg.pagespeed.ic.tlV_7G7r4h.jpg', title: 'Aloe Vera Room' },
	{ src: '/images/ximg-tile-1.jpg.pagespeed.ic.jb7yPH-7i0.jpg', title: 'Sanseveria Room' },
	{ src: '/images/ximg-tile-4.jpg.pagespeed.ic.XLPMM7eK3j.jpg', title: 'Lavandula Room' },
	{ src: '/images/ximg-tile-3.jpg.pagespeed.ic.u7USdE2zss.jpg', title: 'Cactus Room' },
	{ src: '/images/ximg-tile-2.jpg.pagespeed.ic.uFpGar_DeQ.jpg', title: 'Guzmania Room' },
	{ src: '/images/ximg-tile-5.jpg.pagespeed.ic.8ky8-UleJE.jpg', title: 'Bonsai Room' },
	{ src: '/images/ximg-tile-6.jpg.pagespeed.ic.gNYYA_Ez9c.jpg', title: 'Dypsis Room' },
	{ src: '/images/ximg-tile-7.jpg.pagespeed.ic.0oN_-g2yBN.jpg', title: 'Lucky Bamboo Room' },
];

const RoomsGrid = () => {
	return (
		<section className="content-room">
			<div className="ll-container">
				<h1 className="title anim-up">Rooms</h1>
				<div className="room-grid">
					{images.map((img) => (
						<Link key={img.title} to="/rooms" className="room-item anim-up d-1" style={{ textDecoration: 'none', color: 'inherit' }}>
							<img src={img.src} alt={img.title} />
							<h5 className="text-effect">City View</h5>
							<h2 className="text-effect" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{img.title}</h2>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default RoomsGrid;


