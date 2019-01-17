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
            console.log(xml);
            console.log(xml.querySelector('ENTRY').getAttribute('TITLE'));

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