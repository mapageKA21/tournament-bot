'use strict';

let players = ['1', '2', '3', '4', '5', '6', '7', '8'];

function Match () {
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
  
  var found = this.childrenLeft.passRound(winner);
  if (!found && this.childrenRight) 
    found = this.childrenRight.passRound(winner);

  return found;
}

Match.prototype.nextMatch = function () {
  
  if (this.player1 && this.player2) return this;
  if (!this.player2 && this.childrenRight !== undefined) return this.childrenRight.nextMatch();
  if (!this.player1 && this.childrenLeft !== undefined) return this.childrenLeft.nextMatch();
  // if (this.childrenLeft !== undefined) this.childrenLeft.nextMatch();
}

// per fer value = semifinals o qurterfinals etc podria comprovar el counter (<7 semifinals, <15 quarterfinals, etc)
function createTournament (playersArray) {
  let final = new Match();
  final.value = 'final';
  let queue = [final];
  let empty = playersArray.length - 2;
  let counter = 2;
  while (queue.length > 0 && counter < empty) {
    var match = queue.shift();
    counter += 2;
    match.childrenLeft = new Match ();
    queue.push(match.childrenLeft);
    if (counter < empty) {
      match.childrenRight = new Match ();
      queue.push(match.childrenRight);
      counter += 2;
    }
    if ((playersArray.length) % 2 === 0 && counter === empty && match.childrenRight === undefined) {
      match.childrenRight = new Match();
      match.childrenRight.player1 = players.shift();
      match.childrenRight.player2 = players.shift();
      counter += 2;
    }
  }

  if ((playersArray.length) % 2 === 1){
    if (counter > empty) { 
      queue[queue.length-1].player2 = players.shift()
    }
    if (match.childrenRight === undefined) {
      match.childrenRight = new Match ();
      match.childrenRight.player1 = players.shift();
      match.childrenRight.player2 = players.shift();
    }
  }

  while (queue.length > 0 && playersArray.length > 0) {
    var match = queue.shift();
    match.childrenLeft = new Match ();
    match.childrenLeft.player1 = players.shift();
    match.childrenLeft.player2 = players.shift();
    if (playersArray.length > 0) {
      match.childrenRight = new Match ();
      match.childrenRight.player1 = players.shift();
      match.childrenRight.player2 = players.shift();
    }
  }
  return final;
}

// var newTournament = createTournament(players);
// newTournament.passRound('8');
// newTournament.passRound('6');
// newTournament.passRound('6');
// newTournament.passRound('4');
// newTournament.passRound('2');
// newTournament.passRound('2');



// // newTournament.passRound('7');
// // console.log(newTournament);
// console.log(newTournament.nextMatch());


