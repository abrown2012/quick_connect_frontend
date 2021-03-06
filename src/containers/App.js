 
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactsList from '../components/ContactsList';
import ContactItem from '../components/ContactItem';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';
import ErrorPage from '../components/ErrorPage'
import ContactForm from './ContactForm';
import SignupForm from './SignupForm';
import {connect} from "react-redux";
import axios from 'axios'



// import LoadingIndicator from '../components/LoadingIndicator';
import {fetchContacts, addContact, addUser, fetchUsers, removeContact} from "../actions/index"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  };

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})    
    .then(response => {
    if (response.data.logged_in) {
      this.handleLogin(response)
    } else {
      this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  };


  componentDidMount() {
    this.props.fetchContacts()
    this.loginStatus()
  }

  render() {
    // if (!!this.props.loading) {
    //   return <LoadingIndicator/>
    // }

    // if (!!this.props.error) {
    //   return <ErrorPage error={this.props.error} />
    // }

    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/about" component={About} /> 
            <Route exact path="/contacts" render={routeProps => <ContactsList contacts={this.props.contacts} {...routeProps}/>}/>  
            <Route exact path="/contacts/new" render={routeProps => <ContactForm {...routeProps} addContact={this.props.addContact} />}/>
            <Route exact path="/users/new" render={routeProps => <SignupForm {...routeProps} addUser={this.props.addUser} />}/>
            <Route 
              exact path='/login' 
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route path="/contacts/:contactId" render={routeProps => {
              const contact = this.props.contacts.find(contact => String(contact.id) === routeProps.match.params.contactId)
              return (!!contact) ? (
                 <ContactItem {...routeProps} {...contact} markComplete={this.props.markComplete} removeContact={this.props.removeContact} />
              ) : (
                <ErrorPage />
              )
            }}/>
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (currentState) => {
  return {
    contacts: currentState.contacts.contacts,
    // loading: currentState.contacts.loading,
    // error: currentState.contacts.error, 
    users: currentState.users.users, 


  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    addContact: (contact) => dispatch(addContact(contact)),
    removeContact: (contactId) => dispatch(removeContact(contactId)),
    fetchContacts: (contacts) => dispatch(fetchContacts(contacts)), 
    addUser: (user) => dispatch(addUser(user)),
    fetchUser: (users) => dispatch(fetchUsers(users)),
  }
}

export default connect(mapStateToProps, mapDispatch)(App);


