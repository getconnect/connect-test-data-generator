# Test / Demo Data Generation for Connect

## Overview

Use an object as a template to generate batches of data with random values to push into [Connect](https://getconnect.io) collection. Below describes how to use it in conjuction with the excellent [Chance](http://chancejs.com) library.

## Installation

```sh
npm install chance
npm install connect-test-data-generator
```

## Example Usage

The example below generates random values for 1001 events. These events will have:
* A random string for 'name'.
* A random boolean for 'isPending'.
* A random string for 'type.description'.
* The number 3 for 'type.code'
* A random integer for 'status'.
* An array with exactly 3 random strings for 'tags'

```js
"use strict"
let chance = require('chance')(),
    generator = require('connect-test-data-generator');

let randomString = () => chance.character({alpha: true});

let template = {
  name: randomString,
  isPending: () => chance.bool({likelihood: 30}),
  type: {
    description: randomString,
    code: 3
  },
  status: () => chance.integer(),
  tags: [randomString, randomString, randomString]
}

let options = {
      collectionName: 'my-test-collection',
      numbeOfEventsToPush: 1001,
      progress: (connectResult, batchNumber) => {
        console.log(`pushed batch ${batchNumber}`);
      },
      done: () => {
        console.log('All done');
      }
    };

let connectConfig = {
  projectId: 'YOUR_PROJECT_ID',
  apiKey: 'YOUR_PUSH_KEY',
};

generator.generateBatches(connectConfig, template, options);
```