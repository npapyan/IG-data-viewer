# About
A web application made to display some basic instagram statistics based on uploaded follower/following data.
The application parses uploaded html text from instagrams web application and saves the contents to a database.
Then using the data within the databse, comparisons can be made depending on which dataset is selected.

### Features:
1. See who follows you that doesn't follow you back
2. Swapping datasets can reveal the opposite comparison: Who follows you that you don't follow back.
3. Selecting both datasets of the same type (follower or following) will reveal history based on the dates. This can imply various statistics like who may have changed their name or disabled their account since the first selected dataset's date.

Back-end is made with Java while Angular is used for the front-end interface.

# How to upload data

This application accepts a text upload file with html contents of a list of users

These text files contain the inner html code of a follower or following list from Instagram.
You can get this yourself by following the instructions in the video below:

https://user-images.githubusercontent.com/61075806/144788634-90d8eb8c-aa47-482b-bcc4-a46b1d99e2c8.mp4

Things to keep in mind:
Based on how the Instagram follower list works, it only displays people the poeople who are scrolled into view
So if you want to get the entire list of followers in the html template, you will need to scroll all the way down to the end in the list.

# How to run
## Java Project
1. Java depdencies are handled by maven so when importing the code, make sure maven is specified
2. A Posgresql database is required for this project to work since it stores the names of people within the uploaded files.

#### Configure Database Connection
1. Open src/main/resources/application.properties
2. Set the following properties to your databse config:
spring.datasource.url=jdbc:postgresql://url-to-db
spring.datasource.username=username
spring.datasource.password=password

## Angular
1. Navigate to the WebApp folder: src/main/webapp/
2. Run "npm install"
3. Run "npm start" or "ng serve" to start your angular local server
