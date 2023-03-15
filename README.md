# EmployeeSRMonoRepo

Recommendation system that helps to identify, recommend and describe the contact details of people who work in the footwear sector.

**Table of content:**
- [Technologies](#technologies)
- [Prerequisite](#prerequisite)
- [Firebase project](#firebase-project)
    - [Cloud Firestore](#firebase-project)
        - [Collections](#collections)
            - [certifications](#certifications)
            - [cities](#cities)
            - [companies](#companies)
            - [company_classification](#company_classification)
            - [education](#education)
            - [employees](#employees)
            - [experiences](#experiences)
            - [profiles](#profiles)
            - [ratings](#ratings)
    - [Authentication](#authentication)
- [Firebase project](#firebase-project)
- [Install Dependencies](#install-dependencies)
- [API workspace](#API-workspace)
    - [Add firebase private key](#add-firebase-private-key)
- [App workspace](#App-workspace)
    - [Add firebase authentication](#add-firebase-authentication)
- [Run API](#run-API)
- [Run APP](#run-APP)
- [Further help](#help)
- [Demo](#demo)

<a id="technologies"></a>
## Technologies
- Ionic
- Angular
- Firebase authentication
- Nodejs
- Express
- Python(recommendation script)

<a id="prerequisite"></a>
## Prerequisite
- Node 15+
- Python 3
- Angular 15+
- Ionic 6+
- Firebase project

<a id="firebase-project"></a>
## Firebase project

<a id="cloud-firestore"></a>
### Cloud Firestore
<a id="collections"></a>
#### Collections
<a id="certifications"></a>
##### certifications

|        field        |  type  |
| :-----------------: | :----: |
|     employeeId      | string |
|      issueDate      | string |
| issuingOrganization | string |
|        name         | string |
<a id="cities"></a>
##### cities

| field |  type  |
| :---: | :----: |
| name  | string |
<a id="companies"></a>
##### companies

|      field       |  type  |
| :--------------: | :----: |
|    cellphone     | string |
| classificationId | string |
|   creationDate   | string |
| employeesNumber  | number |
|       name       | string |
|       nit        | string |
|       web        | string |
<a id="company_classification"></a>
##### company_classification

| field |  type  |
| :---: | :----: |
| name  | string |
<a id="education"></a>
##### education

|   field    |  type  |
| :--------: | :----: |
|   degree   | string |
| employeeId | string |
|  endDate   | string |
|   school   | string |
| startDate  | string |
<a id="employees"></a>
##### employees

|   field    |   type    |
| :--------: | :-------: |
|   about    |  string   |
| accountId  |  string   |
| cellphone  |  string   |
|    city    |  string   |
|   cityId   |  string   |
|   email    |  string   |
|     id     |  string   |
|    name    |  string   |
|  profile   |  string   |
| profileId  |  string   |
|   skills   |   array   |
| softSkills |   array   |
| timestamp  | timestamp |
<a id="experiences"></a>
##### experiences

|    field    |  type  |
| :---------: | :----: |
| companyName | string |
| employeeId  | string |
|   endDate   | string |
|  startDate  | string |
|    title    | string |
<a id="profiles"></a>
##### profiles

| field |  type  |
| :---: | :----: |
| name  | string |
<a id="ratings"></a>
##### ratings

|    field     |  type  |
| :----------: | :----: |
|  companyId   | string |
| creationDate | string |
|  employeeId  | string |
|    rating    | string |

You can find the data to fill the collections in the next path:

___resources\data___
<a id="authentication"></a>
### Authentication

Enable the sing in method email and password

<a id="install-dependencies"></a>
## Install Dependencies
From the root run the command:
```
npm install
```

<a id="API-workspace"></a>
## API workspace
<a id="add-firebase-private-key"></a>
### Add firebase private key

To connect with the Firebase admin SDK, you have to generate a private key from your Firebase project.

Once you have the generated private key, change the name and put it in the next path:

___api\src\firebase\serviceAccountKey.json___

### Create .env file
Create an environment file called .env in the api folder and add the following variables:

```
PORT=YOUR_PORT // Change YOUR_PORT for your port
JWT_KEY=YOUR_KEY // Change YOUR_KEY for your jwt key
```


<a id="App-workspace"></a>
## App workspace
<a id="add-firebase-authentication"></a>
### Add firebase authentication

Add firebase authentication by [@angular/fire](https://www.npmjs.com/package/@angular/fire)

<a id="run-API"></a>
## Run API
```
npm start
```

<a id="run-APP"></a>
## Run APP
```
npm start:app
```

<a id="demo"></a>
## Demo
The [demo](https://drive.google.com/file/d/1tkhLc0RmRojGf1frQbPqASVmwKQDi0IZ/view?usp=sharing) is in Spanish

<a id="help"></a>
## Further help

To get more help on the ionic framework CLI go check out the [ionic framework](https://ionicframework.com) page.