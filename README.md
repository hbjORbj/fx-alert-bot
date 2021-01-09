# Telegram Bot that alerts you when the price of a pair is near the price you pre-set

> Built in NodeJS using [Currency Converter Api](https://www.currencyconverterapi.com) and Telegraf

This bot allows you to make better entries, leading to greater profits. Good Luck!</br>
</n>p.s. Since I use a free version, my bot polls the exchange rates every hour only.

ToDo: 
1. Every time bot fetches new data from API, bot does the following:
    - Check last 7 days of chat messages received and gather all valid alert requests.
    - Compare the prices in the requests to current prices, and if they are near (50 pips above and below), alert the user.