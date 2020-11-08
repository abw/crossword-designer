import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from '../../ui/ui'

function Import({importVisible, hideImport, importData}) {
  const [data, setData] = React.useState(false);
  const onImport = () => {
    importData(JSON.parse(data));
    hideImport();
  }
  return <Modal show={importVisible} onHide={hideImport}>
    <Modal.Header closeButton>
      <Modal.Title>Upload Data</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <textarea className="wide" onChange={e => setData(e.target.value)} rows={12}></textarea>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={hideImport} text="Close" iconRight="times"/>
      <Button className="green" onClick={onImport} text="Import" iconRight="upload"/>
    </Modal.Footer>
  </Modal>
}

export default Import;