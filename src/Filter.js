import React from 'react';
import './App.css';

export class Filter extends React.Component {
	render(){
		return (
			<ul style={{ background: 'black', position: 'absolute', bottom: '0px', width: '100vw',
						 color: 'white', margin: 0, boxSizing: 'content-box', padding: 0, display: 'flex', 'flexWrap': 'wrap', 'listStyleType': 'none' }}>
				{ this.props.places ?
					this.props.places.map(
						(place, key) => (
							<li key={key} 
								className="applyHover"
								onClick={() => this.props.centerPlace(key)} 
								onHover={{}}
								style={{'flexBasis': '115px', padding: '10px', boxSizing: 'content-box' }}
								id={key}
							>
								{place.name}
							</li>
						)
					)
				  : null
				}
			</ul>
		)
	}
}