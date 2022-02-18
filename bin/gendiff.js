#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command;

program.version('1.0.0');
program.description('Compares two configuration files and shows a difference.');
program.arguments('<filepath1> <filepath2>');
program.option('-f, --format <type>', 'output format');
program.action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2))
});

program.parse();