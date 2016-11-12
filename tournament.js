'use strict';

const tm = {};

var Match = tm.Match = function () {
 this.value = undefined;
 this.player1 = undefined;
 this.player2 = undefined;
 this.score = undefined;
 this.played = false;
 this.childrenLeft = undefined;
 this.childrenRight = undefined;
}

Match.prototype.passRound = function (winner) {
  if (this.childrenLeft === undefined) return false;
  if (this.childrenLeft.player1 === winner) {
    this.player1 = winner;
    this.childrenLeft.played = true;
    return true;
  } else if (this.childrenLeft.player2 === winner ) {
    this.player1 = winner;
    this.childrenLeft.played = true;  
    return true;
  }
  if (this.childrenRight !== undefined) {
    if (this.childrenRight.player1 === winner) {
      this.player2 = winner;
      this.childrenLeft.played = true;
      return true;
    } else if (this.childrenRight.player2 === winner) {
      this.player2 = winner;
      this.childrenLeft.played = true;
      return true;
    }
  }
  
  let found = this.childrenLeft.passRound(winner);
  if (!found && this.childrenRight) 
    found = this.childrenRight.passRound(winner);

  return found;
}

Match.prototype.nextMatch = function () {
  //aprofitar per anomenar els partits en funcio de profunditat(semis, quarts, etc)
  if (this.player1 && this.player2) return this;
  if (!this.player2 && this.childrenRight !== undefined) return this.childrenRight.nextMatch();
  if (!this.player1 && this.childrenLeft !== undefined) return this.childrenLeft.nextMatch();
}

tm.createTournament = function (players) {
  let final = new Match();
  final.value = 'final';
  let queue = [final];
  let empty = players.length - 2;
  let counter = 2;
  let match;
  while (queue.length > 0 && counter < empty) {
    match = queue.shift();
    counter += 2;
    match.childrenLeft = new Match ();
    queue.push(match.childrenLeft);
    if (counter < empty) {
      match.childrenRight = new Match ();
      queue.push(match.childrenRight);
      counter += 2;
    }
    if ((players.length) % 2 === 0 && counter === empty && match.childrenRight === undefined) {
      match.childrenRight = new Match();
      match.childrenRight.player1 = players.shift();
      match.childrenRight.player2 = players.shift();
      counter += 2;
    }
  }

  if ((players.length) % 2 === 1){
    if (counter > empty) { 
      queue[queue.length-1].player2 = players.shift()
    }
    if (match.childrenRight === undefined) {
      match.childrenRight = new Match ();
      match.childrenRight.player1 = players.shift();
      match.childrenRight.player2 = players.shift();
    }
  }

  while (queue.length > 0 && players.length > 0) {
    let match = queue.shift();
    match.childrenLeft = new Match ();
    match.childrenLeft.player1 = players.shift();
    match.childrenLeft.player2 = players.shift();
    if (players.length > 0) {
      match.childrenRight = new Match ();
      match.childrenRight.player1 = players.shift();
      match.childrenRight.player2 = players.shift();
    }
  }
  return final;
}


module.exports = tm;
