const axios = require('axios');

axios
    .get('https://www.copart.com/public/data/lotdetails/solr/lotImages/30478350/USA', {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(res => {
        console.log(JSON.stringify(res.data));
    })
    .catch(error => {
        console.log(error.data);
    });