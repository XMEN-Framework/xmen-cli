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
    config = require(process.cwd() + '/.xmen-cli.json');
} catch (e) {
}

var commands = require('./src/commands')(program, config);

program.parse(process.argv);