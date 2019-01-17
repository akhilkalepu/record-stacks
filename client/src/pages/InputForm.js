import React, { Component } from 'react';
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
            
            // console.log(xml.querySelector('ENTRY').getAttribute('TITLE'));
            // console.log(xml.getElementsByTagName('ENTRY'));

            console.log(xml);
            console.log(xml.getElementsByTagName('ENTRY').length);
            for (var i = 0; i < xml.getElementsByTagName('ENTRY').length; i++) {
                console.log("----------------------------");
                console.log("Track: " + xml.getElementsByTagName('ENTRY')[i].getAttribute('TITLE'));
                console.log("Artist: " + xml.getElementsByTagName('ENTRY')[i].getAttribute('ARTIST'));
                console.log("Album: " + xml.getElementsByTagName('ENTRY')[i].querySelector('ALBUM').getAttribute("TITLE"));
                console.log("Release: " + xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("RELEASE_DATE"));
                console.log("Added: " + xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("IMPORT_DATE"));
                console.log("Genre: " + xml.getElementsByTagName('ENTRY')[i].querySelector('INFO').getAttribute("GENRE"));
                console.log("Key: " + xml.getElementsByTagName('ENTRY')[i].querySelector('MUSICAL_KEY').getAttribute("VALUE"));
                console.log("Tempo: " + xml.getElementsByTagName('ENTRY')[i].querySelector('TEMPO').getAttribute("BPM"));
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