const express = require('express');

/** creates a new application by running an express server app.
 *   This app will listen for incoming request and route them to different route handlers.
 *   All route handlers will be registered with this app.*/
const app = express();

app.get('/',(req,res) =>{
    res.send({hi:'bye'});
});

/** If we are running in production environment , then the port is given by heroku only in the last
 * second so we are telling to look at the underlying environment to look for a port.
 * If it is development environment , then we are going to look at port 5000.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);