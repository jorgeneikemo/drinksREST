# About
REST api created with expressjs and mysql. Database using the Third normal form for associations. An api for getting different cocktails. Can query by name or ingredients. Can also get by :id.

# Installation
```
Clone repository
```
```
npm install
```

# Usage

```
To get all cocktails: /cocktails
```

```
To get cocktail by id: /cocktails/id
```

```
To get cocktail by ingredients: e.g. /cocktails?ingredients=gin
```

```
To get cocktail by name: e.g. /cocktails?name=margarita
```

```
To add a cocktail : post to /cocktails
e.g.

{
    "name": "Radler",
    "ingredients": [
    "Beer",
    "Lerum lemon and lime juice",
    "Club soda"
    ],
    "description": "A refreshing drink."
}
```

# Environment variables
```sh
ADMIN_USERNAME = "username"
ADMIN_PASSWORD = "password"
DATABASE_NAME = "cocktails"
DIALECT = "mysql"
DIALECTMODEL = "mysql2"
PORT = "3000"
HOST = "localhost"
```

# Database example insert
```sql
INSERT INTO cocktails (name, description) VALUES 
("Mojito", "A Cuban classic, the Mojito is a refreshing blend of rum, mint, lime, sugar, and soda water"),
("Margarita", "A popular tequila-based cocktail, Margarita is a blend of tequila, lime juice, and Cointreau, served with salt on the rim of the glass"),
("Bloody Mary", "A classic brunch cocktail, the Bloody Mary is a mix of vodka, tomato juice, and various spices"),
("Negroni", "An Italian classic, the Negroni is a bitter blend of gin, vermouth rosso, and Campari"),
("Pina Colada", "A tropical favorite, the Pina Colada mixes rum, coconut milk, and pineapple juice"),
("Daiquiri", "A classic rum cocktail, the Daiquiri is a sweet and sour blend of rum, lime juice, and simple syrup"),
("Martini", "A classic cocktail, the Martini is a strong blend of gin and vermouth, garnished with an olive or a lemon twist"),
("Cosmopolitan", "A sophisticated vodka cocktail, the Cosmopolitan mixes vodka, triple sec, cranberry juice, and lime juice"),
("Whiskey Sour", "A classic whiskey cocktail, the Whiskey Sour blends whiskey, lemon juice, and sugar, topped with a dash of egg white"),
("Old Fashioned", "A true classic, the Old Fashioned is a simple blend of whiskey, sugar, and bitters, garnished with an orange twist");

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