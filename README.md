University of Notre Dame Archives Records Retention Schedule Database Frontend

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To get admin view, your netid needs to belong to an admin group or be in the list of ids at `src/Constants/config.js`

This list is maintained in AWS. To get the latest list locally, assume role and run the following:
```
node ./scripts/buildConfig.js stage=[stage]
```