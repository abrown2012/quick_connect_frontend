import PropTypes from 'prop-types'
import ContactItem from "./ContactItem"

const ContactsList = ({contacts, history}) => {

    const renderMissingContacts = () => {
        
        return contacts.map(contact => <ContactItem {...contact} history={history} key={contact.id} />)
    }

    return (
        <>
            <h1>Contacts</h1>
            {renderMissingContacts()}
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