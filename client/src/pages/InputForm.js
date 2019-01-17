import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

class InputForm extends Component {
    
    constructor(props) {
        super(props)
        this.uploadFile = this.uploadFile.bind(this);
    }
    
    uploadFile(event) {
        let file = event.target.files[0];
        console.log(file);
        
        if (file) {
            let traktor = new FormData();
            fetch(traktor)
                .then(response => response.text())
                .then(data => {
                    let parser = new DOMParser();
                    let xml = parser.parseFromString(data, "application/xml");
                    document.getElementById("output").textContent = data;
                    console.log(xml);
                })
        }
    }
    
    render() {
        return <span>
            <input type="file"
            name="myFile"
            onChange={this.uploadFile} />
        </span>
    }
};

export default InputForm;