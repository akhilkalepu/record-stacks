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
                console.log("Track: " + xml.getElementsByTagName('ENTRY')[i].getAttribute('TITLE'));
                var trackVar = xml.getElementsByTagName('ENTRY')[i].getAttribute('TITLE');

                console.log("Artist: " + xml.getElementsByTagName('ENTRY')[i].getAttribute('ARTIST'));
                var artistVar = xml.getElementsByTagName('ENTRY')[i].getAttribute('ARTIST');
                
                if (xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("RELEASE_DATE") == null) {
                    console.log("Release: null");
                    var releaseVar = null;
                } else {
                    console.log("Release: " + xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("RELEASE_DATE"));
                    releaseVar = xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("RELEASE_DATE");
                }

                if (xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("GENRE") == null) {
                    console.log("Genre: null");
                    var genreVar = null;
                } else {
                    console.log("Genre: " + xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("GENRE"));
                    genreVar = xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("GENRE");
                }

                if (xml.getElementsByTagName('ENTRY')[i].querySelector('MUSICAL_KEY') == null) {
                    console.log("Key: null");
                    var keyVar = null;
                } else {
                    if (xml.getElementsByTagName('ENTRY')[i].querySelector('MUSICAL_KEY').getAttribute("VALUE") == null) {
                        console.log("Key: null");
                        keyVar = null;
                    } else {
                        console.log("Key: " + xml.getElementsByTagName('ENTRY')[i].querySelector('MUSICAL_KEY').getAttribute("VALUE"));
                        keyVar = xml.getElementsByTagName('ENTRY')[i].querySelector('MUSICAL_KEY').getAttribute("VALUE");
                    }
                }
                
                if (xml.getElementsByTagName('ENTRY')[i].querySelector('TEMPO') == null) {
                    console.log("Tempo: null");
                    var tempoVar = null;
                } else {
                    if (xml.getElementsByTagName('ENTRY')[i].querySelector('TEMPO').getAttribute("BPM") == null) {
                        console.log("Tempo: null");
                        tempoVar = null;
                    } else {
                        console.log("Tempo: " + xml.getElementsByTagName('ENTRY')[i].querySelector('TEMPO').getAttribute("BPM"));
                        tempoVar = xml.getElementsByTagName('ENTRY')[i].querySelector('TEMPO').getAttribute("BPM");
                    }
                }

                if (xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute('PLAYTIME') == null) {
                    console.log("Time: null");
                    var timeVar = null;
                } else {
                    console.log("Time: " + xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute('PLAYTIME'));
                    timeVar = xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute('PLAYTIME');
                }

                if (xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("IMPORT_DATE") == null) {
                    console.log("Added: null");
                    var addedVar = null;
                } else {
                    console.log("Added: " + xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("IMPORT_DATE"));
                    addedVar = xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("IMPORT_DATE");
                }
                
                console.log("AUDIO_ID: " + xml.getElementsByTagName('ENTRY')[i].getAttribute('AUDIO_ID'));
                var audioidVar = xml.getElementsByTagName('ENTRY')[i].getAttribute('AUDIO_ID');

                console.log("Track Number: " + (i + 1));

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