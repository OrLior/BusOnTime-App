App: main starting point of the react app, contains react-router-dom components for setting up the several pages of the app and switching between them
also renders Nav.js outside of the pages, since it is always displayed
currently "/" (home) is set to Page1.js

App.css: contains all the css for the app and all the pages and components within it

index.js: the js file which renders the initial app function to launch the application

Page1.js: this file renders the performance measures for specific bus lines. it contains a multi step form which requires to be completed before fetching the appropriate data and displaying it using a custom table component.

Page2.js: this file renders the page which displays accuracy measure per operator/cluster, with optional date included as well. it displays it using a table component

Page3.js: this file renders the page which displays accuracy measure by line, with optional choice of focusing on a specific operator, cluster, date, or a combination of them. it displays it using a table component

Page4.js: this file renders the page which displays the spread of lines for each delay time, optional choice of focusing on a specific operator or cluster, and date. it displays it using a table component

Components Folder; -contains all the custom made react components for the application
Nav.js: this components render the navigation bar at the top of each page, contains the logo and navigation to each page for the application

MultiStepForm.js: this component renders the multi step form used in page 1. Props given are the data required by the form to fetch (according to all the form inputs) and set methods for the data. This component utilizes logic for determining how and when to proceed and fetch the next input option on the form.
there are 4 subsequent steps- choosing a date and operator, then choosing a specific line, then the route MKT, and finally choosing the direction (last step is optional, as "All" is also possible).
Once the choices are submitted via a button, a request is sent to the API to grab the appropriate data, this data is then finally set into our given prop, so it may be used by who rendered this component

Select.js: this component renders a series of select tags, determined by props given, and changes the selected option with a given setSelected function

SubmitButton.js: this component renders a simple styled submit button with a prop of an onSubmit function

ResetButton.js: this component renders a simple styled reset submit button with a prop of an onSubmit function

ToggleButton.js: this component renders a styled toggle button for 2 states, each state corresponds to text on the button, changes the state of given props for the states

Table.js: this component renders a data table with columns and data given as props. this table component uses an external react hook called react-table in order to create a big functional data table quickly. this table supports sorting by columns (asc/desc) and filtering by a specific column, there is also support to choose which columns to display or to hide.


Resources Folder; -contains files relating to available external resources
operators.js: file containing all the known and available bus operators as a json
clusters.js: file containing all the known and available bus clusters as a json
logo.png: logo to be used on display in the application