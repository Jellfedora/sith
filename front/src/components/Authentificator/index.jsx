import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_REST_API;

class Authentificator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            validId: null,
            validPassword: null,
            connexionError: false
        };
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        console.log('navigation')
        // this.getServerStatus();
    }

    handleIdChange = (e) => {
        let idTarget = e.target.value;
        this.setState({ id: idTarget });
    }

    handlePasswordChange = (e) => {
        let passwordTarget = e.target.value;
        this.setState({ password: passwordTarget });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.id + '  ' + this.state.password)
        axios.post(apiUrl + 'login', {
            identifiant: this.state.id,
            password: this.state.password
        })
            .then(response => {
                console.log(response)
                const action = { type: "SAVE_USER", value: response.data }
                this.props.dispatch(action)
                // this.setState({ loadSpinner: false, redirectToAccount: true });
            })
            .catch(error => {
                console.log(error)
                this.setState({ connexionError: true });
            });
    }

    render() {
        return (
            <div className="connexion">
                <div className="connexion__content">
                    <h2 className="connexion__content__title">Connexion requise pour accéder à nos différents services</h2>
                    <form className="connexion__content__form">
                        <div className="connexion__content__form__formgroup__id">
                            <label htmlFor="exampleInputId"> Identifiant
                            </label>
                            <input type="text" className="" id="InputId" value={this.state.id} onChange={this.handleIdChange} />
                        </div>
                        <div className="connexion__content__form__formgroup__password">
                            <label htmlFor="exampleInputPassword1">Mot de Passe
                            </label>
                            <input type="password" className="" id="InputPassword" value={this.state.password} onChange={this.handlePasswordChange} />
                        </div>
                        <div className="connexion__content__form__submit">

                            <button className="btn btn-primary" onClick={this.handleSubmit}>
                                Connexion
                            </button>
                        </div>
                        <div className="connexion__content__form__error">
                            {this.state.connexionError &&
                                <p>Identifiants invalides, veuillez réessayer</p>
                            }
                        </div>
                    </form>
                    <p className="connexion__content__message">Si vous avez perdu votre identifiant ou votre mot de passe. Contacter l'administrateur, aucun mot de passe ou identifiant ne sera envoyé par courriel</p>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        // isConnect: state.user.isConnect,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentificator);

