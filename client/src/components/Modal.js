import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { history } from '../helpers/history'
import {emailValidation} from '../helpers/validation'

const ModalPopup = ({ buttonLabel, data, title, message, setError }) => {

  const [modal, setModal] = useState(false);

  const toggle = () => {
    if (data.name && emailValidation(data.email) && data.subject && data.message) {
      setModal(!modal);
    } else setError('Invalid Details')
  }

  const exit = () => {
    setModal(!modal);
    history.push('/')
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={exit}>OK</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalPopup;