const dotenv = require("dotenv");
dotenv.config();

const { Telegraf } = require("telegraf");
const axios = require("axios");
const { validateInput } = require("./utils");

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) =>
  ctx.reply("Welcome To FX Alert Bot!" + "\n\nCommand /help for guide 😁")
);

bot.on("sticker", (ctx) => ctx.reply("👍"));

bot.help((ctx) =>
  ctx.reply(
    "🤓 Guide: _I check the exchange rates of the following currencies every hour and alert you if the price of a pair is near (50 pips above and below) the price you set!_ " +
      "\n\n💸 Currencies: _AUD, CAD, CHF, EUR, GBP, JPY, NZD, TRY, USD_" +
      "\n\n🇺🇸🇬🇧 To set an alert, Please tell me the name of a pair and price." +
      "\nex) _GBPUSD 1.34870_" +
      "\n\n🇺🇸🇬🇧 To check your active alerts, Please command /check." +
      "\n\n🇺🇸🇬🇧 To cancel an active alerts, Please enter 'cancel' and the specific ID of alert. You can check the IDs via command /check." +
      "\nex) _cancel 1_" +
      "\n\n_Your alert expires in a week (168 hours) !_",
    { parse_mode: "Markdown" }
  )
);

bot.on("text", async (ctx) => {
  const input = ctx.message.text.trim();
  if (validateInput(input)) {
    const pair = input.slice(0, 3) + "_" + input.slice(3, 6);
    const inputPrice = input.slice(7);
    const url = `https://free.currconv.com/api/v7/convert?q=${pair}&compact=ultra&apiKey=${process.env.API_KEY}`;
    const data = await axios
      .get(url)
      .then((response) => {
        const data = JSON.stringify(response.data);
        const rate = data.slice(data.indexOf(":") + 1, data.indexOf("}"));
        ctx.replyWithHTML(rate);
      })
      .catch((err) => {
        console.log(err);
        ctx.reply("Please try again 🧐");
      });
  } else {
    ctx.reply(
      "Either your format is incorrect or this pair isn't on my watchlist 😂"
    );
  }
});

bot.launch();
