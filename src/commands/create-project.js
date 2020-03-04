/**
 * Create a new XMEN project
 */
var download = require('download-git-repo');
var fs = require('fs');
var npm = require('npm');


module.exports = (program, config) => {
    
    var dir = process.cwd();

    program
        .command('new [name]')
        .description('Create a new XMEN project')
        .action((name, options) => {
            // Create a new folder in this directory.
            if (!fs.existsSync(dir + name)) {
                console.log("Creating new directory '%s'", name);
                var path = dir + '/' + name;

                var gitOptions = {
                    source: 'github:XMEN-Framework/xmen#master',
                };
                
                download(gitOptions.source, path, (err) => {
                    if (err) {
                        console.error('Error occured downloading project');
                        console.log(err);
                        return;
                    }
                    console.log("Successfully downloaded XMEN");

                    // cd into folder
                    npm.load((err) => {
                        console.log("NPM install...", path);
                        npm.prefix = path;
                        npm.commands.install([], (err, data) => {
                            if (err) return console.log(err);

                            fs.writeFileSync(path + '/.xmen-cli.json', configTemplate(name));
                            return;
                        });
                    });

                });

            } else {
                console.log("Folder with name '%s' already exists", name);
            }
        });
}


function configTemplate(name) {
    return`{
    "name": "${name}",
    "app": "./app"
}`;
}