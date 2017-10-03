import React, {Component} from 'react'
import Geolocation from 'react-geolocation'


export default class Geolocator extends Component {


	render() {
		return (
			<Geolocation
			render={({
				fetchingPosition,
				position: { coords: { latitude, longitude } = {} } = {},
				error,
				getCurrentPosition
			}) =>
				<div>
					<button onClick={getCurrentPosition}>Get Position</button>
					{error &&
						<div>
							{error.message}
						</div>}
					<pre>
						latitude: {latitude}
						longitude: {longitude}
					</pre>
				</div>}
		/>
		)
	}
}
