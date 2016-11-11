'use strict';
//name: Big-T
//username: DChamp_Bot

const TelegramBot = require('node-telegram-bot-api');

const token = '295609320:AAGyykQeyVxdxKYIxgXUlt_ZfMZUVJzaGr8';
// Setup polling way
const bot = new TelegramBot(token, {polling: true});

// Matches /start comand
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
  console.log(chatId);
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
  console.log(chatId);
});

// I have to implement newtournament
bot.onText(/\/newtournament/, function (msg, match) {
  let chatId = msg.chat.id;
  let resp = `
  
  This is the tournament tree. Next match is: 
	
  `;
  bot.sendMessage(chatId, resp, {parse_mode: 'Markdown'});
  console.log(chatId);
});

// I have to implement deletetournament
bot.onText(/\/deletetournament/, function (msg, match) {
  let chatId = msg.chat.id;
  let resp = `
  
  Are you sure? 
	
  `;
  bot.sendMessage(chatId, resp, {parse_mode: 'Markdown'});  
  console.log(chatId);
console.log(bot.getChat(-176205989))
});

// Matches /echo [whatever]
// bot.onText(/\/echo (.+)/, function (msg, match) {
//   let fromId = msg.from.id;
//   let resp = match[1];
// 	let opts = {
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
//   // photo can be: a file path, a stream or a Telegram file_id
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
