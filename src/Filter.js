import React from 'react';
import './App.css';

export class Filter extends React.Component {

	render(){
		return (
			<div 
				style={{ height: '150px', background: 'black', position: 'absolute', bottom: '0px', width: '100vw',
						 color: 'white',     display: 'flex'}}
			>
			{ this.props.places ?
				this.props.places.map(
					(place, key) => (
						<fieldset key={key}>
							<input type="checkbox" checked onChange={(key) => this.props.togglePlace(key)} key={key} id={key} />
							<label htmlFor={key}> {place.title} </label>
						</fieldset>
					)
				)
			  : null
			}
			</div>
		)
	}
}