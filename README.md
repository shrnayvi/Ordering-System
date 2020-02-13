# Ordering System
  Ordering system for a certain event.

> NodeJS, express, REST API with JWT Authentication and mongodb support with mongoose

- Authentication via [JWT](https://jwt.io/)

## Installation Guide

```
# clone repository
$ git clone https://github.com/shrnayvi/Ordering-System.git

# copy and modify the .env.example from server folter to .env in the same folder
```

**- Server**
```
$ cd server

# install dependencies
$ yarn

# start server
$ yarn start
```

**- Client**
```
$ cd client

# install dependencies
$ yarn

# start client
$ yarn start
```

## Folder Structure(Server)

- api - for controllers, emails, middlewares, models, responses, utils and validations.
- config - for routes, database, initializing the server etc

## Folder Structure(Client)
- src - for actions, apiCalls, assets, components, constants, helpers, locales, reducers.

## Authentication
Login using rest api endpoint `/users/login`
Get the JWT token and use this token under HTTP header: 
```
{"Authorization": "Bearer <token>"}
```

## Tool Used for aliasing(Server)
- module-alias: https://www.npmjs.com/package/module-alias


## Tool Used for internationalization(Client)
- react-intl: https://www.npmjs.com/package/react-intl
