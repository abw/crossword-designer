import Grid from './components/Grid'
import Controls from './components/Controls'
import Context from './components/Context'
import { config } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css'
import './styles/Crossword.scss';

// Disable the automatic insertion of CSS into the head of the document.
config.autoAddCss = false;


function Crossword() {
  return <Context.Provider>
    <div className="crossword">
      <header>
        Crossword Designer
      </header>
      <main>
        <Grid/>
        <Controls/>
      </main>
      <footer>
        By Andy Wardley
      </footer>
    </div>
  </Context.Provider>
}

export default Crossword;
