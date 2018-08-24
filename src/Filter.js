import React from 'react';
import './App.css';

export class Filter extends React.Component {
	constructor(props){
		super(props);
		this.state = { query: ''}
	}
	render(){
		return (
			<div>
				<ul style={{ background: 'black', position: 'absolute', width: 'calc(143px * 2)', height: '100vh', display: 'flex', 'flexWrap': 'wrap',
							 color: 'white', margin: 0, boxSizing: 'content-box',  padding: 0,  'listStyleType': 'none', left: 'calc(100% - 286px)' }}>
					{ this.props.places ?
						this.props.places.map(
							(place, key) => (
								<li key={key} 
									className="applyHover"
									onClick={(e) => {this.props.centerMarker(key, e)}}
									style={{'flexBasis': '119px', padding: '10px', boxSizing: 'content-box' }}
									id={key}
								>
									{place.name}
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