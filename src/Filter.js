import React from 'react';
import './App.css';

export class Filter extends React.Component {
	render(){
		return (
			<ul style={{ height: '150px', background: 'black', position: 'absolute', bottom: '0px', width: '100vw',
						 color: 'white', margin: 0, padding: 0}}>
				{ this.props.places ?
					this.props.places.map(
						(place, key) => (
							<li key={key} 
								onClick={() => this.props.centerPlace(key)} 
								id={key}
							>
								{place.title}
							</li>
						)
					)
				  : null
				}
			</ul>
		)
	}
}