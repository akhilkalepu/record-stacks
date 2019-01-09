import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class InputForm extends Component {
    render() {
        return (
            <div>
                <h3> Select a Traktor database file (nml) to upload: </h3>
                <input id="dbUpload" type="file"></input>
                <button onclick="upload()">Upload</button>
            </div>
        );
    }
}

export default InputForm;