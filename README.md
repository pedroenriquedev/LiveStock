# Livestock Managment App

Tool to help farmers with tracking their inventory and cattle growth.

## Tech Stack

- Next JS, ExpressJS/NodeJS, Mongoose/MongoDB, CSS Modules.
- React ChartJS, Framer Motion.

## Live Demo

https://livestockapp.vercel.app/

#### Showcase

![Livestock Demo](demo/livestock.gif)

## About

My dad is a farmer back in Brazil and he manages his inventory with pen and paper, making it difficult to keep track of everything across numerous sheets. To assist him (and myself), I created an app that enables us to record cattle growth, health, purchases, sales, and even estimate profits.

## Features

Client users can:

- Add individual animals with name, color, breed, weight, date of purchase, rate, health condition and description.
- Add batches with animals, seller, notes and purchase date.
- Add pastures with name, condition and area.
- Visualize averages: active cattle weight and monthly growth.
- Visualize total investment (active cattle).
- Sort and filter animals.
- Add weight logs to an animal and keep track of it with visualized data.
- Move/Remove/Add animals to pastures
- Simulate a sale and visualize investments, profits and growth.

With the API, you could get/add/remove/edit animals, batches and pastures, as well as add and removing weight logs.
Check out this Postman documentation for more info on the API: https://documenter.getpostman.com/view/12400552/2s93RQTu4s#intro

## Installation

You'll need a MongoDB account in order to run the app.

#### Environment Variables

To run this project, you will need to add the following environment variables:

To your /api/.env file:

`DATABASE` - Your MongoDB connection string.

`DATABASE_PASSWORD` - Your MongoDB password. We will replace the <password> in the connection string with this.

`PORT` - (optional) The port you'll run the app locally.

To your /ui/.env.local file:

`API_BASE_URL` - Your base URL for client requests in the ui/utils/axios.js file

#### Run Locally

Clone the project

```bash
  git clone https://github.com/pedroenriquedev/LiveStock.git
```

Go to the project directory

```bash
  cd my-project
```

```bash
  cd api
```

Install server dependencies

```bash
  npm install
```

Install client dependencies

```bash
  cd ..
```

```bash
  cd ui
```

```bash
  npm install
```

Start the client

```bash
  npm run dev
```

Start the server

```bash
  npm run server
```

## Support

For support, please email pedroenriquedev@gmail.com.
