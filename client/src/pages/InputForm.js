import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class InputForm extends Component {

    upload() {
        // var readXml = null;
        // $('#xmlForm').submit(function (event) {
        //     event.preventDefault();
        //     var selectedFile = document.getElementById('input').files[0];
        //     console.log(selectedFile);
        //     var reader = new FileReader();
        //     reader.onload = function (e) {
        //         readXml = e.target.result;
        //         console.log(readXml);
        //         var parser = new DOMParser();
        //         var doc = parser.parseFromString(readXml, "application/xml");
        //         console.log(doc);
        //     }
        //     reader.readAsText(selectedFile);

        // });
    };
    
    render() {
        return (
            <div>
                <form  id="xmlForm" name="xmlForm">
                    <h3> Select a Traktor database file (nml) to upload: </h3>
                    <input id="dbUpload" type="file"/>
                    <input type="submit" onClick="upload()"/>
                </form>
            </div>
        );
    };
};

export default InputForm;