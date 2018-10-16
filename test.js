const fetch = require('node-fetch');

const edamanRequest = {
  q: 'porkchops',
  app_id: "dd3168dd",
  app_key: "533a3605b43ab19443396e036c3697c7"
};

function createUrl(obj) {
  return `https://api.edamam.com/search?q=${obj.q}&app_id=${obj.app_id}&app_key=${obj.app_key}`;
}

fetch(createUrl(edamanRequest), {
  method: 'GET',
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(res => {
    return res.json();
  })
  .then(json => {
    console.log(json.hits);
  })
  .catch(err => console.log(err));



