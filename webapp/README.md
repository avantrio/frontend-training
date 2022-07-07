# React boilerplate


## Setting Up

### Running dev server

1. `npm install`
2. Change `.env.development` for local development config
3. Change `.env.sample` to `.env` in production.
4. `npm start`

### Starting Mock API

1. Install JSON Server - npm install -g json-server
2. json-server --watch <path to mock data file> --port 6001

### VS Code setup

Install below Extensions

-   ESLint
-   Prettier (set this as default formatter for js/jsx/scss files)

Mock data is located in /webapp/src/mockData/data.json


## Coding Practices

### React/Javascript basics

- Use functional components and hooks.
- Minimise the usage of Context API.
- useEffect is for side effects.
- Derived values should be calculated while rendering. No need to memoize anything.(This makes code simple and maintanable. useMemo can be used to optimise this but not required in the early development iterations)
- Use async/await. Avoid callbacks.

### Redux basics
- Following things should go in redux store.
    1. State associated with business logic of the app.
    2. App wide UI state
- Business logic should go in reducers. (avoid having logic in components and actions as much as possible).
- Use `useSelector` hook to read data from redux state. Access relevant state from the lowest possible component in the component tree(i.e:Avoid prop drilling).
- Refer to <a href="https://redux.js.org/style-guide" >redux style guide</a> for detailed guidelines.
- Use <a href="https://redux-toolkit.js.org/">redux toolkit</a> to create actions and reducers.(store is already confugred for toolkit).
- Insall redux dev tools extenstion in browser. Store is already configure to suppport dev tools.

### Data fetching
- Two methods
    - RTK-Query - Primary method
    - Axios - for special cases like file upload
- RTK-Query
    - A service is defined to featch and store data in redux store.
    - Data is cached by by rtk-query. We can definde cahce invalidation logic in the service.
    - Loading/Error states are fully handled by rtk-query for each API endpoint.
- Axios
    - One api handler
    - Inceptors 
        - To inject authorization header
        - To check authorization failures and logout
    - BASE URL should be defined in .env
    - All API calls should be async
    - ONLY use async await

### Routing
- <a href="https://reactrouter.com/web/guides/quick-start">React router</a> handles routing.
- `./routes` folder contains all the top level routing logic.
- `./routes/CustomRoutes` contains below custom route wrappers that helps in access control. Use one of these to define routes.
    - Private - only logged in users can view
    - Public - anyone can view
    - Restricted - only logged out users can view (ex: Login, Register)
- Nested routing is preferred over state when rendering content inside a common layout(An app can have multiple levels of nesting).
- Breadcrumbs should be connected to the router.
- Modals/Tabs/Steppers inside pages should be connected to the router(use nested routing).
- Use hooks provided by react-router.
    - `useHistory` - gets the history object
    - `useParams` - gets the route parameters
- `history.push()` is preferred over `<Link/>`

### Form Submission
- Use Fromik for handling forms.
- Never use pure Formik components unless it’s absolutely necessary. Ping senior dev before doing that. Always use the wrappers from `components/FormElements`.
- Create ThemedFormElements if your theming is significantly different from the base theme.
- Use YUP schema validation.

### Tables
- Use `components/paginatedTable` componets.
- Pagination/Search should be connected to router.

### Styling
- Use scss.
- Bootstrap 4 - use utility classes of Bootstrap as much as possible.
- Create custom CSS classes only if necessary.
- Start by override the bootstrap variables for colors.
- Next define the text settings - h1, h2, …, p.
- Implement design system in custom.scss
- Break down scss fiels as required.

### Code formatting
- 1 tab or 4 spaces indentation
- Functional component names - PascalCase
- Variables, functions, hooks, routes - camelCase
- Config contacts - BLOCK_CASE
- Curly Braces should start on the same line
- JSX file names - PascalCase, make them descriptive
- Js file names (helpers, api, redux etc) - camelCase


## Directory structure

- App.js - entrypoint
- api.js - api endpoints handled by axios
- State - redux related stuff
    - reducers + actions = slices
    - store
- Service - api services defined by rtk-query.
- Pages - page components
    - One file per component.
- Components - reusable components
    - One file per component.
- Utils - helper functions
- routes/CustomRoutes - Routes discussed earlier
- .env - environment config 
- hooks - custom hooks

