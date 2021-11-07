import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

class SignupForm extends PureComponent {
    state = {
        username: "",
        email: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    pick = (...selectedArgs) => obj =>  selectedArgs.reduce((acc, attr) => ({...acc, [attr]: obj[attr]}), {})

    fetchNewUser = (user) => {
        const configObj = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
        fetch("http://localhost:3000/users", configObj)
        .then(resp => resp.json())
        .then(json => this.props.addContact(json))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const slicedState = this.pick("username", "email", "password", "id")(this.state)
      
        this.props.addUser({...slicedState})
        this.setState({username: "", email: "", password: "", id: "" })
    }

    render() {
        return (
            <div className="container">
            <h3 className="form-title">Create a new contact</h3>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="username" className="col-md-4 control-label">Username</label>
                                        <div className="col-md-5">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className="col-md-4 control-label">Email</label>
                                        <div className="col-md-5">
                                            <textarea
                                                className="form-control"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="col-md-4 control-label">Password</label>
                                        <div className="col-md-5">
                                            <textarea
                                                className="form-control"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                        <button type="submit" className="btn btn-default">Add</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupForm;

