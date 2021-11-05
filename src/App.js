import './App.css';
import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ContactsList from "./components/ContactsList"
import ContactItem from "./components/ContactItem"
import Navbar from './components/Navbar'
import Home from "./components/Home"
import About from "./components/About"
import ContactForm from './containers/ContactForm';
import { parseSignature } from 'sshpk';
import { connect } from 'react-redux';
import {addContact, removeContact, fetchContacts} from "./actions/contacts"


class App extends Component {

  componentDidMount() {
    this.props.fetchContacts()
  }



  render() {

    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/about' element={<About />}/>
            <Route exact path='/new_contact' element={<ContactForm />}/>
            <Route exact path="/contacts" render={routeProps => <ContactsList contacts={this.props.contacts} {...routeProps}/>}/>  
            <Route path="/contacts/:contactId" render={routeProps => {
              const contact = this.props.contacts.find(contact => contact.id === parseSignature(routeProps.match.params.contactId))
              return <ContactItem {...routeProps} {...contact} />
            }}/>
          </Routes>
        </Router>
      </div>
    )

  }

}

const mapStateToProps = (currentState) => {
  return {
    contacts: currentState.contacts.contacts,
    loading: currentState.contacts.loading,
    error: currentState.contacts.error
  }
}


const mapDispatch = (dispatch, ownProps) => {
  return {
    addContact: (contact) => dispatch(addContact(contact)),
    removeContact: (contactId) => dispatch(removeContact(contactId)),
    fetchContacts: (contacts) => dispatch(fetchContacts(contacts))
  }
}



export default connect(mapStateToProps, mapDispatch)(App);