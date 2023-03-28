// SCRIPTS TO REMOVE/INSERT ALL DEV DATA
// TODO: Refactor this hot mess

const mongoose = require("mongoose");
const Animal = require("./models/animalModel");
const Batch = require("./models/batchModel");
const Pasture = require("./models/pastureModel");

function getMonthDiff(dateFrom, dateTo) {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
}

const batchOneAnimals = [
  {
    name: "Qubiq",
    health: "healthy",
    color: "white",
    breed: "ayrshire",
    initialWeight: 144,
    description: "",
  },
  {
    name: "Vanilla",
    health: "good",
    color: "black",
    breed: "ayrshire",
    initialWeight: 158,
    description: "",
  },
  {
    name: "Walter",
    health: "good",
    color: "white",
    breed: "gelbvieh",
    initialWeight: 145,
    description: "veniam id",
  },
  {
    name: "Valdi",
    health: "healthy",
    color: "black",
    breed: "brahman",
    initialWeight: 134,
    description: "cillum cillum labore",
  },
  {
    name: "Tiller",
    health: "poor",
    color: "white",
    breed: "hereford",
    initialWeight: 151,
    description: "irure officia exercitation consectetur culpa non",
  },
  {
    name: "Questy",
    health: "healthy",
    color: "yellow",
    breed: "limousin",
    initialWeight: 154,
    description: "",
  },
  {
    name: "Marty",
    health: "good",
    color: "yellow",
    breed: "wagyu",
    initialWeight: 157,
    description: "",
  },
  {
    name: "Diesel",
    health: "healthy",
    color: "yellow",
    breed: "brahman",
    initialWeight: 130,
    description: "tempor eiusmod minim magna enim veniam",
  },
  {
    name: "Yarik",
    health: "good",
    color: "yellow",
    breed: "texas longhorn",
    initialWeight: 134,
    description: "id ad ad",
  },
  {
    name: "C.J.",
    health: "healthy",
    color: "red",
    breed: "guernsey",
    initialWeight: 139,
    description: "veniam ex magna eiusmod",
  },
  {
    name: "Quipe",
    health: "healthy",
    color: "white",
    breed: "limousin",
    initialWeight: 134,
    description: "commodo commodo nulla in laborum",
  },
  {
    name: "Ipakaha",
    health: "healthy",
    color: "orange",
    breed: "jersey",
    initialWeight: 159,
    description: "do duis",
  },
  {
    name: "Flash",
    health: "good",
    color: "orange",
    breed: "limousin",
    initialWeight: 130,
    description: "",
  },
  {
    name: "Highlander",
    health: "healthy",
    color: "yellow",
    breed: "texas longhorn",
    initialWeight: 152,
    description: "reprehenderit deserunt nostrud adipisicing",
  },
  {
    name: "Terrence",
    health: "poor",
    color: "orange",
    breed: "ayrshire",
    initialWeight: 141,
    description: "officia",
  },
  {
    name: "Questy",
    health: "good",
    color: "orange",
    breed: "hereford",
    initialWeight: 148,
    description: "ut",
  },
  {
    name: "Quipe",
    health: "healthy",
    color: "yellow",
    breed: "hereford",
    initialWeight: 159,
    description: "",
  },
  {
    name: "Yarni",
    health: "good",
    color: "white",
    breed: "brown swiss",
    initialWeight: 144,
    description: "laborum amet duis",
  },
  {
    name: "Wheeler",
    health: "good",
    color: "red",
    breed: "gelbvieh",
    initialWeight: 155,
    description: "tempor",
  },
  {
    name: "Quinn",
    health: "poor",
    color: "red",
    breed: "nelore",
    initialWeight: 158,
    description: "",
  },
];

