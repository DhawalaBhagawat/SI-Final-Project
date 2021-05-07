const express = require('express');
const axios = require('axios').default;
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
    definition: {
        info: {
            title : 'Microsoft Azure LUIS - Swagger Documentation',
            version: '1.0.0',
            description: 'Playground'
        }
    },
    apis: ['app.js']
}

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const endpoint = "https://finalproject-systemintegration.cognitiveservices.azure.com/luis/prediction/v3.0/apps/51937acc-494b-4a85-8018-66ad9956387b/slots/production/predict?subscription-key=6ff7fd9f6bad4557ad7cc760f388357a&verbose=true&show-all-intents=true&log=true&query=who are you";
/**
 * @swagger
 * /api/homeautomation:
 *  get:
 *      description: Get
 *      responses:
 *          '200':
 *              description: sucess
 *          '400':
 *              There is an issue with your input parameters. Please verify
 *          '500':
 *              Server is not responding. Please try again later
 *
 *
 */
app.get('/api/homeautomation',(req,res)=>{
    axios({
        baseURL: endpoint,
        method: 'get',
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.status(200).send(JSON.stringify(response.data, null, 4));
    }).catch((err)=>{
        if(err.message){
          console.log(err)
            res.status(400).send("There is an issue with your input parameters. Please verify");
        }else{
            res.status(500).send("Server is not responding. Please try again later");
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
