import './App.css';
import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ContactsList from "./ContactsList"
import ContactItem from "./ContactItem"
import Navbar from './Navbar'
import Home from "./Home"
import { parseSignature } from 'sshpk';



class App extends Component {
  render() {

    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/contacts' render={routeProps => <ContactsList contacts={this.state.contacts} {...routeProps}/>}/>
            <Route path="/contacts/:contactId" render={routeProps => {
              const contact = this.state.contacts.find(contact => contact.id === parseSignature(routeProps.match.params.contactId))
              return <ContactItem {...routeProps} {...contact} />
            }}/>
          </Routes>
        </Router>
      </div>
    )

  }

}

export default App;