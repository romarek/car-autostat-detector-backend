const axios = require('axios');

axios.get('https://inventoryv2.copart.io/v1/lotImages/37748371?country=us&brand=cprt&yardNumber=1', { headers: {
            'Content-Type': 'application/json'
        }})
            .then(function (response) {
                console.log(response.data.lotImages);
            })
            .catch(function (error) {
                console.log(error);
            })