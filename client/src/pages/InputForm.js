import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

class InputForm extends Component {

    state = {
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState = ({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        axios.post("")
    }

    render() {

        return (
            <div className="App">
                <input type="file" onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
            
        );
    };
};

export default InputForm;