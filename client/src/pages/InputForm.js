import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteItem, addItem } from '../actions/itemActions';

class InputForm extends Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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

                console.log("Track Number: " + (i + 1) + " sent to MongoDB");

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
            }
        };
    }
    
    render() {
        return (
            
            <div>

                <h3>Upload the database file for your DJ software. Currently for Traktor only.</h3>

                <form onSubmit={this.handleSubmit}>
                    <input
                        type="file"
                        ref={input => {
                        this.App = input;
                        }}
                    />
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { deleteItem, addItem })(InputForm);