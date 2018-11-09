/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "projects";

const partitionKeyName = "ID";
const partitionKeyType = "S";
const path = "/projects";
const hashKeyPath = '/:' + partitionKeyName;

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path, function(req, res) {
    let params = {
        TableName: tableName,
        Select: 'ALL_ATTRIBUTES',
    };

    dynamodb.scan(params, (err, data) => {
        if (err) {
            res.json({error: 'Could not load items: ' + err});
        } else {
            res.json(data.Items);
        }
    });

});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + hashKeyPath, function(req, res) {
    var params = {};
    params[partitionKeyName] = req.params[partitionKeyName];

    let getItemParams = {
        TableName: tableName,
        Key: params
    }

    dynamodb.get(getItemParams,(err, data) => {
        if(err) {
            res.json({error: 'Could not load items: ' + err.message});
        } else {
            if (data.Item) {
                res.json(data.Item);
            } else {
                res.json(data) ;
            }
        }
    });

});


/************************************
 * HTTP put method for insert object *
 *************************************/

app.put(path, function(req, res) {

    let putItemParams = {
        TableName: tableName,
        Item: req.body
    }
    dynamodb.put(putItemParams, (err, data) => {
        if(err) {
            res.json({error: err, url: req.url, body: req.body});
        } else{
            res.json({success: 'put call succeed!', url: req.url, data: data})
        }
    });
});

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post(path, function(req, res) {

    let putItemParams = {
        TableName: tableName,
        Item: req.body
    }

    dynamodb.put(putItemParams, (err, data) => {
        if(err) {
            res.json({error: err, url: req.url, body: req.body});
        } else{
            res.json({success: 'post call succeed!', url: req.url, data: data})
        }
    });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
