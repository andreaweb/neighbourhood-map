import React from 'react';
import './App.css';

export class Filter extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div 
				style={{ height: '150px', background: 'black', 'z-index': 9999, position: 'absolute', bottom: '0px', width: '100vw',
						 color: 'white',     display: 'flex', 'flex-wrap': 'wrap' }}
			>
			{ this.props.places ?
				this.props.places.map(
					(place, key) => (
						<fieldset>
							<input type="checkbox" key={key} id={key} />
							<label for={key}> {place.title} </label>
						</fieldset>
					)
				)
			  : null
			}
			</div>
		)
	}
}