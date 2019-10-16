## Interest Calculator With Local Storage Implimentation.


## Implemented

- UI that allows a user to enter a loan amount ($500 - $5000)and a
  loan duration (6-24 months) using a slider which then displays the interest rate and the monthly payment.
- The following API is used - `https://ftl-frontend-test.herokuapp.com/interest?amount=<amount>&numMonths=<numMonths>` .       
  This returns a JSON object with information about the monthly payment and the interestrates.
-Recent input values is cached using localstorage and Last history is shown in UI.


### Installing

_Node.JS and npm must be installed.

Follow these steps to run this project in your local computer.

```
$ navigate to project folder
$ npm i
```

Now, to run the project on port `3000`, run:

```
$ npm start
```

Go to `http://localhost:3000` to view the app.

## Tools Used

- [React.JS] - Frontend library used in the project.
- [ReactBootstrap] - Used for basic styling.
- [AXIOS LIBRARY] - Used for making AJAX call.



