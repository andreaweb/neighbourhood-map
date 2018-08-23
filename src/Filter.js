import React from 'react';
import './App.css';

export class Filter extends React.Component {

	render(){
		return (
			<div 
				style={{ height: '150px', background: 'black', position: 'absolute', bottom: '0px', width: '100vw',
						 color: 'white',     display: 'flex'}}
			>
			<ul>
			{ this.props.places ?
				this.props.places.map(
					(place, key) => (
							<li key={key} onClick={(key) => this.props.togglePlace(key)} key={key} id={key}>
							{place.title}
							</li>
					)
				)
			  : null
			}
			</ul>
			</div>
		)
	}
}