import React from 'react';
import './App.css';

export class Filter extends React.Component {
	constructor(props){
		super(props);
		this.state = { query: ''}
	}
	updateInputValue(evt){
		console.log(evt.target)
		this.setState({ query: evt.target.value })
		this.props.updateUserInput(evt.target.value)
	}
	render(){
		return (
			<div>
				<input style={{position: 'absolute', top: '40px', left: 'calc(100% - 174px)'}} type="text" value={this.state.query} 
				onChange={evt => this.updateInputValue(evt)} />
				<ul style={{ background: 'black', position: 'absolute', bottom: '0px', width: '100vw',
							 color: 'white', margin: 0, boxSizing: 'content-box', padding: 0, display: 'flex', 'flexWrap': 'wrap', 'listStyleType': 'none' }}>
					{ this.props.places ?
						this.props.places.map(
							(place, key) => (
								<li key={key} 
									className="applyHover"
									onClick={() => {this.props.centerMarker(key)}}
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
			</div>
		)
	}
}