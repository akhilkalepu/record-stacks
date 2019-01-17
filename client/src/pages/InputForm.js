import React, { Component } from 'react';
import API from "../utils/API";
import { Link } from 'react-router-dom';

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
                console.log("Artist: " + xml.getElementsByTagName('ENTRY')[i].getAttribute('ARTIST'));
                console.log("Album: " + xml.getElementsByTagName('ENTRY')[i].querySelector('ALBUM').getAttribute("TITLE"));
                console.log("Release: " + xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("RELEASE_DATE"));
                console.log("Genre: " + xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("GENRE"));
                console.log("Key: " + xml.getElementsByTagName('ENTRY')[i].querySelector('MUSICAL_KEY').getAttribute("VALUE"));
                console.log("Tempo: " + xml.getElementsByTagName('ENTRY')[i].querySelector('TEMPO').getAttribute("BPM"));
                console.log("Time: " + xml.getElementsByTagName('INFO')[i].getAttribute('PLAYTIME_FLOAT'));
                console.log("Added: " + xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("IMPORT_DATE"));
                console.log("AUDIO_ID: " + xml.getElementsByTagName('ENTRY')[i].getAttribute('AUDIO_ID'));

                API.saveTracks({
                    Track: xml.getElementsByTagName('ENTRY')[i].getAttribute('TITLE'),
                    Artist: xml.getElementsByTagName('ENTRY')[i].getAttribute('ARTIST'),
                    Album: xml.getElementsByTagName('ENTRY')[i].querySelector('ALBUM').getAttribute("TITLE"),
                    Release: xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("RELEASE_DATE"),
                    Genre: xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("GENRE"),
                    Key: xml.getElementsByTagName('ENTRY')[i].querySelector('MUSICAL_KEY').getAttribute("VALUE"),
                    Tempo: xml.getElementsByTagName('ENTRY')[i].querySelector('TEMPO').getAttribute("BPM"),
                    Time: xml.getElementsByTagName('INFO')[i].getAttribute('PLAYTIME_FLOAT'),
                    Added: xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("IMPORT_DATE"),
                    AUDIO_ID: xml.getElementsByTagName('ENTRY')[i].getAttribute('AUDIO_ID')
                })
                    .then(console.log("track saved"))
                    .catch(err => console.log(err));
            }
        };
    }
    
    render() {
        return (
            
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Upload file:
                    <input
                        type="file"
                        ref={input => {
                        this.App = input;
                        }}
                    />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
};

export default InputForm;