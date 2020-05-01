# React&Redux skeleton by Jellfedora
Initialize a Create React App project with the minimum configuration for redux, sass and fontawesome
 
## Configuration
Just clone this project and "yarn start" to install and start this project.

### Component
You just have to create a new YourComponent folder in the components directory and create a file: index.(js or jsx), and import: import YourComponent from './components/YourComponent';

### Reducer
Create a new file in src/store/reducer : connexion-reducer.js, import in src/store/reducer/index.js and connect!

### Fontawesome
Import icon in src/components/App and in components and declare <FontAwesomeIcon icon={['fab', 'react']} />

### Sass
To add a new stylesheet file for a class component, create in src/styles/components a file _your-file.scss and import in index.scss.
You can remove the base stylesheet sass files, just remove the files and import in index.scss

## Create React App Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

