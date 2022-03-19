# PayMee Frontend

The PayMee frontend utilizes Create React App's scripts. Most (if not all) documentation will be the same.

## Development

To get started:

1. Clone the repository
2. Run `npm run start` to start the development server.

### Structure

The frontend contains 2 main directories. `public` and `src`. The public folder contains the `index.html` file for the React app as well as assets that will be added outside of the module system. More documentation about the `public` directory can be found [here](https://create-react-app.dev/docs/using-the-public-folder/).

The `src` directory contains all source code for the React app.

```
📦 src
 ┣ 📂 api
 ┣ 📂 components
 ┣ 📂 contexts
 ┣ 📂 hooks
 ┣ 📂 pages
 ┣ 📂 store
 ┣ 📂 theme
 ┗ 📂 utils
```

Within the src file are a few main directories. Each one has a distinct purpose.

- The `api` directory contains code relevant to making requests to APIs. This includes `utils` to ease in making fetch requests. Each other directory should be named after the APIs service (`local` for PayMee API, `facebook` for Facebook, etc.).
- The `components` directory contains all supporting components. A `common` directory exists for any component that is very reusuable and does not fit under any other single "domain". Any other component should be stored within a directory related to its specific category.
- The `contexts` directory is used to create a context and export a provider for it.
- The `hooks` directory stores any custom hooks.
- The `pages` directory stores each main page component. Under few exceptions should a new route not contain a new page component. This should be organized based on the url path.
- The `store` directory contains the Redux store and all of its reducers, thunks, selectors, and any other related content.
- The `theme` directory contains components or helpers related to the overall website themeing.
- The `utils` directory contains any helper/utility variables/functions that can be useful for any part of the application.
