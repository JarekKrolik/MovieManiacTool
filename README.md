# MovieManiac project

# Due to imdb disabling free api accounts, my app stopped working 😒


MovieManiac is a simple application for every movie lover.
 - All you need to do is create an account to use it, only user name and email, you do not have to provide any additional personal information.
 - The basic function of the application is a simple search engine that will allow you to find any movie, show or actress/actor that is in the vast IMDB database by title or name.
 - When you find the object of your search, you will get all the information about it that is available in the IMDB database (plot, fullcast, box-office numbers, writers, directors, photos, posters, trailers, similar movies etc)
 - You can create your own list of favorite movies and actors to always have quick access to data about them.
 - There are comment section where you can share your opinions about movies with other MovieManiac users.
 - "Where to watch?" function allows you to search for the availability of a movie on streaming platforms and give a direct link.
 - "What to watch?"  based on the list of your favorite movies, function suggests a title that you should like.
 - Sections "now in cinemas" and "soon and cinemas" as the name suggests, allows you to check what is currently shown in cinemas and what will be soon



# MovieManiac Backend


Backend for MovieManiac application.

[![My Skills](https://skillicons.dev/icons?i=express,js,mysql,nodejs,ts)](https://skillicons.dev)

App functions :
- creating and managing users accounts
- handling user verification, loggin-in, loggin-out, reseting passwords, sending emails to users,
- storing user data in mySQL database using password hashing and  variables place-holders for preventing SQL-injection attacks
- handling comments: adding, editing and deleting
- handling likes and dislikes for comments


[screenVideo (2).webm](https://user-images.githubusercontent.com/101992103/231056423-cd7b96ca-4395-4a53-bfc9-2ce3868539c1.webm)
#

[screenVideo (3).webm](https://user-images.githubusercontent.com/101992103/231056456-90deac18-b035-4dfa-8e50-0bc88bf19c91.webm)

#
![Zrzut ekranu (11)](https://user-images.githubusercontent.com/101992103/231056500-5eda21d2-338c-4f41-9876-ab6ab3d79298.png)



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
  git clone https://github.com/JarekKrolik/MovieManiacTool.git
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
