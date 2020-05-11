import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const apiUrl = process.env.REACT_APP_REST_API;

class Authentificator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            validId: null,
            validPassword: null,
            connexionError: false,
            passwordHidden: true,
            startSpinner: false
        };
    }

    componentDidMount() {
    }

    componentDidUpdate() {
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
        this.setState({ startSpinner: true });
        axios.post(apiUrl + 'login', {
            identifiant: this.state.id,
            password: this.state.password
        })
            .then(response => {
                console.log(response)
                const action = { type: "SAVE_USER", value: response.data }
                this.props.dispatch(action)
                this.setState({ startSpinner: false });
                // this.setState({ loadSpinner: false, redirectToAccount: true });
            })
            .catch(error => {
                console.log(error)
                this.setState({ connexionError: true, startSpinner: false });
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
                            <input type="text" id="InputId" value={this.state.id} onChange={this.handleIdChange} />
                        </div>
                        <div className="connexion__content__form__formgroup__password">
                            <label htmlFor="exampleInputPassword1">Mot de Passe
                            </label>
                            <div className="connexion__content__form__formgroup__password__content">
                                <input type={this.state.passwordHidden ? "password" : "text"} className="" value={this.state.password} onChange={this.handlePasswordChange} />
                                {this.state.passwordHidden
                                    ?
                                    <span className="connexion__content__form__formgroup__password__content__toggle" onClick={() => this.setState({ passwordHidden: false })}><FontAwesomeIcon icon="eye" size="1x" /></span>
                                    :
                                    <span className="connexion__content__form__formgroup__password__content__toggle" onClick={() => this.setState({ passwordHidden: true })}><FontAwesomeIcon icon="eye-slash" size="1x" /></span>
                                }
                            </div>
                        </div>
                        <div className="connexion__content__form__submit">

                            <button className="connexion__content__form__submit__button" onClick={this.handleSubmit}>
                                {!this.state.startSpinner
                                    ? <span>
                                        Connexion
                                    </span>

                                    : <FontAwesomeIcon
                                        icon="spinner"
                                        spin
                                        size="1x"
                                    />
                                }
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
    return {
        // isConnect: state.user.isConnect,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentificator);

