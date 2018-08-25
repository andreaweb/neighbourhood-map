import React from 'react';
import './App.css';

export class List extends React.Component {
	render(){
		return (
			<div 
			className="filtered-list" 
			role="navigation" 
			/*toggles this list on and off according to menu bars clicking and/or size of screen*/
			style={ this.props.visible ? {display: "flex"}  : {display: "none"}  }>
				{ this.props.places ?
					this.props.places.map(
						(place, key) => (
							<button key={key} 
								className="list-item"
								onClick={(e) => {this.props.centerMarker(key, e)}}
								style={{'flexBasis': '119px', padding: '10px', boxSizing: 'content-box' }}
								id={place.id}
							>
								{place.name}
							</button>
						)
					)
				  : null
				}
			</div>
		)
	}
}