'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

const { PORT, CLIENT_ORIGIN, APP_KEY, APP_ID } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

//Version 1
//app.get('/search', (req, res, next) => {
//  console.log('This is what I\'m searching for', 'req.whatever.query')
//  res.json({hits: [
//    {
//      "recipe": {
//        "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_d93db5768d34b3b11e79cd374b3c9bd9",
//        "label": "Rhubarb Frozen Greek Yogurt Recipe",
//        "image": "https://www.edamam.com/web-img/7f8/7f8b96222ada916a4036b43530d996b2.jpg",
//        "source": "Serious Eats",
//        "url": "http://www.seriouseats.com/recipes/2012/05/rhubarb-and-greek-yogurt-frozen-yogurt-recipe.html",
//        "dietLabels": [
//          "Low-Fat"
//        ],
//        "healthLabels": [
//          "Vegetarian",
//          "Peanut-Free",
//          "Tree-Nut-Free",
//          "Alcohol-Free"
//        ],
//        "ingredientLines": [
//          "1 pound of rhubarb stalks, cut into 1/2-inch slices",
//          "1 1/2 cups Greek yogurt",
//          "2 cups sugar, divided"
//        ],
//        "ingredients": [
//          {
//            "text": "1 pound of rhubarb stalks, cut into 1/2-inch slices",
//            "weight": 453.59237
//          },
//          {
//            "text": "1 1/2 cups Greek yogurt",
//            "weight": 432
//          },
//          {
//            "text": "2 cups sugar, divided",
//            "weight": 400
//          }
//        ]
//      }
//
//    },
//    {
//      "recipe": {
//                        "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_0aec1cbfde50c7762766d7182a84fe77",
//                        "label": "Greek Yogurt Parfait",
//                        "image": "https://www.edamam.com/web-img/7e7/7e7f8b76e93dae3730f6192abd900c9b.jpg",
//                        "source": "Self",
//                        "url": "http://www.self.com/club/recipes/snack/greek-yogurt-parfait",
//                        "shareAs": "http://www.edamam.com/recipe/greek-yogurt-parfait-0aec1cbfde50c7762766d7182a84fe77/greek+yogurt",
//                        "yield": 2,
//        "dietLabels": [
//                              "Low-Fat"
//
//        ],
//        "healthLabels": [
//                              "Vegetarian",
//                              "Peanut-Free",
//                              "Tree-Nut-Free",
//                              "Alcohol-Free"
//
//        ],
//        "cautions": [
//                              "Gluten",
//                              "Wheat"
//
//        ],
//        "ingredientLines": [
//                              "6 oz nonfat plain Greek yogurt",
//                              "1/2 cup chopped pineapple",
//                              "1 tbsp granola"
//
//        ],
//        "ingredients": [
//          {
//                                    "text": "6 oz nonfat plain Greek yogurt",
//                                    "weight": 170.09713875
//
//          },
//          {
//                                    "text": "1/2 cup chopped pineapple",
//                                    "weight": 82.5
//
//          },
//          {
//                                    "text": "1 tbsp granola",
//                                    "weight": 7.6249999998710845
//
//          }
//
//        ]
//      }
//    }]
//  })
//})

//Version 2
//app.get('https://api.edamam.com/search', (req, res, next) => {
//  fetch('htttps://theirapi.com')
//    .then(theirRes => theirRes.json())
//    .then(data => res.json(data));
//  })
//})
const edamamParams = {
  app_id: APP_ID,
  app_key: APP_KEY
};

console.log(edamamParams)
function createUrl(obj) {
  return `https://api.edamam.com/search?q=${obj.q}&app_id=${obj.app_id}&app_key=${obj.app_key}`;
}

app.get('/search', (req, res, next) => {

  const {q} = req.query;

  fetch(createUrl({...edamamParams, q}), {
    method: 'GET',
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));

});



function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
