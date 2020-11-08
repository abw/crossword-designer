import React from "react";
import Context from './Context'
import Export from './modals/Export'
import Import from './modals/Import'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Icon } from '../ui/ui'

const Header = ({importData, exportData, save, load, clear}) => {
  const [exportText, setExportText] = React.useState(false);
  const [importVisible, setImportVisible] = React.useState(false);
  const hideExport = () => setExportText(false);
  const showExport = () => setExportText(JSON.stringify(exportData()));
  const hideImport = () => setImportVisible(false);
  const showImport = () => setImportVisible(true);

  return <header>
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Crossword Designer</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#grid">Grid</Nav.Link>
        <Nav.Link href="#words">Words</Nav.Link>
        <Nav.Link href="#clues">Clues</Nav.Link>
        <NavDropdown title="File" id="nav-dropdown">
          <NavDropdown.Item onClick={load}><Icon name="file-export" fixedWidth/> Load Current</NavDropdown.Item>
          <NavDropdown.Item onClick={save}><Icon name="file-import" fixedWidth/> Save Current</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={showImport}><Icon name="upload"   className="blue" fixedWidth/> Upload Data</NavDropdown.Item>
          <NavDropdown.Item onClick={showExport}><Icon name="download" className="blue" fixedWidth/> Download Data</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={clear}><Icon name="trash" fixedWidth/> Clear</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
    <Export hideExport={hideExport} exportText={exportText}/>
    <Import hideImport={hideImport} importVisible={importVisible} importData={importData}/>
  </header>
}

export default Context.Consumer(Header)