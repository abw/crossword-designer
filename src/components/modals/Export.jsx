import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from '../../ui/ui'

function Export({hideExport, exportText}) {
  return <Modal show={!!exportText} onHide={hideExport}>
    <Modal.Header closeButton>
      <Modal.Title>Download Data</Modal.Title>
    </Modal.Header>
    <Modal.Body>{exportText}</Modal.Body>
    <Modal.Footer>
      <Button className="green" onClick={hideExport} text="Close" iconRight="times"/>
    </Modal.Footer>
  </Modal>
}

export default Export;