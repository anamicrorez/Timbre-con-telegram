const TelegramBot = require("node-telegram-bot-api");
const Config = require("./config/config");

// esta contante carga el TOKEN del .env 
const token = Config.TOKEN;

// instanciando el bot
const bot = new TelegramBot(token, { polling: true });

// casas 
const casa1 = '-888103594';
const casa2 = '-847905774';
const casa3 = '-612576808';
const casa4 = '-799248433';
const casa5 = '-734686636';
const casa6 = '-812032572';
const casa7 = '-863269504';
const casa8 = '-783377996';
const admin = '-898952233';

// esta variable sirve para contener el id del grupo
var chatId = null;

// crea el comando para obtener las ids de los grupos
bot.onText(/\/id/, (msg) => {
  if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    bot.sendMessage(msg.chat.id, `El ID de este grupo es: [${msg.chat.id}]`);
  } else {
    bot.sendMessage(msg.chat.id, 'Este comando solo funciona en un grupo.');
  }
});


// crea el formato de la fecha
const parsedDate = (day, month, year) => {
  month = parseInt(month) + 1;
  if (parseInt(day) < 10) {
    day = "0" + day;
  }
  if (parseInt(month) < 10) {
    month = "0" + month;
  }
  return day + "/" + month + "/" + year;
};

// manda el mensaje cuando es pulsado un timbre
const sendMessage = (message,) => {
  const datetime = new Date();

  if (message == 1) {
    chatId = casa1;
  }
  else if (message == 2) {
    chatId = casa2;
  }
  else if (message == 3) {
    chatId = casa3;
  }
  else if (message == 4) {
    chatId = casa4;
  }
  else if (message == 5) {
    chatId = casa5;
  }
  else if (message == 6) {
    chatId = casa6;
  }
  else if (message == 7) {
    chatId = casa7;
  }
  else if (message == 8) {
    chatId = casa8;
  }
  else {
    // handle other cases
    bot.sendMessage(admin,"hay problemas");
    
  }
  // manda el mensaje al grupo de la casa del boton
  bot.sendMessage(chatId,"Tocaaaaaaaaaaan"+"\n"+
      parsedDate(
        datetime.getDate(),
        datetime.getMonth(),
        datetime.getFullYear()
      ) +" "+
      datetime.getHours() +
      ":" +
      datetime.getMinutes() +
      ":" +
      datetime.getSeconds()
  );
  // manda un mensaje al grupo "admin" para llevar un control
  bot.sendMessage(admin,"Tocan el timbre en la casa "+message+"\n"+
      parsedDate(
        datetime.getDate(),
        datetime.getMonth(),
        datetime.getFullYear()
      ) +" "+
      datetime.getHours() +
      ":" +
      datetime.getMinutes() +
      ":" +
      datetime.getSeconds()
  );

};

module.exports = { sendMessage };
