import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import axios from 'axios';

class InputForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getUser() {
      axios.get('/user/').then(response => {
        console.log('Get user response: ')
        console.log(response.data)
        if (response.data.user) {
          console.log('Get User: There is a user saved in the server session: ')

          this.setState({
              loggedIn: true,
              loggedOut: false,
              username: response.data.user.username
          })
        } else {
          console.log('Get user: no user');
          this.setState({
              loggedIn: false,
              loggedOut: true,
              username: null
          })
        }
      })
    }

    handleSubmit(event) {
        event.preventDefault();

        const file = this.App.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = (evt) => {
            const readerData = evt.target.result;
            const parser = new DOMParser();
            const xml = parser.parseFromString(readerData, 'text/xml');
            
            console.log(xml);
            console.log(xml.getElementsByTagName('ENTRY').length);

            for (var i = 0; i < xml.getElementsByTagName('ENTRY').length; i++) {

                console.log("----------------------------");
                var trackVar = xml.getElementsByTagName('ENTRY')[i].getAttribute('TITLE');

                var artistVar = xml.getElementsByTagName('ENTRY')[i].getAttribute('ARTIST');
                
                if (xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("RELEASE_DATE") == null) {
                    var releaseVar = null;
                } else {
                    releaseVar = xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("RELEASE_DATE");
                }

                if (xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("GENRE") == null) {
                    var genreVar = null;
                } else {
                    genreVar = xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("GENRE");
                }

                if (xml.getElementsByTagName('ENTRY')[i].querySelector('MUSICAL_KEY') == null) {
                    var keyVar = null;
                } else {
                    if (xml.getElementsByTagName('ENTRY')[i].querySelector('MUSICAL_KEY').getAttribute("VALUE") == null) {
                        keyVar = null;
                    } else {
                        keyVar = xml.getElementsByTagName('ENTRY')[i].querySelector('MUSICAL_KEY').getAttribute("VALUE");
                    }
                }
                
                if (xml.getElementsByTagName('ENTRY')[i].querySelector('TEMPO') == null) {
                    var tempoVar = null;
                } else {
                    if (xml.getElementsByTagName('ENTRY')[i].querySelector('TEMPO').getAttribute("BPM") == null) {
                        tempoVar = null;
                    } else {
                        tempoVar = xml.getElementsByTagName('ENTRY')[i].querySelector('TEMPO').getAttribute("BPM");
                    }
                }

                if (xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute('PLAYTIME') == null) {
                    var timeVar = null;
                } else {
                    timeVar = xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute('PLAYTIME');
                }

                if (xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("IMPORT_DATE") == null) {
                    var addedVar = null;
                } else {
                    addedVar = xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("IMPORT_DATE");
                }
                
                var audioidVar = xml.getElementsByTagName('ENTRY')[i].getAttribute('AUDIO_ID');

                const newItem = {
                    Track: trackVar,
                    Artist: artistVar,
                    Release: releaseVar,
                    Genre: genreVar,
                    Key: keyVar,
                    Tempo: tempoVar,
                    Time: timeVar,
                    Added: addedVar,
                    AUDIO_ID: audioidVar
                }

                // Add item
                this.props.addItem(newItem);
                console.log("Track Number: " + (i + 1) + " sent to MongoDB");
            }
        };
    }
    
    render() {
      
				return (
					<div id="inputForm">

						<h3>Upload the database file from your DJ software</h3>
						<h3 id="inputElement">Currently for Traktor only</h3>

						<form onSubmit={this.handleSubmit}>
							<input
									id="inputElement"
									type="file"
									ref={input => {
									this.App = input;
									}}
							/>
							<button id="inputButton inputElement" type="submit">Submit</button>
						</form>
					</div>
				);
    }
};

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { addItem })(InputForm);