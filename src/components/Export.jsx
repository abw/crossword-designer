import React from 'react'
import Context from './Context'
import Modal from 'react-bootstrap/Modal'
import { Button } from '../ui/ui'

function Export({exportData}) {
  let data;
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    data = JSON.stringify(exportData());
    //console.log('data: ', data);
    setShow(data);
  };

  return <>
    <Button text="Export" className="blue" iconLeft="file-export" onClick={handleShow}/>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Data Export</Modal.Title>
      </Modal.Header>
      <Modal.Body>{show}</Modal.Body>
      <Modal.Footer>
        <Button className="blue" onClick={handleClose} text="Close"/>
      </Modal.Footer>
    </Modal>
  </>
}

export default Context.Consumer(Export)