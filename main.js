'use strict';
//name: Big-T
//username: DChamp_Bot

const TelegramBot = require('node-telegram-bot-api');
const token = require('./token.js');

// Setup polling way
const bot = new TelegramBot(token, {polling: true});

// Matches /start command
bot.onText(/\/start/, function (msg, match) {
  let chatId = msg.chat.id;
  let resp = `
  I can help you create *Tournaments* to play with your friends!

You can control me by sending these commands:

	/start - welcome message
	/help - list of commands
	/newtournament - create a new tournament
	/deletetournament - delete an existing tournament
	
  `;
  bot.sendMessage(chatId, resp, {parse_mode: 'Markdown'});
});

bot.onText(/\/help/, function (msg, match) {
  let chatId = msg.chat.id;
  let resp = `
  To start a tournament first of all you have to create a Telegram group with all the players and then invite me.

Then type /newtournament to start a tournament!

  You can control me by sending these commands:

	/start - welcome message
	/help - list of commands
	/newtournament - create a new tournament
	/deletetournament - delete an existing tournament
	
  `;
  bot.sendMessage(chatId, resp, {parse_mode: 'Markdown'});
});

// I have to implement newtournament
bot.onText(/\/newtournament/, function (msg, match) {
  let chatId = msg.chat.id;
  let resp = `
  This is the tournament tree. Next match is: 
  `;

  // check the number of players
  bot.getChatMembersCount(chatId).then(function(data) {
    if (data < 5) {
      bot.sendMessage(chatId, 'You need at least 4 players to start a tournament!');
    } else {
      bot.sendMessage(chatId, resp);
    }
  }).catch(function() {
    console.log('error');
  })
});

// I have to implement deletetournament
bot.onText(/\/deletetournament/, function (msg, match) {
  let chatId = msg.chat.id;
  let resp = `
  
  Are you sure?
	
  `;
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

  bot.getChatMembersCount(-176205989).then(function(data) {
    console.log(data);
  }).catch(function() {
    console.log('error');
  })

  bot.sendMessage(chatId, data);
});



bot.on('message', function (msg) {
  let chatId = msg.chat.id;
  if (msg.new_chat_participant) console.log(msg.new_chat_participant.first_name + ' ' + msg.new_chat_participant.last_name );
  if (msg.left_chat_participant) console.log(msg.left_chat_participant.username);

  // bot.sendMessage(chatId, 'What do you want to do?', opts);
});

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
