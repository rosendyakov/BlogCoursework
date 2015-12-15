/**
 * Created by rosen on 15/12/2015.
 */
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//and our HTTP server
var http = require('http');
//setup our port
var port = process.env.PORT || 1337;

var url =  'mongodb://rosendyakov:0886540590r@ds054308.mongolab.com:54308/mongodatabase';

var MongoClient = mongodb.MongoClient;

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Connecting \n');
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        response.write('Connection Made \n');
        if (err) {
            response.write('Unable to connect to the mongoDB server. Error:' + err + "\n");
            //Error so close connection
            db.close();
        } else {
            //HURRAY!! We are connected. smile emoticon
            response.write('Connection established to' + url +"\n");
            var collection = db.collection('users');
            var user1 = {name : 'Peter' , age : 42 , role: 'author'};
            var user2 = {name : 'John' , age : 23 , role: 'author'};
            var user3 = {name : 'Ron' , age : 13 , role: 'standard user'};
            // do some work here with the database.

            collection.insert([user1, user2, user3], function (err, result) {
                if (err) {
                    response.write('Insert failed ' + err + "\n");
                } else {
                    console.log(result);
                    response.write('Inserted ' + result.insertedCount +' documents ok. +"\n"');
                }
                //Close connection
                db.close();
                response.end('Finished, Connection closed \n');
                //remove any other db.close or response.end statement below this line
            });


        }

    });

}).listen(port);

