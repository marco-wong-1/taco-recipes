# taco-recipes

## Demo
There is a live demo [here](https://taco.app.marco-wong.com/)

## About
This repo contains both Front-end and Back-end for the Taco Recipes App.
The App allows users to create new ingredients and using those ingredients the user can create taco recipes.

## Getting started
Clone down this repository. You will need `node` and `yarn` installed globally on your machine.

Then simply run `yarn dev` to run both back-end and front-end concurrently.
Or run `yarn server` to run only the back-end, or run `yarn client` to run only the front-end. However no data would show.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build
`Build` scripts runs `cd client && yarn && yarn build`, which builds the react app inside the client folder and express serves it in production.

Starting from November 28th 2022, Heroku shut down their free tier.
This app is now hosted on [Railway](https://railway.app/). There is a MongoDB cluster hosted on Railway that differs from the dev MongoDB cluster that is hosted on MongoDB Atlas.

## Functionalities
### Back-end API
| HTTP METHOD | POST            | GET       | PUT         | DELETE |
| ----------- | --------------- | --------- | ----------- | ------ |
| CRUD OP     | CREATE          | READ      | UPDATE      | DELETE |
| /recipe     | Create new recipe | List recipes | Error | Error |
| /recipe/5e80035ccd64060017a33f4c  | Error           | Show recipe with id   | If exists, update recipe | Delete recipe |
| /recipe?ingredient=chicken&category=poultry  | Error           | Show recipes with ingredients name and category matching the params | Error | Error |
| /ingredient     | Create new ingredient | List ingredients | Error | Error |
| /ingredient/5e80035ccd64060017a33f4c  | Error           | Show ingredient with id   | If exists, update ingredient | Delete ingredient |
| /ingredient?ingredient=chicken&category=poultry  | Error           | Show ingredients name and category matching the params | Error | Error |

example: 
* get all recipes: `https://taco-recipes.herokuapp.com/api/recipe` <br />
* get recipe by id: `https://taco-recipes.herokuapp.com/api/recipe/5e80035ccd64060017a33f4c` <br />
* get recipes with ingredient name containing "chicken" and under category "poultry": `https://taco-recipes.herokuapp.com/api/recipe?ingredient=chicken&category=poultry` <br />
* get all ingredients: `https://taco-recipes.herokuapp.com/api/ingredient` <br />
* get ingredient by id: `https://taco-recipes.herokuapp.com/api/ingredient/5e800315cd64060017a33f49` <br />
* get ingredients with name containing "chicken" and under category "poultry": `https://taco-recipes.herokuapp.com/api/ingredient?ingredient=chicken&category=poultry` <br />

### Front-end
The home page display every taco recipes from the database. User could click on individual recipe and have the option of deleting that recipe.
To add a taco recipe, the user is required to put in a name, description, calories and ingredient for the recipe. 
The inventory page shows every ingredient from the database, the user have the option of adding new ingredient to the database aswell.
To add an ingredient, the user is required to put in a name for the ingredient
