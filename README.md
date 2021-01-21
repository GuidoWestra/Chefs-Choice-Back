# Chefs-Choice-Back
:deciduous_tree: Back-end Repository of the Chefs Choice App <br />
:checkered_flag: Deployed to heroku on: 20-01-21! <br />
# :wrench:Instructions: 
## backend-db runs on sequelize-cli. 
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all <br/>
:warning:Hard reset.
- npx sequelize-cli db:migrate:undo:all<br/>
## server runs on express: 
used endpoints: 
- /authRouter
  - /login
  - /signUp
- /recipe (this endpoint uses auth middleware)
  - /list
  - /toggle
<br />
running npm start, starts the server. 
<br />
<br />
Link to front end: https://github.com/GuidoWestra/Chefs-Choice-Front
