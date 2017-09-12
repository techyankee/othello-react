import React from "react";
import ReactDOM from "react-dom";
import styles from "./index.css";

const white = "◯";
const black = "●";

class Square extends React.Component {
  Click(){
    this.props.clickSquare(this.props.x, this.props.y);
  }

  renderDisc() {
    if(this.props.data[this.props.y][this.props.x] === 0) {
      return "";
    }
    if(this.props.data[this.props.y][this.props.x] === 1) {
      return white;
    }
    if(this.props.data[this.props.y][this.props.x] === 2) {
      return black;
    }
  }

  render() {
    return (
      <a className="square" onClick={this.Click.bind(this)} >
        {this.renderDisc()}
      </a>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      nextIsBlack: true,
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
    };
  }

  clickSquare(x,y) {
    let datas = this.state.data;

    if (datas[y][x] === 1 || datas[y][x] === 2) {
      alert("you can't set here!");
      return;
    }

    if (this.canSet(x, y) === false) {
      alert("you can't set here!");
      return;
    }

    if (this.sameColor(x, y) === false) {
      alert("you can't set here!");
      return;
    }

    if (this.state.nextIsBlack === true){
      datas[y][x] = 2;
      this.setState({
        nextIsBlack: false,
      });
      this.turnOver(x, y, 1, 2);
      return;
    }

    if (this.state.nextIsBlack === false){
      datas[y][x] = 1;
      this.setState({
        nextIsBlack: true,
      });
      this.turnOver(x, y, 2, 1);
      return;
    }

    this.setState({
      data: datas,
    });
  }

  canSet(x, y) {
    let i = x - 1;
    let j = y - 1;

    for (let X = i; X < i + 3; X++) {
      for (let Y = j; Y < j + 3; Y++) {
        if (X === x && Y === y) {
          continue;
        }
        if (X < 0 || Y < 0 || X > 7 || Y > 7) {
          continue;
        }
        if (this.state.data[Y][X] === 1 || this.state.data[Y][X] === 2) {
          return true;
        }
      }
    }
    return false;
  }

  sameColor(x, y) {
    let i = x - 1;
    let j = y - 1;

    if (this.state.nextIsBlack === true) {
      for (let X = i; X < i + 3; X++) {
        for (let Y = j; Y < j + 3; Y++) {
          if (X < 0 || Y < 0 || X > 7 || Y > 7) {
            continue;
          }
          if (this.state.data[Y][X] === 1) {
            if (this.hasami(x, y, X, Y, 2 ,1) === true) {
              return true;
            }
          }
        }
      }
      return false;
    }
    if (this.state.nextIsBlack === false) {
      for (let X = i; X < i + 3; X++) {
        for (let Y = j; Y < j + 3; Y++) {
          if (X < 0 || Y < 0 || X > 7 || Y > 7) {
            continue;
          }
          if (this.state.data[Y][X] === 2) {
            if (this.hasami(x, y, X, Y, 1, 2) === true) {
              return true;
            }
          }
        }
      }
      return false;
    }
    return false;
  }

  hasami(x, y, X, Y, a, b) {
    const dx = X - x;
    const dy = Y - y;

    let XX = X;
    let YY = Y;

    while (true) {
      XX += dx;
      YY += dy;

      if (XX < 0 || YY < 0 || XX > 7 || YY > 7) {
        break;
      }
      if (this.state.data[YY][XX] === a) {
        return true;
      }
      if (this.state.data[YY][XX] === b) {
        continue;
      }
      if (this.state.data[YY][XX] === 0) {
        return false;
      }
    }
    return false;
  }

  turnOver(x, y, c, d) {
    let i = x - 1;
    let j = y - 1;
    for (let X = i; X < i + 3; X++) {
      for (let Y = j; Y < j + 3; Y++) {
        if (X < 0 || Y < 0 || X > 7 || Y > 7) {
          continue;
        }
        if (this.state.data[Y][X] === c) {
          this.turnOver2(x, y, X, Y, c, d);
        }
      }
    }
  }

