# ITMD 565 Fall 2018 - Stock Analyzer App

Application was created by [Jarron Bailey](https://github.com/jarronb), [Abigail Boyer](https://github.com/abigailboyer), [Gowtham Manivela](https://github.com/GowthamManivelan).

- [Set-up](#getting-started) – How to set up enviroment.

<!-- Description -->

## Quick Overview

Digging into what this projects holds.  
This project features Continuous Integration stemming from [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Travis CI](https://travis-ci.org/).

The app utilizes the [Passport Local Strategy](https://github.com/jaredhanson/passport-local) and [Bcryptjs](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md) libaries to create a saftey measure when storing users passwords.

Another feature of using [Passport](http://www.passportjs.org/) is the abilty to created authenticated routes once you get the authenticated user from passport.

The application also features flash messages after a certain action this was done usin the the [connect-flash](https://github.com/jaredhanson/connect-flash) library.

## Features

1. Heroku Deployment: [https://itmd565-fall2018.herokuapp.com/](https://itmd565-fall2018.herokuapp.com/)
2. Encrypted passwords
3. Authenticated permission for entering routes
4. Notification messages after certain action within the application
5. Adding, Deleting Favorite stocks
6. Search overall market news
7. Search for news related to a specific symbol
8. Register, Delete user account
9. View, Delete history of stocks searched
10. Search for stock by company name
11. Search for stock by company Symbol
12. View top market Gainers
13. View top market Losers
14. View companies that are "In Focus"

## Getting Started

1. [Fork repo](https://github.com/ITMD-562-Fall2018/app) – Click link to go to repo.
2. Clone your forked repo into a local folder on your computer
3. Cd into the folder of the app and continue to the setup section

### Set-up

```sh
npm install
```

### Run Devlopement Instance

```sh
npm run dev
```

## Sample Screenshots

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/signup.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/login.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/home.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/history.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/screen1.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/screen2.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/screen3.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/screen4.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/screen5.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/screen6.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/screen7.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/screen8.png)

![](https://github.com/ITMD-562-Fall2018/FinalProject/blob/master/screenshots/screen9.png)

<!-- ## License -->
