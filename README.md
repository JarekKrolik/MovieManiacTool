
# MovieManiac Backend


Backend for MovieManiac application.

[![My Skills](https://skillicons.dev/icons?i=express,js,mysql,nodejs,ts)](https://skillicons.dev)

App functions :
- creating and managing users accounts
- handling user verification, loggin-in, loggin-out, reseting passwords, sending emails to users,
- storing user data in mySQL database using password hashing and  variables place-holders for preventing SQL-injection attacks
- handling comments: adding, editing and deleting
- handling likes and dislikes for comments


[screenVideo.webm](https://user-images.githubusercontent.com/101992103/229598204-328cc460-91dc-4d2b-8da1-977472303d3b.webm)



## Working application on website address:

https://madmaxlastv8.networkmanager.pl/

## For testing without making account
user : TestUser
password :TestUser


## Related

Front - End for MovieManiac

https://github.com/JarekKrolik/MovieManiacsFrontEnd.git

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```
```bash
  import sql database from sql_database folder in repository
```
```bash
  configure database config file in MovieManiac\utils\config\db.config.ts to link backend and database
```

Start the server

```bash
  npm run start
```

Go to https://github.com/JarekKrolik/MovieManiacsFrontEnd.git to get front-end part of application
