import React from "react";
import Generator from "@abw/react-context-generator";
import Storage from '../utils/Storage'
import tools from './Tools'
import symmetries from './Symmetries'

class Context extends React.Component {
  constructor(props) {
    super(props);
    const size   = props.size || 15;
    const toolNo = 0;
    const tool   = tools[toolNo];
    const mode   = 'grid';
    this.actions = {
      setGridMode:  this.setGridMode.bind(this),
      setWordsMode: this.setWordsMode.bind(this),
      setCluesMode: this.setCluesMode.bind(this),
      //selectTool:   this.selectTool.bind(this),
      setSymmetry:  this.setSymmetry.bind(this),
      clickCell:    this.clickCell.bind(this),
      setCell:      this.setCell.bind(this),
      toggleCell:   this.toggleCell.bind(this),
      focusCell:    this.focusCell.bind(this),
      save:         this.save.bind(this),
      load:         this.load.bind(this),
      clear:        this.clear.bind(this),
      importData:   this.importData.bind(this),
      exportData:   this.exportData.bind(this),
    };
    const action = this.actions[tool.action];

    this.state = {
      size,
      toolNo,
      tool,
      action,
      mode,
      tools: tools,
      symmetry: 2,
      symmetries: symmetries,
      focus: false,
      rows: [...Array(size)].map(
        (r, y) => [...Array(size)].map(
          (c, x) => ({x, y})
        )
      )
    };
    this.storage = Storage('xword-designer');
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  componentDidMount() {
    this.load();
  }
  save() {
    this.storage.save(this.exportData());
  }
  load() {
    this.importData(this.storage.load({ size: false, cells: false }));
  }
  importData(data) {
    let {size, cells} = data;
    cells = Array.isArray(cells) ? cells : cells.split('');
    if (size) {
      console.log('Loaded size: ', size);
      const rows = [...Array(size)].map(
        (r, y) => [...Array(size)].map(
          (c, x) => {
            let cell = {x, y};
            let data = cells.shift();
            if (data === '-') {
              cell.black = true;
            }
            else {
              cell.letter = data;
            }
            return cell;
          }
        )
      );
      this.setState({size, rows: this.checkCells(rows) });
    }
  }
  exportData() {
    const {size, rows} = this.state;
    let cells = [ ];
    rows.map(
      row => row.map(
        cell => cells.push(
          cell.black
            ? '-'
            : cell.letter || ' '
        )
      )
    );
    cells = cells.join('');
    return {size, cells};
  }
  clear() {
    const {size} = this.state;
    const rows = [...Array(size)].map(
      (r, y) => [...Array(size)].map(
        (c, x) => ({x, y})
      )
    );
    this.setState({rows});
  }
  selectTool(toolNo) {
    const tool   = tools[toolNo];
    const action = this.actions[tool.action];
    this.setState({ toolNo, tool, action });
    this.blurCell();
  }
  setMode(mode) {
    this.setState({mode});
    this.blurCell();
  }
  setGridMode() {
    this.setMode("grid");
  }
  setWordsMode() {
    this.setMode("words");
  }
  setCluesMode() {
    this.setMode("clues");
  }
  setSymmetry(symmetry) {
    this.setState({ symmetry });
  }
  clickCell(x, y) {
    let {mode} = this.state;
    if (mode === 'grid') {
      this.toggleCell(x, y);
    }
    else if (mode === 'words') {
      this.focusCell(x, y);
    }
  }
  setCell(x, y, params) {
    let {rows} = this.state;
    let cell = rows[y][x];
    rows[y][x] = {...cell, ...params};
    this.setState({ rows: [...rows]});
  }
  toggleCell(x, y) {
    const {rows, size, symmetry} = this.state;
    const black = ! rows[y][x].black;
    rows[y][x].black = black;

    if (symmetry) {
      const y2 = size - 1 - y;
      const x2 = size - 1 - x;
      rows[y2][x2].black = black;

      if (symmetry >= 4) {
        rows[y][x2].black = black;
        rows[y2][x].black = black;

        if (symmetry === 8) {
          rows[x][y].black   = black;
          rows[x2][y].black  = black;
          rows[x][y2].black  = black;
          rows[x2][y2].black = black;
        }
      }
    }
    this.setState({ rows: this.checkCells([...rows]) });
  }
  focusCell(x, y, flags={}) {
    const {rows, focus, size} = this.state;
    let word = [ ];
    let tmpl = [ ];
    const cell = rows[y][x];
    cell.west  = ! cell.black && x > 0 && ! rows[y][x-1].black;
    cell.east  = ! cell.black && x < size - 1 && ! rows[y][x+1].black;
    cell.north = ! cell.black && y > 0 && ! rows[y-1][x].black;
    cell.south = ! cell.black && y < size - 1 && ! rows[y+1][x].black;
    if (cell.focus) {
      // clicking on the currently focussed cell toggles direction
      // (where possible) between horizontal and vertical
      if (cell.horz && (cell.south || cell.north)) {
        cell.horz = false;
        cell.vert = true;
      }
      else if (cell.vert && (cell.east || cell.west)) {
        cell.vert = false;
        cell.horz = true;
      }
    }
    else {
      cell.focus = true;
      if (focus) {
        const [oldx, oldy] = focus;
        rows[oldy][oldx].focus = false;
      }
      if ((cell.east || cell.west) && ! flags.vert) {
        cell.horz = true;
        cell.vert = false;
      }
      else if ((cell.south || cell.north) && ! flags.horz) {
        cell.vert = true;
        cell.horz = false;
      }
      else {
        cell.vert = false;
        cell.horz = false;
      }
    }
    if (cell.vert) {
      for (let y = 0; y < size; y++) {
        const c = rows[y][cell.x];
        if (c.down === cell.down) {
          tmpl.push(c.across ? (c.letter || '_') : '_');
          word.push(c.letter || '_');
        }
      }
    }
    else if (cell.horz) {
      for (let x = 0; x < size; x++) {
        const c = rows[cell.y][x];
        if (c.across === cell.across) {
          tmpl.push(c.down ? (c.letter || '_') : '_');
          word.push(c.letter || '_');
        }
      }
    }
    this.installKeyPressHandler();
    this.setState({
      rows: [...rows],
      focus: [x,y],
      cell,
      down: cell.down,
      across: cell.across,
      horz: cell.horz,
      vert: cell.vert,
      word: word.map( c => c === ' ' ? '_' : c).join(''),
      template: tmpl.map( c => c === ' ' ? '_' : c).join(''),
    });
  }
  blurCell() {
    const {rows, focus} = this.state;
    if (focus) {
      const [oldx, oldy] = focus;
      rows[oldy][oldx].focus = false;
    }
    this.removeKeyPressHandler();
    this.setState({
      rows: [...rows],
      focus: false,
      cell: false,
      down: false,
      across: false,
      horz: false,
      vert: false,
      word: false
    });
  }
  checkCells(rows) {
    const {size} = this.state;
    let number = 1;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let cell = rows[y][x];
        cell.number = false;
        cell.across = false;
        cell.down   = false;
        cell.west   = false;
        cell.east   = false;
        cell.north  = false;
        cell.south  = false;
        if (cell.black) {
          continue;
        }
        cell.west   = x > 0 && ! rows[y][x-1].black;
        cell.east   = x < size - 1 && ! rows[y][x+1].black;
        cell.north  = y > 0 && ! rows[y-1][x].black;
        cell.south  = y < size - 1 && ! rows[y+1][x].black;
        if (cell.east && ! cell.west) {
            cell.number = number;
            cell.across = number;
        }
        if (cell.south && ! cell.north) {
            cell.number = number;
            cell.down   = number;
        }
        if (cell.number) {
          number++;
        }
        if (! cell.across && x > 0) {
          cell.across = rows[y][x-1].across
        }
        if (! cell.down && y > 0) {
          cell.down = rows[y-1][x].down
        }
      }
    }
    return rows;
  }
  onKeyPress(event) {
    if (! this.state.focus) {
      return;
    }
    var str = String.fromCharCode(event.keyCode);
//    console.log('str: ', str);
    if (/[a-z ]/i.test(str)) {
      return this.pressLetter(str);
    }
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        return this.moveLeft();
      case 'ArrowRight':
        event.preventDefault();
        return this.moveRight();
      case 'ArrowDown':
        event.preventDefault();
        return this.moveDown();
      case 'ArrowUp':
        event.preventDefault();
        return this.moveUp();
      case 'Backspace':
        event.preventDefault();
        return this.pressBackspace();
      case 'Delete':
        event.preventDefault();
        return this.pressDelete();
      default:
        console.log("key: ", event.key);
        return;
    }
  }
  installKeyPressHandler() {
    if (! this.keyPressHandler) {
      document.addEventListener("keydown", this.onKeyPress);
      this.keyPressHandler = true;
    }
  }
  removeKeyPressHandler() {
    if (this.keyPressHandler) {
      document.removeEventListener("keydown", this.onKeyPress);
      this.keyPressHandler = false;
    }
  }
  moveLeft() {
    const {focus} = this.state;
    if (focus) {
      this.focusCell(focus[0] - (focus[0] > 0 ? 1 : 0), focus[1], { horz: true });
    }
  }
  moveRight() {
    const {focus, size} = this.state;
    if (focus) {
      this.focusCell(focus[0] + ((focus[0] < size - 1) ? 1 : 0), focus[1], { horz: true });
    }
  }
  moveUp() {
    const {focus} = this.state;
    if (focus) {
      this.focusCell(focus[0], focus[1] - (focus[1] > 0 ? 1 : 0), { vert: true });
    }
  }
  moveDown() {
    const {focus, size} = this.state;
    if (focus) {
      this.focusCell(focus[0], focus[1] + ((focus[1] < size - 1) ? 1 : 0), { vert: true });
    }
  }
  moveForward() {
    const {rows, focus} = this.state;
    if (! focus) return;
    const [x, y] = focus;
    const cell = rows[y][x];
    if (cell.horz) {
      this.moveRight();
    }
    else if (cell.vert) {
      this.moveDown();
    }
  }
  moveBackward() {
    const {rows, focus} = this.state;
    if (! focus) return;
    const [x, y] = focus;
    const cell = rows[y][x];
    if (cell.horz) {
      this.moveLeft();
    }
    else if (cell.vert) {
      this.moveUp();
    }
  }
  setLetter(letter) {
    const {rows, focus} = this.state;
    if (! focus) return;
    const [x, y] = focus;
    const cell = rows[y][x];
    if (! cell.black || ! letter || ! letter.length) {
      cell.letter = letter;
    }
    this.setState({ rows: this.checkCells([...rows]) });
  }
  clearLetter() {
    this.setLetter('');
  }
  pressLetter(letter) {
    this.setLetter(letter);
    this.moveForward();
  }
  pressBackspace() {
    this.clearLetter();
    this.moveBackward();
  }
  pressDelete() {
    this.clearLetter();
    this.moveForward();
  }
  componentWillUnmount() {
    this.removeKeyPressHandler();
  }
  render() {
    return this.props.render({
      ...this.state,
      ...this.actions,
    });
  }
}

export default Generator(Context);