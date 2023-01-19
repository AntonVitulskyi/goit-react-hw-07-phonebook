import { useDispatch, useSelector } from 'react-redux';

import Container from './Container/Container';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { addContactOperation, deleteContactOperation, fetchContactsOperation } from 'Redux/operations';
import { useEffect } from 'react';

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
    dispatch(addContactOperation(newContact));
  };

  useEffect(() => {
dispatch(fetchContactsOperation())
  }, [dispatch])

  const onClickDeleteContact = event => {
    dispatch(deleteContactOperation(event.target.id));
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
