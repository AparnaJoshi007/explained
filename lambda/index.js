const { REVUE_KEY } = process.env;
const fetch = require("node-fetch");

const API_ENDPOINT = "https://www.getrevue.co";

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Accept, Content-Type, Access-Control-Allow-Origin, Origin', 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Max-Age': '2592000',
    'Access-Control-Allow-Credentials': 'true'
  };

  if (event.httpMethod === 'OPTIONS') {
    callback(null, { statusCode: '204', headers });
    return;
  }

  if(event.httpMethod === 'POST') {
    const { email } = JSON.parse(event.body) || "";
    const { name } = JSON.parse(event.body) || "";

    return  fetch(`${API_ENDPOINT}/api/v2/subscribers`, {
        method: 'POST',  
        headers: {
            'Authorization': `Token ${REVUE_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "name": name,
            "double_opt_in": true
        })
    })
    .then(res => {res.headers = headers; return res; })
    .catch(error => ({ statusCode: 422, body: String(error) }));
  }
};