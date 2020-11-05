import React from "react";
import Generator from "@abw/react-context-generator";
import tools from './Tools'
import symmetries from './Symmetries'

class Context extends React.Component {
  constructor(props) {
    super(props);
    const size   = props.size || 15;
    const toolNo = 0;
    const tool   = tools[toolNo];
    this.actions = {
      selectTool:  this.selectTool.bind(this),
      setSymmetry: this.setSymmetry.bind(this),
      setCell:     this.setCell.bind(this),
      toggleCell:  this.toggleCell.bind(this),
      focusCell:   this.focusCell.bind(this),
    };
    const action = this.actions[tool.action];
    console.log('tool (%s): ', toolNo, tool);
    console.log('action (%s): ', tool.action, action);

    this.state = {
      size,
      toolNo,
      tool,
      action,
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
  }
  selectTool(toolNo) {
    const tool   = tools[toolNo];
    const action = this.actions[tool.action];
    this.setState({ toolNo, tool, action });
    this.blurCell();
  }
  setSymmetry(symmetry) {
    this.setState({ symmetry });
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
    this.setState({ rows: [...rows]});
  }
  focusCell(x, y) {
    const {rows, focus} = this.state;
    if (focus) {
      const [oldy, oldx] = focus;
      rows[oldy][oldx].focus = false;
    }
    rows[y][x].focus = true;
    this.setState({ rows: [...rows], focus: [y,x]});
  }
  blurCell() {
    const {rows, focus} = this.state;
    if (focus) {
      const [oldy, oldx] = focus;
      rows[oldy][oldx].focus = false;
    }
    this.setState({ rows: [...rows], focus: false});
  }
  render() {
    return this.props.render({
      ...this.state,
      ...this.actions,
    });
  }
}

export default Generator(Context);