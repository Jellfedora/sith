import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_REST_API;

class Administration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            role: 1,
            validId: null,
            validPassword: null,
            connexionError: false
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

    handleRoleChange = (e) => {
        let roleTarget = e.target.value;
        this.setState({ role: roleTarget });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.id + '  ' + this.state.password + '  ' + this.state.role)
        axios.post(apiUrl + 'register', {
            identifiant: this.state.id,
            password: this.state.password,
            role: this.state.role
        })
            .then(response => {
                console.log(response)
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
                    <h2 className="connexion__content__title">Ajouter utilisateur</h2>
                    <form className="connexion__content__form">
                        <div className="connexion__content__form__formgroup__id">
                            <label htmlFor="exampleInputId"> Identifiant
                            </label>
                            <input type="text" className="" id="InputId" value={this.state.id} onChange={this.handleIdChange} />
                        </div>
                        <div className="connexion__content__form__formgroup__password">
                            <label htmlFor="exampleInputPassword1">Mot de Passe
                            </label>
                            <input type="text" className="" id="InputPassword" value={this.state.password} onChange={this.handlePasswordChange} />
                        </div>
                        <div className="connexion__content__form__formgroup__password">
                            <label htmlFor="exampleInputPassword1">Role
                            </label>
                            <input type="number" className="" id="InputPassword" value={this.state.role} onChange={this.handleRoleChange} />
                        </div>
                        <div className="connexion__content__form__submit">

                            <button className="btn btn-primary" onClick={this.handleSubmit}>
                                Valider
                            </button>
                        </div>
                        <div className="connexion__content__form__error">
                            {this.state.connexionError &&
                                <p>Identifiants invalides, veuillez réessayer</p>
                            }
                        </div>
                    </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(Administration);

