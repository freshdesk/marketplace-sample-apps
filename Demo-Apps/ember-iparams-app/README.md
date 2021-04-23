## Ember Iparams App

This sample app demonstrates the use of Ember inside the custom iparams page.
It takes the Freshchat Host & Domain as inputs and validates them by making an API call to fetch agents.

### Prerequisites

1. Make sure you have a Freshchat account created.
1. Ensure you have the [Freshworks Developer Kit (FDK)](https://developers.freshchat.com/v2/docs/quick-start/#install_the_cli) installed.

### Procedure to run the App

Run the following commands:
- `yarn install` will install all the dependencies in `package.json`.
- `yarn bootstrap` will install all the dependencies in the nested packages within in `packages/*`
- `yarn build` will build the Ember app and place the assets in the `packages/app/config/assets` folder.
- `yarn prodbuild` will perform the build and bundle tasks, which will eventually create the app's bundle in the `packages/app/dist` folder.
- `yarn watch` will build Ember in development mode and will run `fdk run` so that the app can be served locally.

Any changes you make to the Ember app's source files files will automatically trigger an Ember build and will be served locally when you run `yarn watch`.

### Project folder structure explained

    .
    ├── README.md           This file.
    ├── jsconfig.json       For better VSCode experience.
    ├── lerna.json          Lerna configuration for task orchestration.
    ├── package.json        
    ├── packages
    │   ├── app             Marketplace app package.
    │   └── iparams-ember   Ember app source files.
    └── yarn.lock