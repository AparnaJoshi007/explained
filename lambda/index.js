const { REVUE_KEY } = process.env;
const fetch = require("node-fetch");

const API_ENDPOINT = "https://www.getrevue.co";

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email } = JSON.parse(event.body) || "";
  const { name } = JSON.parse(event.body) || "";

  fetch(`${API_ENDPOINT}/api/v2/subscribers`, {
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
    .catch(error => ({ statusCode: 422, body: String(error) }));

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      };
      
      if (event.httpMethod === 'POST') {
          return {
            statusCode: 200,
            headers
          };
       }
};