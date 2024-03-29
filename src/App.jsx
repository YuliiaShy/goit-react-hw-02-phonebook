import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Container from 'components/Container/Container';
import Form from 'components/Form/Form';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import contacts from 'components/contacts.json';

class App extends Component {
  state = {
    contacts,
    filter: ''
  };

  formSubmitHandler = (name, number) => {
    const { contacts } = this.state;

    const newContact = {
      id: nanoid(),
      name,
      number
    }

    contacts.find(
      contact => newContact.name.toLowerCase() === contact.name.toLowerCase())
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, newContact],
        }));
  };
 
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  getFindContact = () => {
    const { contacts, filter} = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler}/>
        <h2>Contacts</h2>
        <Filter value={filter} onFilterChange={this.handleFilterChange} />
        <ContactList list={this.getFindContact(filter)} onDelete={this.deleteContact} />
  </Container>
  );  
  }
};

export default App;