const batchTwoAnimals = [
  {
    name: "Louis",
    health: "poor",
    color: "yellow",
    breed: "wagyu",
    initialWeight: 132,
    description: "aliqua id",
  },
  {
    name: "Diesel",
    health: "healthy",
    color: "black and white",
    breed: "nelore",
    initialWeight: 147,
    description: "officia do irure adipisicing culpa",
  },
  {
    name: "Marty",
    health: "poor",
    color: "black and white",
    breed: "holstein",
    initialWeight: 142,
    description: "officia et nisi in dolor",
  },
  {
    name: "Hickory",
    health: "good",
    color: "black",
    breed: "highlands",
    initialWeight: 138,
    description: "eu amet tempor Lorem aute deserunt",
  },
  {
    name: "Tiller",
    health: "good",
    color: "white",
    breed: "limousin",
    initialWeight: 142,
    description: "",
  },
  {
    name: "-",
    health: "poor",
    color: "yellow",
    breed: "brahman",
    initialWeight: 134,
    description: "et fugiat minim ex",
  },
  {
    name: "Louis",
    health: "poor",
    color: "white",
    breed: "black angus",
    initialWeight: 145,
    description: "enim nulla",
  },
  {
    name: "Ipakaha",
    health: "good",
    color: "red",
    breed: "wagyu",
    initialWeight: 152,
    description: "do",
  },
  {
    name: "Tiller",
    health: "healthy",
    color: "yellow",
    breed: "limousin",
    initialWeight: 158,
    description: "ipsum non",
  },
  {
    name: "Vandal",
    health: "poor",
    color: "yellow",
    breed: "wagyu",
    initialWeight: 145,
    description: "",
  },
  {
    name: "Yarik",
    health: "poor",
    color: "white",
    breed: "brown swiss",
    initialWeight: 151,
    description: "ex adipisicing eiusmod",
  },
  {
    name: "Pawdie",
    health: "good",
    color: "black and white",
    breed: "brahman",
    initialWeight: 158,
    description: "labore aliquip adipisicing eiusmod enim",
  },
  {
    name: "Pawdie",
    health: "healthy",
    color: "yellow",
    breed: "black angus",
    initialWeight: 147,
    description: "amet eiusmod excepteur esse sunt exercitation",
  },
  {
    name: "Xean",
    health: "healthy",
    color: "white",
    breed: "black angus",
    initialWeight: 143,
    description: "nulla sunt reprehenderit labore officia",
  },
  {
    name: "Hickory",
    health: "healthy",
    color: "red",
    breed: "hereford",
    initialWeight: 151,
    description: "",
  },
  {
    name: "Questy",
    health: "good",
    color: "red",
    breed: "wagyu",
    initialWeight: 148,
    description: "Lorem amet ut incididunt commodo",
  },
  {
    name: "Vanilla",
    health: "poor",
    color: "black and white",
    breed: "galloway",
    initialWeight: 146,
    description: "id",
  },
  {
    name: "Windsor",
    health: "poor",
    color: "orange",
    breed: "nelore",
    initialWeight: 157,
    description: "amet eiusmod nisi laborum sint",
  },
  {
    name: "Adonis",
    health: "good",
    color: "yellow",
    breed: "limousin",
    initialWeight: 160,
    description: "",
  },
  {
    name: "Quipe",
    health: "poor",
    color: "yellow",
    breed: "limousin",
    initialWeight: 141,
    description: "esse",
  },
];

const batchThreeAnimals = [
  {
    name: "Goliath",
    health: "poor",
    color: "red",
    breed: "brahman",
    initialWeight: 141,
    description: "esse incididunt",
  },
  {
    name: "Diesel",
    health: "good",
    color: "black",
    breed: "wagyu",
    initialWeight: 158,
    description: "",
  },
  {
    name: "Louis",
    health: "poor",
    color: "red",
    breed: "nelore",
    initialWeight: 134,
    description: "",
  },
  {
    name: "Umka",
    health: "poor",
    color: "red",
    breed: "guernsey",
    initialWeight: 145,
    description: "dolor do nisi labore laboris do",
  },
  {
    name: "Quipe",
    health: "healthy",
    color: "black",
    breed: "guernsey",
    initialWeight: 151,
    description: "proident dolore duis sint eu consequat",
  },
  {
    name: "Qubiq",
    health: "healthy",
    color: "yellow",
    breed: "texas longhorn",
    initialWeight: 149,
    description: "nisi tempor cupidatat ipsum",
  },
  {
    name: "C.J.",
    health: "poor",
    color: "orange",
    breed: "nelore",
    initialWeight: 143,
    description: "proident",
  },
  {
    name: "Goliath",
    health: "poor",
    color: "black",
    breed: "gelbvieh",
    initialWeight: 144,
    description: "commodo aliquip pariatur nulla aliqua adipisicing",
  },
  {
    name: "Shakespeare",
    health: "healthy",
    color: "white",
    breed: "highlands",
    initialWeight: 134,
    description: "id ut aliquip eiusmod nisi laborum",
  },
  {
    name: "Xean",
    health: "healthy",
    color: "orange",
    breed: "highlands",
    initialWeight: 154,
    description: "ea pariatur aliqua cillum",
  },
  {
    name: "Umka",
    health: "good",
    color: "black and white",
    breed: "black angus",
    initialWeight: 133,
    description: "labore anim ut occaecat pariatur",
  },
  {
    name: "Goliath",
    health: "poor",
    color: "white",
    breed: "galloway",
    initialWeight: 152,
    description: "",
  },
  {
    name: "Windsor",
    health: "healthy",
    color: "red",
    breed: "ayrshire",
    initialWeight: 139,
    description: "",
  },
  {
    name: "Qubiq",
    health: "good",
    color: "orange",
    breed: "wagyu",
    initialWeight: 137,
    description: "sunt labore aliqua dolore quis",
  },
  {
    name: "Goliath",
    health: "poor",
    color: "red",
    breed: "wagyu",
    initialWeight: 158,
    description: "ad",
  },
  {
    name: "Pawdie",
    health: "healthy",
    color: "red",
    breed: "holstein",
    initialWeight: 133,
    description: "deserunt eu exercitation eu esse",
  },
  {
    name: "Fuad",
    health: "healthy",
    color: "black and white",
    breed: "guernsey",
    initialWeight: 134,
    description: "magna in",
  },
  {
    name: "Umka",
    health: "poor",
    color: "white",
    breed: "limousin",
    initialWeight: 145,
    description: "nulla sit enim velit",
  },
  {
    name: "Questy",
    health: "good",
    color: "orange",
    breed: "highlands",
    initialWeight: 150,
    description: "ex elit id mollit aliqua",
  },
  {
    name: "Questy",
    health: "healthy",
    color: "orange",
    breed: "wagyu",
    initialWeight: 156,
    description: "laborum consectetur anim anim",
  },
];

