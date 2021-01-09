exports.validateInput = (text) => {
  if (text.length < 6) return false;
  const pair = text.slice(0, 3) + "_" + text.slice(3);
  return fxPairs.includes(pair);
};

const fxPairs = [
  "AUD_CAD",
  "AUD_CHF",
  "AUD_USD",
  "AUD_NZD",
  "AUD_JPY",
  "CAD_CHF",
  "CAD_JPY",
  "CHF_JPY",
  "NZD_CAD",
  "NZD_CHF",
  "NZD_USD",
  "NZD_JPY",
  "GBP_AUD",
  "GBP_CAD",
  "GBP_CHF",
  "GBP_USD",
  "GBP_JPY",
  "GBP_NZD",
  "USD_TRY",
  "USD_CHF",
  "USD_CAD",
  "USD_JPY",
  "EUR_AUD",
  "EUR_CAD",
  "EUR_USD",
  "EUR_GBP",
  "EUR_JPY",
  "EUR_NZD",
  "EUR_CHF",
  "EUR_TRY",
];
