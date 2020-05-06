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
            connexionError: false,
            users: [],
            selectUserToDelete: undefined,
            userDeleteMessage: false,
            userDeleteColor: undefined
        };
    }

    componentDidMount() {
        this.getUsers();
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

    getUsers = () => {
        axios.get(apiUrl + 'get-all-users'
        )
            .then(response => {
                console.log(response)
                this.setState({ users: response.data });
            })
            .catch(error => {
            });
    }

    selectUserToDelete = (event) => {
        this.setState({ selectUserToDelete: event.target.value });
    }

    handleSubmitDeleteUser = (event) => {
        event.preventDefault();
        axios.delete(apiUrl + 'delete/' + this.state.selectUserToDelete)
            .then(response => {
                console.log(response)
                this.setState({ userDeleteMessage: response.data, userDeleteColor: 'green' });
            })
            .catch(error => {
                console.log(error)
                this.setState({ userDeleteMessage: 'Une erreur est arrivée', userDeleteColor: 'red' });
            });
    }

    render() {
        const usersName = this.state.users.map((item, i) => {
            return (
                // <Link className="video__content__video-info" to={'/video-detail/' + item.title} key={i}>
                //     < img src={item.poster_path} alt="film-photo" className="video__content__video-info__img" />
                //     <div className="video__content__video-info__text">
                //         <span className="video__content__video-info__text__title">{item.title}</span>
                //         <p className="video__content__video-info__text__overview">{item.overview.substr(0, 250)}</p>
                //         <span className="video__content__video-info__text__vote">Note Tmdb: {item.vote_average} / 10</span>
                //     </div>
                // </Link >
                <option value={item.name} key={i}>{item.name}</option>
            );
        });
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
                <hr />
                <div className="connexion__content">
                    <h2 className="connexion__content__title">Supprimer utilisateur</h2>
                    <form className="connexion__content__form">
                        <div className="connexion__content__form__formgroup__id">
                            <label htmlFor="exampleInputId"> Identifiant
                            </label>
                            <select name="users"
                                style={{
                                    width: '100%',
                                    height: '2em'
                                }}
                                onChange={this.selectUserToDelete} value={this.state.selectUserToDelete}>
                                {usersName}
                            </select>
                        </div>
                        <div className="connexion__content__form__submit">

                            <button className="btn btn-primary" onClick={this.handleSubmitDeleteUser}>
                                Valider
                            </button>
                        </div>
                        <div className="connexion__content__form__error">
                            {this.state.userDeleteMessage &&
                                <p style={{ color: this.state.userDeleteColor }}>{this.state.userDeleteMessage}</p>
                            }
                        </div>
                    </form>
                </div>
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
    console.log(state);
    return {
        // isConnect: state.user.isConnect,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Administration);

