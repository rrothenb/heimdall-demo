'use strict';

const axios = require('axios');

module.exports.getToken = async (event, context, callback) => {
  const response = await axios.get('/url', {
    baseURL: 'https://heimdall.stgc0.uswest2.c-e.works/v1/api/',
    headers: {
      authorization: `User ${process.env.userToken}, Organization ${process.env.orgToken}`
    },
    params: {
      elementKey: 'desk',
      uniqueName: 'My Instance'
    }
  });

  callback(null, {
    statusCode: 200,
    body: response.data.token
  });
};

module.exports.getPage = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: `
<!DOCTYPE html>
<html>
<head>
  <title>Heimdall Demo</title>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://heimdall.cloud-elements.com/v1/public/javascripts/heimdall-sdk-staging.js" type="text/javascript"></script>
  <script>
    const callback = function(instance) {
      document.body.innerHTML = \`<pre>\${JSON.stringify(instance, null, 4)}</pre>\`
    }

    axios.get('/dev/token')
      .then(r => {
        CE.createInstance({
          token: r.data
        }, callback);
      })
      .catch(err => console.log(err))
  </script>

</head>
<body>

Working...

</body>
</html>
    `
  });
};