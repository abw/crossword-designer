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
      <p>
        Paste the raw data previously downloaded from another crossword puzzle into the
        text box below then click on the upload button.
      </p>
      <textarea className="wide" onChange={e => setData(e.target.value)} rows={12}></textarea>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={hideImport} text="Close" iconRight="times"/>
      <Button className="green" onClick={onImport} text="Upload" iconRight="upload"/>
    </Modal.Footer>
  </Modal>
}

export default Import;