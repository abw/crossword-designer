import React from 'react'
import Context from './Context'
import Modal from 'react-bootstrap/Modal'
import { Button } from '../ui/ui'

function Import({importData}) {
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleImport = () => {
    importData(JSON.parse(data));
    setShow(false);
  }

  return <>
    <Button text="Import" className="blue" iconLeft="file-import" onClick={handleShow}/>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Data Import</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea className="wide" onChange={e => setData(e.target.value)} rows={12}>
        </textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} text="Close"/>
        <Button className="blue" onClick={handleImport} text="Import"/>
      </Modal.Footer>
    </Modal>
  </>
}

export default Context.Consumer(Import)