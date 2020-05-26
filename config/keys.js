if(process.env.NODE_ENV === 'production'){
    /** Return production environment keys */
    module.exports = require('./prod');
}else{
    /** We are in development mode , return development keys */
    module.exports = require('./dev');
}