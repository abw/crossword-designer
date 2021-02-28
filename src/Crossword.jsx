import Header   from './site/Header'
import Footer   from './site/Footer'
import Home     from './routes/Home'
import Grid     from './routes/Grid'
import Words    from './routes/Words'
import Clues    from './routes/Clues'
import About    from './routes/About'
import Help     from './routes/Help'
import Designer from './components/Designer'
import Context  from './components/Context'
import Container  from 'react-bootstrap/Container'
import { config } from "@fortawesome/fontawesome-svg-core";
import { Router } from "@reach/router";
import '@fortawesome/fontawesome-svg-core/styles.css'
import './styles/Crossword.scss';

// Disable the automatic insertion of CSS into the head of the document.
config.autoAddCss = false;

function Crossword() {
  return <Context.Provider>
    <div id="crossword-designer">
      <Header/>
      <main>
        <Container className="px-0">
          <Router>
            <Home  path="/"/>
            <About path="about"/>
            <Help  path="help"/>
            <Designer default>
              <Grid  path="grid"/>
              <Words path="words"/>
              <Clues path="clues"/>
            </Designer>
          </Router>
        </Container>
      </main>
      <Footer/>
    </div>
  </Context.Provider>
}

export default Crossword;

