import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from 'Redux/contactSlice';

import Container from './Container/Container';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

const App = () => {
  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts.items);

  const dispatch = useDispatch();

  const onSubmit = newContact => {
    if (
      contacts.some(contact => {
        return contact.name === newContact.name;
      })
    ) {
      return alert(`${newContact.name} is already in contacts!`);
    }
    dispatch(addContact(newContact));
  };

  const onClickDeleteContact = event => {
    dispatch(deleteContact(event.target.id));
  };

  return (
    <>
      <Container>
        <ContactForm onSubmit={onSubmit} />
        <Filter />
        <ContactList
          onClickDeleteContact={onClickDeleteContact}
          filter={filter}
        />
      </Container>
    </>
  );
};

export { App };
