## Game hunt is a website where you can share your game development projects!
Link: https://gamehuntappc.herokuapp.com/

- this app is inspired by Product Hunt.
![](/docs/images/homeImg.png)

## Technologies
JavaScript
Express
React
Redux
CSS
Sequelize
PostgreSQL

## Upcoming features
- search page
- upvotes
- link to the website of the content
- more content on the profile page such as video

## Installation

- Install necessary packages for node.js
    - npm install

1. Create the database
2. Install postgres
3. Create a database called codex_app
4. Set password as 'password' or any password. Note: make sure it is the same password as 5. the one in the .env file variables
6. Create a new env file. Use .env.example as a reference.
7. Run migrations: npx dotenv sequelize db:migrate
8. Run seed data for testing: npx dotenv sequelize db:seed:all
9. Start the server: npm start

Database Schema: https://github.com/kvh8899/gameHunt/wiki/Database-Schema

Feature List: https://github.com/kvh8899/gameHunt/wiki/Feature-List

Created by: Kyle Huang