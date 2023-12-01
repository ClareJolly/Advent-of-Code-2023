const inquirer = require('inquirer');
const processUrl = require('./processUrl');

const fs = require('fs-extra')

const BASE_URL = 'https://adventofcode.com'

const init = () => {

  inquirer
    .prompt([
      {
        type: 'string',
        name: 'year',
        default: '2023',
        message: "what year are you on?",
      },
      {
        type: 'number',
        name: 'day',
        message: "what day to you want to initialise",
      },
    ])
    .then((answers) => {
      const { day, year } = answers;
      const url = [BASE_URL, year, 'day', day].join('/')
      const { title, description } = processUrl({ url, day })

    });

}

module.exports = init