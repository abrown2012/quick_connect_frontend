import { Link } from 'react-router-dom';
const ContactItem = ({id, name, email, phone, history, removeContact}) => {

    const handleClick = () => {
        removeContact(id)
        history.push("/contacts")
    }

    const handleCompleteChange = () => {
        history.push("/contacts")
    }

    const conditionalTitle = () => history.location.pathname === "/contacts" ? <Link to={`/contacts/${id}`}><h3>{name}</h3></Link> : <h3>{name}</h3>
    const conditionalButtons = () => history.location.pathname === "/contacts" ? <></> : <button className="btn btn-danger" onClick={() => handleClick()}>Delete</button>
    
    return (
        <div id={`contact-${id}`}>
            {conditionalTitle()}
      
            <p>{email}</p>
            <p>{phone}</p>
            {conditionalButtons()}
        </div>
    )
}

export default ContactItem;