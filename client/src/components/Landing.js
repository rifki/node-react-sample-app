import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div>
			<div className="center-align">
				<h3>Emaily App!</h3>
				<p>Collect feedback from your users.</p>
				<Link to="/surveys">
					Create or Listing Survey!
				</Link>
			</div>
		</div>
	);
}

export default Landing;