const batchFourAnimals = [
  {
    name: "Walter",
    health: "good",
    color: "red",
    breed: "nelore",
    initialWeight: 147,
    description: "et nisi commodo velit",
  },
  {
    name: "Diesel",
    health: "healthy",
    color: "white",
    breed: "wagyu",
    initialWeight: 137,
    description: "consequat",
  },
  {
    name: "Tripp",
    health: "healthy",
    color: "yellow",
    breed: "brahman",
    initialWeight: 145,
    description: "sint ad enim",
  },
  {
    name: "Wilson",
    health: "good",
    color: "red",
    breed: "limousin",
    initialWeight: 153,
    description: "et sunt cupidatat velit",
  },
  {
    name: "Molasses",
    health: "poor",
    color: "black and white",
    breed: "texas longhorn",
    initialWeight: 143,
    description: "sit id sint",
  },
  {
    name: "Yarni",
    health: "poor",
    color: "red",
    breed: "galloway",
    initialWeight: 155,
    description: "culpa dolore esse ut consequat cupidatat",
  },
  {
    name: "Pawdie",
    health: "good",
    color: "red",
    breed: "guernsey",
    initialWeight: 157,
    description: "minim ad",
  },
  {
    name: "Thomas",
    health: "good",
    color: "orange",
    breed: "brown swiss",
    initialWeight: 134,
    description: "amet",
  },
  {
    name: "Walter",
    health: "poor",
    color: "yellow",
    breed: "highlands",
    initialWeight: 143,
    description: "irure incididunt ut aliqua incididunt",
  },
  {
    name: "C.J.",
    health: "good",
    color: "orange",
    breed: "limousin",
    initialWeight: 138,
    description: "ipsum ex exercitation est velit nulla",
  },
  {
    name: "Xean",
    health: "good",
    color: "orange",
    breed: "highlands",
    initialWeight: 136,
    description: "ad ex irure ad dolor",
  },
  {
    name: "Fuad",
    health: "good",
    color: "red",
    breed: "hereford",
    initialWeight: 143,
    description: "mollit nisi mollit",
  },
  {
    name: "Questy",
    health: "good",
    color: "orange",
    breed: "black angus",
    initialWeight: 153,
    description: "",
  },
  {
    name: "Walter",
    health: "poor",
    color: "white",
    breed: "guernsey",
    initialWeight: 135,
    description: "pariatur reprehenderit",
  },
  {
    name: "Questy",
    health: "poor",
    color: "black and white",
    breed: "highlands",
    initialWeight: 131,
    description: "dolore elit",
  },
  {
    name: "Louis",
    health: "poor",
    color: "red",
    breed: "limousin",
    initialWeight: 153,
    description: "nulla tempor occaecat deserunt",
  },
  {
    name: "Highlander",
    health: "poor",
    color: "black and white",
    breed: "texas longhorn",
    initialWeight: 135,
    description: "eu in",
  },
  {
    name: "Flash",
    health: "healthy",
    color: "white",
    breed: "wagyu",
    initialWeight: 134,
    description: "deserunt voluptate deserunt dolore et",
  },
  {
    name: "Wheeler",
    health: "good",
    color: "orange",
    breed: "brahman",
    initialWeight: 134,
    description: "veniam",
  },
  {
    name: "Marty",
    health: "poor",
    color: "black",
    breed: "galloway",
    initialWeight: 147,
    description: "magna",
  },
];

// 3 years batch weightLogs
// date 9/14/2019
// 1/15/2019, 175

