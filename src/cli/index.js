#!/usr/bin/env node
var inquirer = require('inquirer');
const fs = require('fs-extra')
const path = require('path')

const { generateAllContent } = require('./helpers');

inquirer
  .prompt([
    {
      type: 'string',
      name: 'fromFileList',
      message: "Do you want to use a list of urls?",
    },
    {
      type: 'string',
      name: 'url',
      message: "What's the url?",
    },
    {
      type: 'string',
      name: 'output',
      message: "What's the output folder section - leave blank for default",
    },
  ])
  .then((answers) => {
    const { fromFileList, url, output } = answers;
    processToc(url, output, fromFileList);
  });


const processToc = async (url, output, fromFileList) => {


  if (fromFileList === "Y") {
    const fileList = fs.readJsonSync(path.join(__dirname, 'input', 'urlList.json'))

    for (const { url: urlItem, output: outputItem } of fileList) {
      await generateAllContent(urlItem, outputItem)
    }

  } else {
    await generateAllContent(url, output)
  }
  // const { fullDetails, title, description } = await processUrl(url);

  // const defaultFolderPathParts = [spaceToDash(DEFAULT_START_OF_TITLE), ...title[0].split(' ')]

  // const titlePath = defaultFolderPathParts.join('-').toLowerCase().replace(/,/g, '')

  // const outputPath = output ? path.join(__dirname, '../output', output) : path.join(__dirname, '../output', titlePath);

  // outputNotes(fullDetails, outputPath);
  // outputReadme({ title, description, fullDetails, url, outputPath });
  // copyGitignore(outputPath)
  // generatePackageJson({ outputPath, titlePath })

};
