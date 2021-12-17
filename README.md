# [Dashboard - task monitoring application](https://dashboard-pwa.herokuapp.com)

Project of the **task monitoring panel**. I created a web application that allows user to create tasks, delegate them to be performed by members of a group of people, monitor the status of their implementation with the possibility of commenting.

User can perform actions on the task:
- track,
- observe the statistics,
- assign to a user,
- monitor the progress of the task,
- comment,
- add attachments,
- manage task status.

## Project features:
* Data stored in the MongoDB Atlas cloud database
* Full responsiveness (RWD)
* Security (JWT token)
* Application written in accordance with PWA rules. The application can be installed as a desktop application on a computer or as a mobile application on smartphones.
* The website is available at the website on the heroku platform (https://dashboard-pwa.herokuapp.com).

## Used technologies:
- client: React Typescript, Bulma
- server: NodeJS, Express.js, MongoDB, Mongoose
- deploy: Heroku platform

## Installation
```bash
git clone https://github.com/filiplipinski/dashboard.git dashboard
cd tree-view-rest-api
npm run install-app
npm run start-app
open: http://localhost:3000
```
