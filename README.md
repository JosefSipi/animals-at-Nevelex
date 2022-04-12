# Dynamically Filled Website with Data from Animal REST API
## Live Link: https://josefsipi.github.io/animals-at-Nevelex/

This website is dynamically filled with data from Animal REST API. Initially when loading the website you are greated with /Animal/List, a list of all animals in the API. This list can be updated by either making an API call to the end point /Animal/Create via the necessary inputs and form submission in the header or the end point /Animal/Delete by first accessing the desired animal by clicking on its tile from the list, /Animal/Id/{id}, and clicking the delete button.

Because of the website's intrinsic simplicity it is built using React.js, utilizing fetch() for HTTP requests and responses as well as being hosted on gitHub Pages.

A small issue encountered during development was related to dynamically updating minimum character input validation in addition to an asynchronous validation for the imageURL input field. 

## Installation

Install and run locally:

Navigate to desired location of project and run:

``` sh
$ get clone https://github.com/JosefSipi/animals-at-Nevelex.git
```

Navigate into project folder:
``` sh
$ cd animals-at-Nevelex
```
Install packages:
``` sh
$ npm install
```
Run start script to launch on localhost:3000/
``` sh
$ npm run start
```
