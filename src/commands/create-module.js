/**
 * Create a new module under project/app.
 */
var fs = require('fs');


module.exports = (program, config) => {

    if (!config) {
        console.log("Current directory is not an XMEN project");
        console.log("Please make sure .xmen-cli.json is in the root of your project");
        return;
    }

    var dir = config.app + '/';

    program
        .command('module [name]')
        .description("Create a new XMEN module.")
        .action((name, options) => {
            // Create a new module directory.
            if (!fs.existsSync(dir + name)) {
                console.log("Creating module '%s'", name);

                var path = dir + name;

                fs.mkdirSync(path);

                console.log("Creating module.");

                fs.writeFileSync(path + `/${name}.module.js`, '');

                // Create folders
                fs.mkdirSync(path + '/controllers');
                console.log("Created ", path + '/controllers');

                fs.writeFileSync(path + '/controllers/index.js', controllerTemplate(name));

                fs.mkdirSync(path + '/models');
                console.log("Created ", path + '/models');
                fs.writeFileSync(path + '/models/index.js', modelTemplate(name));

                fs.mkdirSync(path + '/routes');
                console.log("Created ", path + '/models');
                fs.writeFileSync(path + '/routes/index.js', routeTemplate(name));

            } else {
                // Path already exists.
                console.log("'%s' module already exists", name);
            }
        });
};


function controllerTemplate(name) {

    let camelCase = toCamelCase(name);
    let pascalCase = toPascalCase(name);

    return `/**
* ${pascalCase} controller
*/
exports.${camelCase}  = (req, res) => {
    res.send('${name}');
}`;
}

function modelTemplate(name) {
    
    let camelCase = toCamelCase(name);
    let pascalCase = toPascalCase(name);

    return `/**
* ${pascalCase} model
*/

var mongoose = require('mongoose');

var ${pascalCase}Schema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        typ: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('${pascalCase}', ${pascalCase}Schema);`;
}


function routeTemplate(name) {
    
    let camelCase = toCamelCase(name);
    let pascalCase = toPascalCase(name);

    return `/**
* ${pascalCase} routes
*/

module.exports = function( app, passport, auth ) {

    var ${camelCase}Controller = require('../controllers/index.js');

    app.get('/${name}', ${camelCase}Controller.${camelCase});
};`;
}


function toCamelCase(str) {
    let string = str.toLowerCase().replace(/[^A-Za-z0-9]/g, ' ').split(' ')
                    .reduce((result, word) => result + capitalize(word.toLowerCase()))
    return string.charAt(0).toLowerCase() + string.slice(1)
}


function capitalize(str) { 
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}
  


function toPascalCase(str) {
    return toCamelCase(str)[0].toUpperCase() + toCamelCase(str).substr(1);
}