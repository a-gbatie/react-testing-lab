# React Testing Lab with Vitest

## Project Description

A React bank transaction application that allows users to view, add, search, and sort transactions.

The application fetches transaction data from a local JSON Server API and uses Vitest and React Testing Library to test its functionality.

## Technologies Used

- React
- JavaScript
- Vite
- Vitest
- React Testing Library
- JSON Server
- HTML and CSS

## How to Run the Project

1. Clone the repository and navigate into the project directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the JSON Server:

   ```bash
   npm run server
   ```

   The API runs at `http://localhost:6001/transactions`.

4. Open a second terminal and start the React application:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal to view the application.

## How to Run Tests

Run the test suite:

```bash
npm test -- --run
```

Run tests in watch mode:

```bash
npm test
```

The tests cover:

- Displaying transactions fetched from the API
- Adding new transactions using a POST request
- Searching transactions by description
- Sorting transactions by category
- Rendering the main application