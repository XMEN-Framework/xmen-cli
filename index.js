#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var download = require('download-git-repo');
var fs = require('fs');
var npm = require('npm');
var dir = './';

program
    .command('new [name]')
    .description('Create a new XMEN project')
    .action(function(name, options) {
        // Create a new folder in this directory.
        if (!fs.existsSync(dir + name)) {
            console.log("Creating new directory '%s'", name);
            let path = dir + name;

            var gitOptions = {
                source: 'github:XMEN-Framework/xmen#master',
            };
            
            download(gitOptions.source, path, function(err) {
                if (err) {
                    console.error('Error occured downloading project');
                    console.log(err);
                    return;
                }
                console.log("Successfully downloaded XMEN");

                // cd into folder
                npm.load(function(err) {
                    console.log("NPM install...", path);
                    npm.prefix = path;
                    npm.commands.install([], function(er, data) {
                        if (er) return console.log(er);
                        return;
                    });
                });

            });

        } else {
            console.log("Folder with name '%s' already exists", name);
        }
    });

program.parse(process.argv);