const threeYearsBatchLogs = [
  [
    {
      weight: 171,
      date: "01/15/2020",
    },
    {
      weight: 166,
      date: "01/15/2020",
    },
    {
      weight: 175,
      date: "01/15/2020",
    },
    {
      weight: 166,
      date: "01/15/2020",
    },
    {
      weight: 174,
      date: "01/15/2020",
    },
    {
      weight: 166,
      date: "01/15/2020",
    },
    {
      weight: 175,
      date: "01/15/2020",
    },
    {
      weight: 170,
      date: "01/15/2020",
    },
    {
      weight: 169,
      date: "01/15/2020",
    },
    {
      weight: 171,
      date: "01/15/2020",
    },
    {
      weight: 168,
      date: "01/15/2020",
    },
    {
      weight: 174,
      date: "01/15/2020",
    },
    {
      weight: 168,
      date: "01/15/2020",
    },
    {
      weight: 170,
      date: "01/15/2020",
    },
    {
      weight: 170,
      date: "01/15/2020",
    },
    {
      weight: 167,
      date: "01/15/2020",
    },
    {
      weight: 169,
      date: "01/15/2020",
    },
    {
      weight: 174,
      date: "01/15/2020",
    },
    {
      weight: 165,
      date: "01/15/2020",
    },
    {
      weight: 170,
      date: "01/15/2020",
    },
  ],
  [
    {
      weight: 212,
      date: "05/14/2020",
    },
    {
      weight: 210,
      date: "05/14/2020",
    },
    {
      weight: 214,
      date: "05/14/2020",
    },
    {
      weight: 210,
      date: "05/14/2020",
    },
    {
      weight: 211,
      date: "05/14/2020",
    },
    {
      weight: 215,
      date: "05/14/2020",
    },
    {
      weight: 210,
      date: "05/14/2020",
    },
    {
      weight: 210,
      date: "05/14/2020",
    },
    {
      weight: 214,
      date: "05/14/2020",
    },
    {
      weight: 212,
      date: "05/14/2020",
    },
    {
      weight: 209,
      date: "05/14/2020",
    },
    {
      weight: 210,
      date: "05/14/2020",
    },
    {
      weight: 210,
      date: "05/14/2020",
    },
    {
      weight: 210,
      date: "05/14/2020",
    },
    {
      weight: 211,
      date: "05/14/2020",
    },
    {
      weight: 208,
      date: "05/14/2020",
    },
    {
      weight: 212,
      date: "05/14/2020",
    },
    {
      weight: 213,
      date: "05/14/2020",
    },
    {
      weight: 208,
      date: "05/14/2020",
    },
    {
      weight: 214,
      date: "05/14/2020",
    },
  ],
  [
    {
      weight: 253,
      date: "09/16/2020",
    },
    {
      weight: 251,
      date: "09/16/2020",
    },
    {
      weight: 254,
      date: "09/16/2020",
    },
    {
      weight: 250,
      date: "09/16/2020",
    },
    {
      weight: 254,
      date: "09/16/2020",
    },
    {
      weight: 253,
      date: "09/16/2020",
    },
    {
      weight: 252,
      date: "09/16/2020",
    },
    {
      weight: 254,
      date: "09/16/2020",
    },
    {
      weight: 250,
      date: "09/16/2020",
    },
    {
      weight: 253,
      date: "09/16/2020",
    },
    {
      weight: 252,
      date: "09/16/2020",
    },
    {
      weight: 253,
      date: "09/16/2020",
    },
    {
      weight: 254,
      date: "09/16/2020",
    },
    {
      weight: 249,
      date: "09/16/2020",
    },
    {
      weight: 252,
      date: "09/16/2020",
    },
    {
      weight: 252,
      date: "09/16/2020",
    },
    {
      weight: 253,
      date: "09/16/2020",
    },
    {
      weight: 251,
      date: "09/16/2020",
    },
    {
      weight: 249,
      date: "09/16/2020",
    },
    {
      weight: 252,
      date: "09/16/2020",
    },
  ],
  [
    {
      weight: 291,
      date: "01/13/2021",
    },
    {
      weight: 292,
      date: "01/13/2021",
    },
    {
      weight: 294,
      date: "01/13/2021",
    },
    {
      weight: 293,
      date: "01/13/2021",
    },
    {
      weight: 294,
      date: "01/13/2021",
    },
    {
      weight: 292,
      date: "01/13/2021",
    },
    {
      weight: 292,
      date: "01/13/2021",
    },
    {
      weight: 295,
      date: "01/13/2021",
    },
    {
      weight: 292,
      date: "01/13/2021",
    },
    {
      weight: 291,
      date: "01/13/2021",
    },
    {
      weight: 291,
      date: "01/13/2021",
    },
    {
      weight: 291,
      date: "01/13/2021",
    },
    {
      weight: 294,
      date: "01/13/2021",
    },
    {
      weight: 292,
      date: "01/13/2021",
    },
    {
      weight: 293,
      date: "01/13/2021",
    },
    {
      weight: 295,
      date: "01/13/2021",
    },
    {
      weight: 293,
      date: "01/13/2021",
    },
    {
      weight: 293,
      date: "01/13/2021",
    },
    {
      weight: 294,
      date: "01/13/2021",
    },
    {
      weight: 291,
      date: "01/13/2021",
    },
  ],
  [
    {
      weight: 331,
      date: "05/15/2021",
    },
    {
      weight: 334,
      date: "05/15/2021",
    },
    {
      weight: 332,
      date: "05/15/2021",
    },
    {
      weight: 333,
      date: "05/15/2021",
    },
    {
      weight: 326,
      date: "05/15/2021",
    },
    {
      weight: 331,
      date: "05/15/2021",
    },
    {
      weight: 330,
      date: "05/15/2021",
    },
    {
      weight: 327,
      date: "05/15/2021",
    },
    {
      weight: 325,
      date: "05/15/2021",
    },
    {
      weight: 327,
      date: "05/15/2021",
    },
    {
      weight: 329,
      date: "05/15/2021",
    },
    {
      weight: 335,
      date: "05/15/2021",
    },
    {
      weight: 333,
      date: "05/15/2021",
    },
    {
      weight: 326,
      date: "05/15/2021",
    },
    {
      weight: 327,
      date: "05/15/2021",
    },
    {
      weight: 331,
      date: "05/15/2021",
    },
    {
      weight: 335,
      date: "05/15/2021",
    },
    {
      weight: 330,
      date: "05/15/2021",
    },
    {
      weight: 335,
      date: "05/15/2021",
    },
    {
      weight: 327,
      date: "05/15/2021",
    },
  ],
  [
    {
      weight: 365,
      date: "09/15/2021",
    },
    {
      weight: 369,
      date: "09/15/2021",
    },
    {
      weight: 365,
      date: "09/15/2021",
    },
    {
      weight: 365,
      date: "09/15/2021",
    },
    {
      weight: 366,
      date: "09/15/2021",
    },
    {
      weight: 367,
      date: "09/15/2021",
    },
    {
      weight: 373,
      date: "09/15/2021",
    },
    {
      weight: 374,
      date: "09/15/2021",
    },
    {
      weight: 365,
      date: "09/15/2021",
    },
    {
      weight: 374,
      date: "09/15/2021",
    },
    {
      weight: 365,
      date: "09/15/2021",
    },
    {
      weight: 366,
      date: "09/15/2021",
    },
    {
      weight: 369,
      date: "09/15/2021",
    },
    {
      weight: 370,
      date: "09/15/2021",
    },
    {
      weight: 365,
      date: "09/15/2021",
    },
    {
      weight: 368,
      date: "09/15/2021",
    },
    {
      weight: 368,
      date: "09/15/2021",
    },
    {
      weight: 372,
      date: "09/15/2021",
    },
    {
      weight: 373,
      date: "09/15/2021",
    },
    {
      weight: 375,
      date: "09/15/2021",
    },
  ],
  [
    {
      weight: 415,
      date: "01/15/2022",
    },
    {
      weight: 410,
      date: "01/15/2022",
    },
    {
      weight: 412,
      date: "01/15/2022",
    },
    {
      weight: 411,
      date: "01/15/2022",
    },
    {
      weight: 409,
      date: "01/15/2022",
    },
    {
      weight: 410,
      date: "01/15/2022",
    },
    {
      weight: 413,
      date: "01/15/2022",
    },
    {
      weight: 410,
      date: "01/15/2022",
    },
    {
      weight: 409,
      date: "01/15/2022",
    },
    {
      weight: 412,
      date: "01/15/2022",
    },
    {
      weight: 415,
      date: "01/15/2022",
    },
    {
      weight: 409,
      date: "01/15/2022",
    },
    {
      weight: 413,
      date: "01/15/2022",
    },
    {
      weight: 408,
      date: "01/15/2022",
    },
    {
      weight: 412,
      date: "01/15/2022",
    },
    {
      weight: 408,
      date: "01/15/2022",
    },
    {
      weight: 415,
      date: "01/15/2022",
    },
    {
      weight: 413,
      date: "01/15/2022",
    },
    {
      weight: 413,
      date: "01/15/2022",
    },
    {
      weight: 411,
      date: "01/15/2022",
    },
  ],
  [
    {
      weight: 444,
      date: "05/15/2022",
    },
    {
      weight: 454,
      date: "05/15/2022",
    },
    {
      weight: 449,
      date: "05/15/2022",
    },
    {
      weight: 447,
      date: "05/15/2022",
    },
    {
      weight: 443,
      date: "05/15/2022",
    },
    {
      weight: 442,
      date: "05/15/2022",
    },
    {
      weight: 446,
      date: "05/15/2022",
    },
    {
      weight: 443,
      date: "05/15/2022",
    },
    {
      weight: 451,
      date: "05/15/2022",
    },
    {
      weight: 451,
      date: "05/15/2022",
    },
    {
      weight: 446,
      date: "05/15/2022",
    },
    {
      weight: 451,
      date: "05/15/2022",
    },
    {
      weight: 450,
      date: "05/15/2022",
    },
    {
      weight: 447,
      date: "05/15/2022",
    },
    {
      weight: 443,
      date: "05/15/2022",
    },
    {
      weight: 453,
      date: "05/15/2022",
    },
    {
      weight: 442,
      date: "05/15/2022",
    },
    {
      weight: 452,
      date: "05/15/2022",
    },
    {
      weight: 441,
      date: "05/15/2022",
    },
    {
      weight: 448,
      date: "05/15/2022",
    },
  ],
  [
    {
      weight: 491,
      date: "09/15/2022",
    },
    {
      weight: 491,
      date: "09/15/2022",
    },
    {
      weight: 493,
      date: "09/15/2022",
    },
    {
      weight: 490,
      date: "09/15/2022",
    },
    {
      weight: 491,
      date: "09/15/2022",
    },
    {
      weight: 495,
      date: "09/15/2022",
    },
    {
      weight: 495,
      date: "09/15/2022",
    },
    {
      weight: 490,
      date: "09/15/2022",
    },
    {
      weight: 492,
      date: "09/15/2022",
    },
    {
      weight: 494,
      date: "09/15/2022",
    },
    {
      weight: 488,
      date: "09/15/2022",
    },
    {
      weight: 490,
      date: "09/15/2022",
    },
    {
      weight: 489,
      date: "09/15/2022",
    },
    {
      weight: 494,
      date: "09/15/2022",
    },
    {
      weight: 490,
      date: "09/15/2022",
    },
    {
      weight: 494,
      date: "09/15/2022",
    },
    {
      weight: 493,
      date: "09/15/2022",
    },
    {
      weight: 485,
      date: "09/15/2022",
    },
    {
      weight: 486,
      date: "09/15/2022",
    },
    {
      weight: 486,
      date: "09/15/2022",
    },
  ],
];

