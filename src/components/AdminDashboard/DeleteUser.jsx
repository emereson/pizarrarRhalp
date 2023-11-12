import { useDeleteUser } from './hooks/useDeleteUser';
import React, { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import DropTarget from './DropTarget';
import { USER_ROLES } from '../../enums/constants.enum';
import { ReactComponent as DeleteUserIcon } from '../../assets/admin/delete-user-icon.svg';
import AccordionItem from './AccordionItem';

const DeleteUser = ({ css }) => {
  const { deleteUser, isLoading, hasError } = useDeleteUser();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const handleClose = () => setShowModal(false);

  const handleDeleteUser = item => {
    const user = {
      ...item.payload,
      type: item.type
    };
    setUser(user);
    setShowModal(true);
  };

  const onDeleteUserSelected = async () => {
    try {
      await deleteUser(user);
      setShowModal(false);
    } catch (e) {}
  };

  return (
    <div css={css}>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {user.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mr-4">Do you want to delete user {user.name}?</p>
          {isLoading() && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          {hasError() && <Alert variant="danger">Error deleting user {user.name}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onDeleteUserSelected}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <DropTarget
        types={[USER_ROLES.STUDENTS, USER_ROLES.TEACHERS]}
        handleDrop={handleDeleteUser}
        isOverColor="red"
      >
        <div className={'text-center mt-0'}>
          <AccordionItem title={<DeleteUserIcon></DeleteUserIcon>}></AccordionItem>
        </div>
      </DropTarget>
    </div>
  );
};

export default DeleteUser;
