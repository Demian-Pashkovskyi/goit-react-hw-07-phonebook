import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectContactsFilter } from 'redux/AppSlice';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { Audio } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';
import { EditContact } from 'components/EditContact/EditContact';
import { ContactItem  } from 'components/ContactItem/ContactItem';
import { List, Wrapper } from './ContactsListStyled';

export const ContactList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const { data: contacts, isFetching } = useGetContactsQuery();
  const filter = useSelector(selectContactsFilter);
  const filteredContacts = contacts?.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  const openModal = contactId => {
    setIsModalOpen(true);
    setEditContactId(contactId);
    window.document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.document.body.style.overflow = 'unset';
  };

  return (
    <>
      <List>
        {isFetching && (
          <Wrapper>
            <Audio
              width="70"
              height="70"
              color="#61dafb"
              radius="9"
              ariaLabel="loading"
            />
          </Wrapper>
        )}
        {filteredContacts?.length ? (
          filteredContacts.map(({ id, name, number }) => (
            <ContactItem
              key={id}
              id={id}
              name={name}
              number={number}
              openModal={openModal}
            />
          ))
        ) : (
          <li>No contacts</li>
        )}
      </List>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <EditContact id={editContactId} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};