# taco-recipes

## Demo
There is a live demo [here](https://taco-recipes.herokuapp.com/)

## Getting started
Clone down this repository. You will need `node` and `yarn` installed globally on your machine.

Then simply run `yarn dev` to run both back-end and front-end concurrently.
Or run `yarn server` to run only the back-end, or run `yarn client` to run only the front-end. However no data would show.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

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

## Design Choices
I decided to use the MERN stack for this project because it is what I am familiar with.
Using MongoDB instead of a relational database would allow further editing easier. For example, the application currently only keep tracks of ingredients in the recipe but not the amount. We can easily add an amount in the ingredient object in the future.
I choose to focus a lot on how the application layout. I believe that the layout of the application is very important for user experience.
While I don't have a lot of experience using material-ui, I tried to follow the principle of their design pattern.

## Challenges
I estimate this project took 16 hours in total. I spent some time in the beginning messing around with the front-end with the edamam api before deciding to create my own back-end. I'd guess I spent 5 hours in the back-end and 10 hours on the front-end. I think the most challenging part was the transfer-list I decided to implement in the add-recipe tab. I had to keep track of the selected and also search for ingredients that aren't selected from the database. Using redux helped with this problem.
If I had more time I would probably try to create a color pattern instead of using the default material ui theme. In addition to creating my own alert dialog instead of using the default broswer window to confirm deletion.


