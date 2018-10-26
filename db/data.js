const users = [
  {
    "_id": "5bd0d2aba2d56500158d10aa",
    "username": "foobar",
    "password": "$2a$11$Y2Hxg3G8SDsmL3mBmCzkvuJp8yaNLHWG4Qvm3Booq1xJyAX4CDMmm"
  },
  {
    "_id": "5bd0d6b6fc9e5e00157f536a",
    "username": "demo",
    "password": "$2a$11$wujvNIxGzS5LPPev5Cv2.eAaiakPV6ZRIYQKzD7AZnOc6lkfy2br6",
  },
  {
    "_id": "5bd0f03f4f01400015b8d022",
    "username": "Ryan",
    "password": "$2a$11$gj0lq/aGNPrUWHpRZI5uIOGdWWEANYDzzRQ/4hb3Umkt4xfXUYeUe",
  }
];

const recipes = [{
  "_id": "5bd0d2d9a2d56500158d10ab",
  "healthLabels": [
    "Sugar-Conscious",
    "Vegan",
    "Vegetarian",
    "Peanut-Free",
    "Tree-Nut-Free",
    "Alcohol-Free"
  ],
  "ingredientLines": [
    "1 Tbs. minced red onion",
    "Kosher salt and freshly ground black pepper",
    "4 medium navel or Valencia oranges",
    "1 medium ripe avocado, thinly sliced",
    "1 Tbs. red-wine vinegar",
    "5 oz. mâche (about 6 loosely packed cups)",
    "3 Tbs. extra-virgin olive oil"
  ],
  "label": "Orange Avacado Mache Salad",
  "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_995f202eac5d10c45288ce23d4e0671c",
  "image": "https://www.edamam.com/web-img/b43/b4347216c2c8efa3f7b1e80327c2bfd8.jpg",
  "source": "Fine Cooking",
  "url": "http://www.finecooking.com/recipes/orange-avocado-mache-salad.aspx",
  "userId": "5bd0d2aba2d56500158d10aa"
},
{
  "_id": "5bd0f08d4f01400015b8d024",
  "healthLabels": [],
  "ingredientLines": [
    "Pork Butt",
    "Cow Roast",
    "Chicken thighs"

  ],
  "label": "Moar butt",
  "instructions": "Cook Dem butts",
  "userId": "5bd0f03f4f01400015b8d022"
}
];

module.exports = {
  users,
  recipes
};