// --------------------------------------------------------------------- //

// date 10/24/2021
//  2/19/2022, 175

const oneYearAndAHalfBatchLogs = [
  [
    {
      weight: 167,
      date: "02/19/2022",
    },
    {
      weight: 175,
      date: "02/19/2022",
    },
    {
      weight: 160,
      date: "02/19/2022",
    },
    {
      weight: 171,
      date: "02/19/2022",
    },
    {
      weight: 175,
      date: "02/19/2022",
    },
    {
      weight: 163,
      date: "02/19/2022",
    },
    {
      weight: 173,
      date: "02/19/2022",
    },
    {
      weight: 174,
      date: "02/19/2022",
    },
    {
      weight: 171,
      date: "02/19/2022",
    },
    {
      weight: 167,
      date: "02/19/2022",
    },
    {
      weight: 173,
      date: "02/19/2022",
    },
    {
      weight: 161,
      date: "02/19/2022",
    },
    {
      weight: 174,
      date: "02/19/2022",
    },
    {
      weight: 167,
      date: "02/19/2022",
    },
    {
      weight: 162,
      date: "02/19/2022",
    },
    {
      weight: 173,
      date: "02/19/2022",
    },
    {
      weight: 163,
      date: "02/19/2022",
    },
    {
      weight: 172,
      date: "02/19/2022",
    },
    {
      weight: 160,
      date: "02/19/2022",
    },
    {
      weight: 165,
      date: "02/19/2022",
    },
  ],
  [
    {
      weight: 209,
      date: "06/19/2022",
    },
    {
      weight: 208,
      date: "06/19/2022",
    },
    {
      weight: 206,
      date: "06/19/2022",
    },
    {
      weight: 208,
      date: "06/19/2022",
    },
    {
      weight: 208,
      date: "06/19/2022",
    },
    {
      weight: 207,
      date: "06/19/2022",
    },
    {
      weight: 205,
      date: "06/19/2022",
    },
    {
      weight: 214,
      date: "06/19/2022",
    },
    {
      weight: 211,
      date: "06/19/2022",
    },
    {
      weight: 207,
      date: "06/19/2022",
    },
    {
      weight: 214,
      date: "06/19/2022",
    },
    {
      weight: 210,
      date: "06/19/2022",
    },
    {
      weight: 214,
      date: "06/19/2022",
    },
    {
      weight: 205,
      date: "06/19/2022",
    },
    {
      weight: 215,
      date: "06/19/2022",
    },
    {
      weight: 208,
      date: "06/19/2022",
    },
    {
      weight: 208,
      date: "06/19/2022",
    },
    {
      weight: 209,
      date: "06/19/2022",
    },
    {
      weight: 210,
      date: "06/19/2022",
    },
    {
      weight: 212,
      date: "06/19/2022",
    },
  ],
  [
    {
      weight: 253,
      date: "10/19/2022",
    },
    {
      weight: 249,
      date: "10/19/2022",
    },
    {
      weight: 247,
      date: "10/19/2022",
    },
    {
      weight: 252,
      date: "10/19/2022",
    },
    {
      weight: 251,
      date: "10/19/2022",
    },
    {
      weight: 254,
      date: "10/19/2022",
    },
    {
      weight: 247,
      date: "10/19/2022",
    },
    {
      weight: 255,
      date: "10/19/2022",
    },
    {
      weight: 246,
      date: "10/19/2022",
    },
    {
      weight: 245,
      date: "10/19/2022",
    },
    {
      weight: 252,
      date: "10/19/2022",
    },
    {
      weight: 249,
      date: "10/19/2022",
    },
    {
      weight: 245,
      date: "10/19/2022",
    },
    {
      weight: 254,
      date: "10/19/2022",
    },
    {
      weight: 252,
      date: "10/19/2022",
    },
    {
      weight: 253,
      date: "10/19/2022",
    },
    {
      weight: 246,
      date: "10/19/2022",
    },
    {
      weight: 250,
      date: "10/19/2022",
    },
    {
      weight: 249,
      date: "10/19/2022",
    },
    {
      weight: 254,
      date: "10/19/2022",
    },
  ],
  [
    {
      weight: 290,
      date: "01/19/2023",
    },
    {
      weight: 297,
      date: "01/19/2023",
    },
    {
      weight: 294,
      date: "01/19/2023",
    },
    {
      weight: 291,
      date: "01/19/2023",
    },
    {
      weight: 292,
      date: "01/19/2023",
    },
    {
      weight: 294,
      date: "01/19/2023",
    },
    {
      weight: 296,
      date: "01/19/2023",
    },
    {
      weight: 289,
      date: "01/19/2023",
    },
    {
      weight: 291,
      date: "01/19/2023",
    },
    {
      weight: 292,
      date: "01/19/2023",
    },
    {
      weight: 295,
      date: "01/19/2023",
    },
    {
      weight: 295,
      date: "01/19/2023",
    },
    {
      weight: 294,
      date: "01/19/2023",
    },
    {
      weight: 294,
      date: "01/19/2023",
    },
    {
      weight: 291,
      date: "01/19/2023",
    },
    {
      weight: 291,
      date: "01/19/2023",
    },
    {
      weight: 289,
      date: "01/19/2023",
    },
    {
      weight: 292,
      date: "01/19/2023",
    },
    {
      weight: 295,
      date: "01/19/2023",
    },
    {
      weight: 293,
      date: "01/19/2023",
    },
  ],
];

