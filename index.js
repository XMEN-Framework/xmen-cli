#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var download = require('download-git-repo');
var fs = require('fs');
var npm = require('npm');

var config = null;

try {
    console.log(process.cwd() + '/.xmen-cli.json');
    config = require(process.cwd() + '/.xmen-cli.json');
    console.log(config);
} catch (e) {
    console.log(e);
    console.log("No cli config");
}

var commands = require('./src/commands')(program, config);

program.parse(process.argv);