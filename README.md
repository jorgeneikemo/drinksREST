# About
REST API created with expressjs and mysql. Database using the Third normal form for associations. An api for getting, posting, putting and deleting different cocktails. The API supports querying by name and ingredients. It also supports pagination in the form of size and page (limit and offset). You can get a cocktail by id or delete it by id.

# Technologies Used
* Node.js
* Express.js
* MySQL
* Sequelize

# Application Installation and Usage Instructions

1. Clone the repository
2. Install NPM packages
   ```
   npm install
   ```
3. Create the cocktails database in mysql.
   ```sql
   CREATE DATABASE cocktails;
   ```
4. Create .env file and add the environment variables provided below.
5. Run the app to create all the tables in the database
   ```js
   npm start
   ```
6. Populate the database with the expample data provided below.
7. Call the API

# Environment Variables
```sh
DATABASE_USERNAME = "username"
DATABASE_PASSWORD = "password"
DATABASE_NAME = "cocktails"
DIALECT = "mysql"
DIALECTMODEL = "mysql2"
PORT = "3000"
HOST = "localhost"
```

# Api Endpoints

* ``GET /api/cocktails``: Retrieves a list of all cocktails.
* ``GET /api/cocktails/:id``: Retrieves a specific cocktail by ID.
* ``GET /api/cocktails?name=name``: queries by name
* ``GET /api/cocktails?ingredients=ingredient, ingreedient``: queries by ingredients
* ``GET /api/cocktails?page=1&size=2``: pagination for page and size
* ``POST /api/cocktails``: Creates a new cocktail.
* ``PUT /api/cocktails/:id``: Updates a cocktail by ID.
* ``DELETE /api/cocktails/:id``: Deletes a cocktail by ID.

## Examples
* Post example:
```json

     {
        "name": "Radler",
        "description": "A popular drink.",
        "img": "https://www.spectator.co.uk/wp-content/uploads/2023/05/Drink-iStock.jpg",
        "ingredients": [
            {
                "name": "Sprite",
                "cocktailIngredient": {
                    "quantity": "300 ml"
                }
            },
            {
                "name": "Beer",
                "cocktailIngredient": {
                    "quantity": "500 ml"
                }
            }]
     }
```

* Put example
```json
     {
        "name": "Radler v.2",
        "description": "A very nice drink.",
        "img": "https://www.spectator.co.uk/wp-content/uploads/2023/05/Drink-iStock.jpg",
        "ingredients": [
            {
                "name": "Sprite",
                "cocktailIngredient": {
                    "quantity": "50 ml"
                }
            },
            {
                "name": "Beer",
                "cocktailIngredient": {
                    "quantity": "1000 ml"
                }
            },
            {
                "name": "Lime",
                "cocktailIngredient": {
                    "quantity": "A generous squeeze"
                }
            }]
     }
```

## Database structure
![database structure](https://github.com/jorgeneikemo/drinksREST/blob/master/db_diagram.png?raw=true)

## Database example insert
```sql
INSERT INTO cocktails (name, description, img) VALUES 
("Mojito", "A Cuban classic, the Mojito is a refreshing blend of rum, mint, lime, sugar, and soda water", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg"),
("Margarita", "A popular tequila-based cocktail, Margarita is a blend of tequila, lime juice, and Cointreau, served with salt on the rim of the glass", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg"),
("Bloody Mary", "A classic brunch cocktail, the Bloody Mary is a mix of vodka, tomato juice, and various spices", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg"),
("Negroni", "An Italian classic, the Negroni is a bitter blend of gin, vermouth rosso, and Campari", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg"),
("Pina Colada", "A tropical favorite, the Pina Colada mixes rum, coconut milk, and pineapple juice", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg"),
("Daiquiri", "A classic rum cocktail, the Daiquiri is a sweet and sour blend of rum, lime juice, and simple syrup", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg"),
("Martini", "A classic cocktail, the Martini is a strong blend of gin and vermouth, garnished with an olive or a lemon twist", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg"),
("Cosmopolitan", "A sophisticated vodka cocktail, the Cosmopolitan mixes vodka, triple sec, cranberry juice, and lime juice", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg"),
("Whiskey Sour", "A classic whiskey cocktail, the Whiskey Sour blends whiskey, lemon juice, and sugar, topped with a dash of egg white", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg"),
("Old Fashioned", "A true classic, the Old Fashioned is a simple blend of whiskey, sugar, and bitters, garnished with an orange twist", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg");

INSERT INTO ingredients (name) VALUES 
("Rum"), ("Mint"),("Sugar"),("Lime"),("Soda Water"),("Tequila"),("Cointreau"),("Vodka"),
("Tomato Juice"),("Spices"),("Gin"),("Vermouth Rosso"),("Campari"),("Coconut Milk"),
("Pineapple Juice"),("Triple Sec"),("Cranberry Juice"),("Whiskey"),("Egg White"),
("Bitters"),("Orange Twist");

INSERT INTO cocktailIngredients (cocktailId, ingredientId, quantity) VALUES
(1, 1, '50 ml'), (1, 2, '10 g'),(1, 3, '2 teaspoons'),(1, 4, '30 ml'),(1, 5, 'Top up'),
(2, 6, '50 ml'),(2, 7, '20 ml'),(2, 4, '15 ml'),(3, 8, '50 ml'),(3, 9, '100 ml'),(3, 10, 'To taste'),
(4, 11, '30 ml'),(4, 12, '30 ml'),(4, 13, '30 ml'),(5, 1, '50 ml'),(5, 14, '50 ml'),(5, 15, '50 ml'),
(6, 1, '45 ml'),(6, 4, '25 ml'),(6, 3, '15 ml'),(7, 11, '60 ml'),(7, 12, '20 ml'),(8, 8, '40 ml'),
(8, 16, '20 ml'),(8, 17, '20 ml'),(8, 4, '10 ml'),(9, 18, '50 ml'),(9, 4, '20 ml'),(9, 3, '20 ml'),
(9, 19, 'A dash'),(10, 18, '60 ml'),(10, 3, '1 sugar cube'),(10, 20, '2 dashes'),(10, 21, '1 twist');


```