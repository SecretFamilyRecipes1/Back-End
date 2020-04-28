const cleaner = require("knex-cleaner");

exports.seed = function (knex) {
    return knex("recipes").insert([
        { "user_id": 1,
    "recipe_name": "French Omelette", 
    "description":"delicious French Omelette", 
    "prep_time": "5 minutes",  
    "cook_time": "5 minutes",
    "serving_size": "serves 1",
    "image_url": "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/12/9/0/FNK_French-Omelet_s4x3.jpg.rend.hgtvcom.826.620.suffix/1386784369204.jpeg"
    
    },
=    { "user_id": 1,
"recipe_name": "Japanese Beef Curry", 
"description":"delicious curry JP style", 
"prep_time": "20 minutes", 
"cook_time": "50 minutes",
"serving_size": "serves 4",
"image_url": "https://www.justonecookbook.com/wp-content/uploads/2014/04/Beef-Curry.jpg"

},   { "user_id": 1,
"recipe_name": "Corn chowder", 
"description":"delicious corn chowder", 
"prep_time": "20 minutes", 
"cook_time": "60 minutes",
"serving_size": "serves 6",
"image_url": "https://dinnerthendessert.com/wp-content/uploads/2019/01/Corn-Chowder-with-Bacon-2.jpg"

},
{ "user_id": 1,
"recipe_name": "Kale Chips", 
"description":"aw kaaale no", 
"prep_time": "10 minutes", 
"cook_time": "40 minutes",
"serving_size": "serves 2",
"image_url": "https://images-gmi-pmc.edge-generalmills.com/1e7f0070-f782-42f0-a6e6-f6da2eb218c6.jpg"

}
      ]);
};
