# EmployeeSRMonoRepo
Recommendation system that helps to identify, recommend and describe the contact details of people who work in the footwear sector.

## Technologies
* Ionic
* Angular
* Firebase authentication
* Nodejs
* Express
* Python(recommendation script)

## Prerequisite
* Node 15+
* Python 3
* Angular 15+
* Ionic 6+
* Firebase project

## Firebase project
### Cloud Firestore
Should create these collections with at least one register:
#### cities
| fields  | type   |
| :-----: | :---:  |
| name    | string |
#### company_classification
| fields  | type   |
| :-----: | :---:  |
| name    | string |
#### profiles
| fields  | type   |
| :-----: | :---:  |
| name    | string |
### Authentication
Enable the sing in method email and password

## Install Dependencies
```
npm install --legacy-peer-deps
```

## API workspace
### Add firebase private key
To connect with the Firebase admin SDK, you have to generate a private key from your Firebase project.

Once you have the generated private key, change the name and put it in the next path:

-> api\src\firebase\serviceAccountKey.json
## App workspace
### Add firebase authentication
Add firebase authentication by [@angular/fire](https://www.npmjs.com/package/@angular/fire)
