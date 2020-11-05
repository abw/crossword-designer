import Grid from './components/Grid'
import './styles/Crossword.scss';

function Crossword() {
  return (
    <div className="crossword">
      <header>
        header
      </header>
      <main>
        <Grid/>
      </main>
      <footer>
        footer
      </footer>
    </div>
  );
}

export default Crossword;