  turnOver2(x, y, X, Y, c, d) {
    const dx = X - x;
    const dy = Y - y;

    let XX = X;
    let YY = Y;

    while (true) {
      XX += dx;
      YY += dy;

      if (XX < 0 || YY < 0 || XX > 7 || YY > 7) {
        break;
      }
      if (this.state.data[YY][XX] === d) {
        this.state.data[Y][X] = d;
        return;
      }
      if (this.state.data[YY][XX] === c) {
        if(this.canHasami(dx,dy,XX,YY,c,d) ===  true){
          this.state.data[YY][XX] = d;
          continue;
        }
        if(this.canHasami(dx,dy,XX,YY,c,d) ===  false){
          return;
        }
      }
      if (this.state.data[YY][XX] === 0) {
        return;
      }
    }
  }

  canHasami(dx,dy,XX,YY,c,d){
    while(true){
      XX += dx;
      YY += dy;

      if (XX < 0 || YY < 0 || XX > 7 || YY > 7) {
        return false;
      }
      if (this.state.data[YY][XX] === d) {
        return true;
      }
      if (this.state.data[YY][XX] === c) {
        continue;
      }
      if (this.state.data[YY][XX] === 0) {
        return false;
      }
    }
  }

  starting() {
    this.setState({
      nextIsBlack: true,
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
    });
  }

  yourTurn() {
    if(this.state.nextIsBlack === true) {
      return "turn : ●BLACK";
    }
    if(this.state.nextIsBlack === false) {
      return "turn : ◯WHITE";
    }
  }

  blackNum() {
    const datas = this.state.data;
    let blacknum = 0;
    for (var i = 0; i < 8; i++) {
      for (var s = 0; s < 8; s++) {
        if(datas[i][s] == 2){
          blacknum++;
        }
      }
    }
    return blacknum;
  }

  whiteNum() {
    const datas = this.state.data;
    let whitenum = 0;
    for (var i = 0; i < 8; i++) {
      for (var s = 0; s < 8; s++) {
        if(datas[i][s] == 1){
          whitenum++;
        }
      }
    }
    return whitenum;
  }

  render() {
    return (
      <div>
        <div className="yourturn">
          <p>{this.yourTurn()}</p>
        </div>
        <div className="discnum">
          <p>● : {this.blackNum()}</p>
          <p>◯ : {this.whiteNum()}</p>
        </div>
        <div className="board-row">
          <Square x="0" y="0" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="1" y="0" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="2" y="0" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="3" y="0" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="4" y="0" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="5" y="0" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="6" y="0" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="7" y="0" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
        </div>
        <div className="board-row">
          <Square x="0" y="1" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="1" y="1" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="2" y="1" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="3" y="1" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="4" y="1" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="5" y="1" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="6" y="1" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="7" y="1" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
        </div>
        <div className="board-row">
          <Square x="0" y="2" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="1" y="2" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="2" y="2" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="3" y="2" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="4" y="2" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="5" y="2" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="6" y="2" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="7" y="2" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
        </div>
        <div className="board-row">
          <Square x="0" y="3" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="1" y="3" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="2" y="3" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="3" y="3" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="4" y="3" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="5" y="3" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="6" y="3" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="7" y="3" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
        </div>
        <div className="board-row">
          <Square x="0" y="4" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="1" y="4" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="2" y="4" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="3" y="4" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="4" y="4" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="5" y="4" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="6" y="4" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="7" y="4" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
        </div>
        <div className="board-row">
          <Square x="0" y="5" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="1" y="5" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="2" y="5" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="3" y="5" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="4" y="5" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="5" y="5" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="6" y="5" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="7" y="5" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
        </div>
        <div className="board-row">
          <Square x="0" y="6" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="1" y="6" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="2" y="6" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="3" y="6" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="4" y="6" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="5" y="6" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="6" y="6" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="7" y="6" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
        </div>
        <div className="board-row">
          <Square x="0" y="7" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="1" y="7" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="2" y="7" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="3" y="7" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="4" y="7" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="5" y="7" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="6" y="7" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
          <Square x="7" y="7" data={this.state.data} clickSquare={this.clickSquare.bind(this)}/>
        </div>
        <div className="start" onClick={this.starting.bind(this)}>
          <button>Start</button>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game-board">
        <h1>Othello</h1>
        <Board />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById("root")
);
