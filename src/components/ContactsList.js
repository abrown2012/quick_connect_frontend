import PropTypes from 'prop-types'
import ContactItem from './ContactItem'

const ContactsList = (props) => {
    const renderContacts = () => {
        return props.ContactsList.map(contact => <ContactItem {...contact} key={contact.id}/>)
    }
    return (
        <> 
            <h1>Contacts</h1>
            {renderContacts()}
        </>
    )
}

ContactsList.propTypes = {
    contacts: PropTypes.array
}

ContactsList.defaultProps = {
    contacts: []
}

export default ContactsList;