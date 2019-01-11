import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class InputForm extends Component {

    upload() {
        var collection = new XMLHttpRequest();
        collection.open("Get", "collection.nml", false);
        collection.send();
        var collectionData = collection.responseText;
        document.write(collectionData);
    }
    
    render() {
        return (
            <div>
                <h3> Select a Traktor database file (nml) to upload: </h3>
                <input id="dbUpload" type="file"></input>
                <button onclick="upload()">Upload</button>
            </div>
        );
    };
};

export default InputForm;