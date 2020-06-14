# MoodPanda

CS2102 AY2019/2020, Semester 2 Database Project

## Introduction

This is a simulated web-based database application for a food delivery service.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), Express server and PostgresSQL as the database.

## Setup and Usage

### Requirements

Ensure that you have the following installed before running the application:

- [NodeJs](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Set up local database

1. Install PostgresSQL
2. Create a local database `moodpandadb` by typing `create database moodpandadb;` in your psql terminal. Type `\c moodpandadb` to connect to the database. Alternatively, you can use pgadmin.

### Start backend

`npm` is used as the package manager for the backend.

1. Install required dependencies using `npm install`.
2. Navigate to ./Server and type the command `npm run builddb` to build the database and load data for the application.
3. Type `npm run devstart` to start the backend application on your local host.

### Start frontend

packages are manaed using `yarn`

1. Install required dependecies using `yarn install`
2. Navigate to ./Client and type the command `yarn build` to build the application for production to the `build` folder.
3. Type the command `yarn start` to run the frontend application on your local host **localhost:3000**.

The application should be running in your browser now and an alert box should popup to notify that you are connected.
<br />
Refer to the image below for what your browser should look like.

![Screenshot](img/chrome_54tfZ9gSjO.png)

### Usage

Open [http://localhost:3000](http://localhost:3000) to view the web application in the browser.

## Team

- [Lim Jiayi Tamelly](https://github.com/termehlee)
- [Tay Jin Wen](https://github.com/jinwentay)
- [Teo Wei Jie Shaun](https://github.com/shaun97)
- [Weng Kexin](https://github.com/Weng-Kexin)
