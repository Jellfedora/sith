import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_REST_API;
const API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;

class MusicsAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    // On file select (from the pop up) 
    onFileChange = event => {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });

    };

    onFileUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );




        // Details of the uploaded file
        const headers = {
            Authorization: `Bearer ${this.props.userToken}`,
            encType: "multipart/form-data",
        };

        axios.post(apiUrl + 'upload-song', formData, { "headers": headers })
            .then(response => {
            })
            .catch(error => {
                console.log(error)
            });
    };

    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {

        return (
            <div className="admin-music">
                <h2>Musique admin</h2>
                <h3>
                    Envoyer une musique (finira dans le dossier Autres)
                </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>
                {this.fileData()}
            </div >
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}
const mapStateToProps = (state) => {
    return {
        userToken: state.user.token
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicsAdmin);

