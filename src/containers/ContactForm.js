import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

class ContactForm extends PureComponent {
    state = {
        name: "",
        email: "",
        phone: "",
        user_id: 1
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    pick = (...selectedArgs) => obj =>  selectedArgs.reduce((acc, attr) => ({...acc, [attr]: obj[attr]}), {})

    fetchNewContact = (contact) => {
        const configObj = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        }
        fetch("http://localhost:3000/contacts", configObj)
        .then(resp => resp.json())
        .then(json => this.props.addContact(json))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const slicedState = this.pick("name", "email", "phone", "user_id")(this.state)
      
        this.props.addContact({...slicedState})
        this.setState({name: "", email: "", phone: "", user_id: "" })
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
                                        <label htmlFor="name" className="col-md-4 control-label">Name</label>
                                        <div className="col-md-5">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            value={this.state.name}
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
                                        <label htmlFor="phone" className="col-md-4 control-label">Phone</label>
                                        <div className="col-md-5">
                                            <textarea
                                                className="form-control"
                                                name="phone"
                                                value={this.state.phone}
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

export default ContactForm;

