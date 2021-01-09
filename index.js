const dotenv = require("dotenv");
dotenv.config();

const { Telegraf } = require("telegraf");
const axios = require("axios");
const { validateInput } = require("./utils");

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.on("sticker", (ctx) => ctx.reply("👍"));

bot.help((ctx) =>
  ctx.reply(
    "🤓 Guide: _I check the exchange rates of the following currencies every hour and alert you if the price of a pair is near (50 pips above and below) the price you set!_ " +
      "\n\n💸 Currencies: _AUD, CAD, CHF, EUR, GBP, JPY, NZD, TRY, USD_" +
      "\n\n🇺🇸🇬🇧 Please tell me the name of a pair and price." +
      "\nex) _GBPUSD 1.34870_",
    { parse_mode: "Markdown" }
  )
);

bot.on("text", async (ctx) => {
  const input = ctx.message.text;
  if (validateInput(input)) {
    const pair = input.slice(0, 3) + "_" + input.slice(3);
    const url = `https://free.currconv.com/api/v7/convert?q=${pair}&compact=ultra&apiKey=${process.env.API_KEY}`;
    const data = await axios
      .get(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        ctx.reply("Please try again 🧐");
      });
  } else {
    ctx.reply("There is no such pair 😂");
  }
});

bot.launch();
