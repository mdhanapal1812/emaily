const mongoose  = require('mongoose');

/** Below can be condensed to ES6 Syntax
const scheema = mongoose.Schema; */
const {Schema} = mongoose;


const userSchema = new Schema({
    googleId : String,
    credits: {type:Number,default:0}
                              });

 mongoose.model('users',userSchema);