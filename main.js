'use strict';
//name: Big-T
//username: DChamp_Bot

const TelegramBot = require('node-telegram-bot-api');
const token = require('./token.js');
const tournament = require('./tournament.js');

let myState = {
  registring: false,
  playing : false
}

let newT;

let players = [];
// let newT = tournament.createTournament(players);
// newT.passRound('6');
// console.log(newT.nextMatch());

// Setup polling way
const bot = new TelegramBot(token, {polling: true});

// Matches /start command
bot.onText(/\/start/, function (msg, match) {
  let chatId = msg.chat.id;
  bot.getChatAdministrators(chatId).then(function(data) {
    let admin = data[0].user.username;
    let respNew = `
    *Welcome!*

Before we start the tournament, every player has to register.

Please type /register to register at the tournament.
Every player has to send /register.  

When ready, the administrator has to type /go to start the tournament.
    
    `;
    if (msg.from.username === admin) {
      if (myState.playing === false) {
        myState.registring = true;  
        bot.sendMessage(chatId, respNew, {parse_mode: 'Markdown'});
      } else {
        bot.sendMessage(chatId, `Can't play more than one tournament at once`);
      }
    } else {
      bot.sendMessage(chatId, `Only ${admin} can send me commands!`);
    }
  }).catch(function() {
    console.log('error');
  })
});

bot.onText(/\/help/, function (msg, match) {
  let chatId = msg.chat.id;
  bot.getChatAdministrators(chatId).then(function(data) {
    let admin = data[0].user.username;
    let resp = `
    To start a tournament you have to add me to a Telegram group.
    
Then type /start to start a tournament!
Every player has to register before the tournament starts.
Once the tournament has started, only the group administrator can send me commands.

You can control me by sending these commands:

  /start - start the registration process
  /register - register at the tournament
  /go - start the tournament
  /help - list of commands and help
  /deletetournament - delete an existing tournament
    
    `;
    if (msg.from.username === admin) {
    bot.sendMessage(chatId, resp, {parse_mode: 'Markdown'});
    } else {
      bot.sendMessage(chatId, `Only ${admin} can send me commands!`);
    }
  }).catch(function() {
    console.log('error');
  })
});

// I have to implement newtournament
bot.onText(/\/register/, function (msg, match) {
  let chatId = msg.chat.id;
  let user = msg.from.username;
  if (myState.registring = true) {
    if (players.indexOf(user) === -1) {
      players.push(user);
      let resp = `
        ${user} has been registered! 
      `;
    bot.sendMessage(chatId, resp);
    }
  } else {
    bot.sendMessage(chatId, `Registrations are closed`);
  }
});

bot.onText(/\/go/, function (msg, match) {
  let chatId = msg.chat.id;
  bot.getChatAdministrators(chatId).then(function(data) {
    let admin = data[0].user.username;
    if (msg.from.username === admin) {
      if (players.length > 1) {
        // generate tournament
        // send next match
        myState.registring = false;
        myState.playing = true;
        newT = tournament.createTournament(players);
        console.log(newT);
        bot.sendMessage(chatId, JSON.stringify(newT));
      } else {
        bot.sendMessage(chatId, `You need at least 4 players to start a tournament and you are only ${players.length}!`);
      }
    } else {
      bot.sendMessage(chatId, `Only ${admin} can send me commands!`);
    }
  }).catch(function() {
    console.log('error');
  })
});


// I have to implement deletetournament
bot.onText(/\/deletetournament/, function (msg, match) {
let chatId = msg.chat.id;
  bot.getChatAdministrators(chatId).then(function(data) {
    let admin = data[0].user.username;
    let resp = `
    Are you sure?
    `;
    if (msg.from.username === admin) {
      if (myState.playing = true) {
        bot.sendMessage(chatId, resp, {parse_mode: 'Markdown'});
      } else {
        bot.sendMessage(chatId, resp, `You are not playing any tournament`);
      }
    } else {
      bot.sendMessage(chatId, `Only ${admin} can send me commands!`);
    }
  }).catch(function() {
    console.log('error');
  })
});

  // bot.getChat(-176205989).then(function(data) {
  //   console.log(data);
  // }).catch(function() {
  //   console.log('error');
  // })
  // bot.getChatAdministrators(-176205989).then(function(data) {
  //   console.log(data);
  // }).catch(function() {
  //   console.log('error');
  // })

  // bot.getChatMembersCount(-176205989).then(function(data) {
  //   console.log(data);
  // }).catch(function() {
  //   console.log('error');
  // })
  // bot.sendMessage(chatId, data);




// bot.on('message', function (msg) {
//   let chatId = msg.chat.id;
//   if (msg.new_chat_participant) console.log(msg.new_chat_participant.first_name + ' ' + msg.new_chat_participant.last_name );
//   if (msg.left_chat_participant) console.log(msg.left_chat_participant.username);

//   // bot.sendMessage(chatId, 'What do you want to do?', opts);
// });

// { message_id: 145,
//   from: 
//    { id: 207286404,
//      first_name: 'Manel',
//      last_name: 'Pavon',
//      username: 'Manel_Pavon' },
//   chat: 
//    { id: -176205989,
//      title: 'Pruebas',
//      type: 'group',
//      all_members_are_administrators: true },
//   date: 1478733428,
//   new_chat_participant: 
//    { id: 277229521,
//      first_name: 'Javier',
//      last_name: 'Cabrera',
//      username: 'jcc2303' },
//   new_chat_member: 
//    { id: 277229521,
//      first_name: 'Javier',
//      last_name: 'Cabrera',
//      username: 'jcc2303' } }

// Matches /echo [whatever]
// bot.onText(/\/echo (.+)/, function (msg, match) {
//   let fromId = msg.from.id;
//   let resp = match[1];
//  let opts = {
//     reply_markup: JSON.stringify({ 
//     keyboard: [['OK','Cancel']],
//     one_time_keyboard: true,
//     resize_keyboard: true
//     })
//   };
//   bot.sendMessage(fromId, resp, opts);
// });

//Any kind of message
// bot.on('message', function (msg) {
//   let chatId = msg.chat.id;
//   photo can be: a file path, a stream or a Telegram file_id
//   let photo = './cats.jpg';
//   bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
//   let opts = {
//     reply_markup: JSON.stringify({ 
//     keyboard: [['OK','Cancel']],
//     one_time_keyboard: true,
//     resize_keyboard: true
//     })
//   };
//   bot.sendMessage(chatId, 'What do you want to do?', opts);
// });
