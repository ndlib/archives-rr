**Contentful migration scripts for Archives Record Retention Schedule Database**

These should only need to be run when setting up a new space for the Archives Records Retention Schedule DB.


**Install**
```
npm install -g contentful-migration
```
**To run migration:**
```
contentful-migration --space-id 'spaceId' -a 'authToken' migrationFileName.js
```
