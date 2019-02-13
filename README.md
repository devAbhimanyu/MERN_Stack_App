# mern stack app
Using Express with Node to create backendend services.
Mongoose was used to handle all the database related implementations and interactions.
The front end application is build on React 16.7.0. 
Redux has been used to maintain global state. 
Redux Thunk has been used as the middleware to call action creaters.
Routing has been implemented using react-router-dom
React Moment has been used to display dates.
To better optimize the application loading times, React.Lazy has been implemented.

---
Future updates:

Option to leave posts and comment on user profile will be added.

The react version will be updated, and hooks will be implemted to reduce component state dependency.

Messaging feature will be added for the users to interact with each other.

---
Folder Structure:

The client folder is the front-end application:

  *components are statesless functional components
  
  *containers are statefull class based components
  
  *store contains all the reducers and actions for redux
  
  *utility contains common functionalities
  
  *validations contains basic validation files used through the application
