# Welcome to Coordin-eat

Coordin-eat is a mobile-first web app to ease the pain of finding the perfect spot for dinner with your geographically inconvenient friends. Built with the NERDS stack, featuring the Yelp API, the Google Maps API, and Mapbox GL. Created by the Bluegrass Grief Owls capstone team at Fullstack Academy: Sam Glass, David Berger, Jackson Sui, and Forrest Weiswolf.

Deployed at [coordin-eat.com](coordin-eat.com).

## Setup

To set up locally:

* `npm install`, or `yarn install` - whatever you're into
* Create two postgres databases: `coordin-eat` and `coordin-eat-test`
  * By default, running `npm test` will use `coordin-eat-test`, while regular development uses `coordin-eat`
* Create a file called `secrets.js` in the project root using `secrets.template.js` as a guide

## Start

`npm run start-dev` will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

## Contributions

Inspired? Write something that makes Coordin-eat better? Submit a PR!