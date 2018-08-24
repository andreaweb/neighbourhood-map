import React from 'react';
import './App.css';

export class Filter extends React.Component {
	constructor(props){
		super(props);
		this.state = { query: ''}
	}
	render(){
		return (
			<div className="menu-list" style={ this.props.visible ? {display: "flex"}  : {display: "none"}  }>
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