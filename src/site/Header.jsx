import React from "react";
import Context from '../components/Context'
import Export from '../components/modals/Export'
import Import from '../components/modals/Import'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import { Icon, Link } from '../ui/ui'

const Header = ({importData, exportData, save, load, clear}) => {
  const [exportText, setExportText] = React.useState(false);
  const [importVisible, setImportVisible] = React.useState(false);
  const hideExport = () => setExportText(false);
  const showExport = () => setExportText(JSON.stringify(exportData()));
  const hideImport = () => setImportVisible(false);
  const showImport = () => setImportVisible(true);

  return <header>
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>Crossword Designer</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link to="grid"  as={Link} iconLeft="adjust" fixedWidth>Grid</Nav.Link>
          <Nav.Link to="words" as={Link} iconLeft="font" fixedWidth>Words</Nav.Link>
          <Nav.Link to="clues" as={Link} iconLeft="question" fixedWidth>Clues</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Dropdown as={Nav.Item} alignRight>
            <Dropdown.Toggle as={Nav.Link}><Icon name="save" fixedWidth/> File</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={load}><Icon name="file-export" fixedWidth/> Load Puzzle</Dropdown.Item>
              <Dropdown.Item onClick={save}><Icon name="file-import" fixedWidth/> Save Puzzle</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={showImport}><Icon name="upload"   className="blue" fixedWidth/> Upload Data</Dropdown.Item>
              <Dropdown.Item onClick={showExport}><Icon name="download" className="blue" fixedWidth/> Download Data</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={clear}><Icon name="trash" fixedWidth/> Clear Puzzle</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
    <Export hideExport={hideExport} exportText={exportText}/>
    <Import hideImport={hideImport} importVisible={importVisible} importData={importData}/>
  </header>
}

export default Context.Consumer(Header)