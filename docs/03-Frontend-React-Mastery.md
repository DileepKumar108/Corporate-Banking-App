# 03: Frontend React Mastery ⚛️

In this lesson, we are going to read the code that builds the Customer Dashboard in Dileepkumar Bank. We will break down what every keyword and symbol means.

## The React Component (The Lego Block)

Open the file located at `src/features/dashboard/components/Dashboard.jsx`. 

A React file is basically a recipe for a single visual block on the screen. Let's look at a simplified version of it:

```jsx
import { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // This code runs when the page loads
    setBalance(50000);
  }, []);

  return (
    <div className="card">
      <h1>Your Balance: ${balance}</h1>
      <button onClick={() => setBalance(balance + 100)}>
        Deposit $100
      </button>
    </div>
  );
};

export default Dashboard;
```

## Line-by-Line Breakdown

### 1. The Imports (Gathering Tools)
```javascript
import { useState, useEffect } from 'react';
import './Dashboard.css';
```
*   **`import`**: This is a JavaScript keyword that means "go find this tool so I can use it here".
*   **`{ useState, useEffect }`**: These are special React tools called **Hooks**. The curly braces `{}` mean "I only want these two specific tools, not the entire massive React library." 
*   **`from 'react'`**: Where to find the tools.
*   **`import './Dashboard.css'`**: This brings in the styling. It makes the page look pretty (adding the deep navy blue and gold colors).

### 2. Creating the Component
```javascript
const Dashboard = () => {
```
*   **`const`**: Short for "Constant". We are creating a variable named `Dashboard`, and saying it can never be replaced by something else.
*   **`() => {`**: This is called an **Arrow Function**. Think of it as a set of instructions. It says, "When someone uses the `<Dashboard />` Lego block, follow all the instructions inside these `{}` brackets."

### 3. State (The Component's Memory)
```javascript
  const [balance, setBalance] = useState(0);
```
This is the most important concept in React. 
*   **`useState(0)`**: We are telling React to memorize a piece of data, and we want it to start at `0`.
*   **`balance`**: This is the variable holding the current number. Right now, it's `0`.
*   **`setBalance`**: This is a special function. In React, you are **not allowed** to just write `balance = 50`. If you do that, React won't know the number changed, and the screen won't update! You *must* use `setBalance(50)`. When you use `setBalance`, React screams "THE NUMBER CHANGED!" and instantly redraws the screen with the new number.

### 4. The Effect (Doing things automatically)
```javascript
  useEffect(() => {
    setBalance(50000);
  }, []);
```
*   **`useEffect`**: This tells React to do something *automatically* without the user clicking any buttons.
*   **`[]` (The empty array)**: This tells React to only run this code *exactly once* when the page first loads. So, when the user opens the Dashboard, their balance instantly jumps to 50000. In the real Dileepkumar Bank code, we use this space to `fetch()` the real balance from the Node.js backend!

### 5. The Return (Drawing the Screen)
```javascript
  return (
    <div className="card">
      <h1>Your Balance: ${balance}</h1>
      <button onClick={() => setBalance(balance + 100)}>
        Deposit $100
      </button>
    </div>
  );
```
*   **`return (...)`**: Whatever is inside these parentheses is exactly what gets drawn on the screen.
*   **JSX syntax**: Notice this looks exactly like HTML, but it's actually inside a JavaScript file! This is called **JSX**. 
*   **`className="card"`**: In standard HTML, we use `class="..."` to apply CSS styles. But in JavaScript, `class` is a reserved keyword, so React forces us to use `className` instead.
*   **`{balance}`**: Why are there curly braces here? In JSX, if you want to stop writing HTML text and start doing JavaScript math or variables, you open a curly brace `{}`. It tells the code "Don't print the word 'balance', print the *number inside* the memory variable named balance."
*   **`onClick={...}`**: This is an Event Listener. It sits there patiently waiting for the user to click their mouse on the button. When they click it, it executes the code inside: `setBalance(balance + 100)`. Because we used `setBalance`, React instantly redraws the `<h1>` to show `$50100`!

### 6. The Export (Sharing the Block)
```javascript
export default Dashboard;
```
*   **`export default`**: This takes our finished `Dashboard` Lego block and makes it available to the rest of the application. If another file wants to show the dashboard, they just write `import Dashboard from './Dashboard'`!

---
Next up, we will look at how the secure vault is built in **Lesson 04: Backend Node Vault**.