// date 03/23/2022

// 07/20/2022, 175

const oneYearBatchLogs = [
  [
    {
      weight: 169,
      date: "07/20/2022",
    },
    {
      weight: 171,
      date: "07/20/2022",
    },
    {
      weight: 175,
      date: "07/20/2022",
    },
    {
      weight: 173,
      date: "07/20/2022",
    },
    {
      weight: 171,
      date: "07/20/2022",
    },
    {
      weight: 174,
      date: "07/20/2022",
    },
    {
      weight: 169,
      date: "07/20/2022",
    },
    {
      weight: 172,
      date: "07/20/2022",
    },
    {
      weight: 173,
      date: "07/20/2022",
    },
    {
      weight: 170,
      date: "07/20/2022",
    },
    {
      weight: 171,
      date: "07/20/2022",
    },
    {
      weight: 173,
      date: "07/20/2022",
    },
    {
      weight: 173,
      date: "07/20/2022",
    },
    {
      weight: 174,
      date: "07/20/2022",
    },
    {
      weight: 174,
      date: "07/20/2022",
    },
    {
      weight: 175,
      date: "07/20/2022",
    },
    {
      weight: 172,
      date: "07/20/2022",
    },
    {
      weight: 172,
      date: "07/20/2022",
    },
    {
      weight: 172,
      date: "07/20/2022",
    },
    {
      weight: 172,
      date: "07/20/2022",
    },
  ],
  [
    {
      weight: 214,
      date: "11/20/2022",
    },
    {
      weight: 217,
      date: "11/20/2022",
    },
    {
      weight: 220,
      date: "11/20/2022",
    },
    {
      weight: 216,
      date: "11/20/2022",
    },
    {
      weight: 214,
      date: "11/20/2022",
    },
    {
      weight: 219,
      date: "11/20/2022",
    },
    {
      weight: 217,
      date: "11/20/2022",
    },
    {
      weight: 213,
      date: "11/20/2022",
    },
    {
      weight: 219,
      date: "11/20/2022",
    },
    {
      weight: 215,
      date: "11/20/2022",
    },
    {
      weight: 217,
      date: "11/20/2022",
    },
    {
      weight: 214,
      date: "11/20/2022",
    },
    {
      weight: 217,
      date: "11/20/2022",
    },
    {
      weight: 216,
      date: "11/20/2022",
    },
    {
      weight: 217,
      date: "11/20/2022",
    },
    {
      weight: 217,
      date: "11/20/2022",
    },
    {
      weight: 215,
      date: "11/20/2022",
    },
    {
      weight: 218,
      date: "11/20/2022",
    },
    {
      weight: 215,
      date: "11/20/2022",
    },
    {
      weight: 219,
      date: "11/20/2022",
    },
  ],
];

