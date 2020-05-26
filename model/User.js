const mongoose  = require('mongoose');

/** Below can be condensed to ES6 Syntax
const scheema = mongoose.Schema; */
const {Schema} = mongoose;


const userSchema = new Schema({
    googleId : String
                              });

 mongoose.model('users',userSchema);