// date 08/02/2022
// 12/04/2022, 175
const sixMonthsBatchLogs = [
  [
    {
      weight: 159,
      date: "12/04/2022",
    },
    {
      weight: 170,
      date: "12/04/2022",
    },
    {
      weight: 163,
      date: "12/04/2022",
    },
    {
      weight: 168,
      date: "12/04/2022",
    },
    {
      weight: 159,
      date: "12/04/2022",
    },
    {
      weight: 170,
      date: "12/04/2022",
    },
    {
      weight: 169,
      date: "12/04/2022",
    },
    {
      weight: 162,
      date: "12/04/2022",
    },
    {
      weight: 161,
      date: "12/04/2022",
    },
    {
      weight: 158,
      date: "12/04/2022",
    },
    {
      weight: 171,
      date: "12/04/2022",
    },
    {
      weight: 166,
      date: "12/04/2022",
    },
    {
      weight: 165,
      date: "12/04/2022",
    },
    {
      weight: 158,
      date: "12/04/2022",
    },
    {
      weight: 163,
      date: "12/04/2022",
    },
    {
      weight: 171,
      date: "12/04/2022",
    },
    {
      weight: 165,
      date: "12/04/2022",
    },
    {
      weight: 171,
      date: "12/04/2022",
    },
    {
      weight: 170,
      date: "12/04/2022",
    },
    {
      weight: 164,
      date: "12/04/2022",
    },
  ],
];

const threeYearsBatch = {
  seller: "Fazenda Sao Francisco",
  date: "9/14/2019",
  rate: 249,
};

const oneYearAndAHalfBatch = {
  seller: "San Marino",
  date: "10/24/2021",
  rate: 255,
};

const oneYearBatch = {
  seller: "Joe Doe",
  date: "03/23/2022",
  rate: 261,
};

const sixMonthsBatch = {
  seller: "Fazenda Antunes",
  date: "08/02/2022",
  rate: 259,
};

const pastures = [
  { name: "Lowland", condition: "good", area: 342 },
  { name: "High hills", condition: "good", area: 543 },
  { name: "Deep Lake", condition: "good", area: 437 },
];

require("dotenv").config();

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successul!");
  });

const db = mongoose.connection;

const createPastures = async (pastures) => {
  try {
    for (const pasture of pastures) {
      await Pasture.create(pasture);
    }
  } catch (error) {
    console.log(error);
  }
};

const calculateBatchTotalPrice = async (batchId) => {
  try {
    const batch = await Batch.findById(batchId).populate("cattle");
    if (batch.cattle.length > 0) {
      let total = 0;

      for (const animal of batch.cattle) {
        await Animal.findByIdAndUpdate(animal._id, {
          batch: batch._id,
        });
        total += animal.initialPrice;
      }

      batch.total = total;
      await batch.save();
    } else {
      batch.total = 0;
      await batch.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const addWeightLog = async (animalID, log) => {
  try {
    const { weight, date } = log;
    const doc = await Animal.findById(animalID);

    if (!doc) throw new Error("No document found with this id.");

    doc.weightLog.push({ weight, date });

    // update current weight with latest log (date wise, not createdAt wise)
    doc.weightLog.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });

    // update current weight with latest log (date wise, not createdAt wise)
    doc.currentWeight = doc.weightLog.at(-1).weight;

    const monthDiff = getMonthDiff(doc.dateOfPurchase, new Date(date));

    console.log(monthDiff);

    // Compounding Monthly Growth Rate
    // CMGR = (Final Month Value / Initial Month Value) ^ (1 / # of Months) – 1
    const averageMonthlyGrowth =
      (Math.pow(
        doc.weightLog.at(-1).weight / doc.initialWeight,
        1 / monthDiff
      ) -
        1) *
      100;

    doc.averageMonthlyGrowth = averageMonthlyGrowth;

    await doc.save();
  } catch (error) {
    console.log(error);
  }
};

const createBatchesWithAnimals = async (batch, animals, weightLogs) => {
  try {
    //

    const { date, rate } = batch;
    // create animals
    for (const index in animals) {
      animals[index].dateOfPurchase = date;
      animals[index].priceRatio = rate;
    }

    // animals created
    const newAnimals = await Animal.create(animals);
    const newAnimalsIDS = newAnimals.map((animal) => animal._id.toString());

    // create new batch
    const newBatch = await Batch.create(batch);
    newBatch.cattle = newAnimalsIDS;
    await newBatch.save();

    await calculateBatchTotalPrice(newBatch._id);

    for (const index in weightLogs) {
      for (const i in newAnimals) {
        await addWeightLog(newAnimals[i]._id, weightLogs[index][i]);
      }
    }

    // add weightLogs into each animal
  } catch (error) {
    console.log(error);
  }
};

createPastures(pastures);
createBatchesWithAnimals(threeYearsBatch, batchOneAnimals, threeYearsBatchLogs);
createBatchesWithAnimals(
  oneYearAndAHalfBatch,
  batchTwoAnimals,
  oneYearAndAHalfBatchLogs
);
createBatchesWithAnimals(oneYearBatch, batchThreeAnimals, oneYearBatchLogs);
createBatchesWithAnimals(sixMonthsBatch, batchFourAnimals, sixMonthsBatchLogs);

const deleteAllData = async () => {
  try {
    await Animal.deleteMany({});
    await Batch.deleteMany({});
    await Pasture.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

// create pastures, then create batches, batch -> add animals to batch, updating each animal with date and rate.

// 4 batches, 1 batch 3 years, 1 1.5, 1 1 year, 1 6 months
//               6 weightLogs,   4 wL,   3,         1

// 14 - 20 animals
// scripts to create pastures first (4 pastures)
// scripts to create batch + add animals into it + move animals into different pastures + add weightLogs into each animal

// peso vivo de abate, 18 @ ~ 540kg (540/2)/15
// media de 40kg ganhos a cada weight log, com time span de 4 meses

// 1/15/2020 - 20 animals, 9 weightLogs
// 1/15/2020 5/2020 9/2020 1/2021 5/2021 9/2021 1/2022 5/2022 9/2022
// 135 - 175, 215, 255 - 295, 335, 375, - 415, 455, 495, - 535
