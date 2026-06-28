# 3. State and useState 💾

### What is it?
`State` is a React component's memory. When a component's State changes, React automatically re-renders the screen to show the new data. The `useState` hook is how you create state variables in functional components.

### Real-World Analogy
Imagine a scoreboard at a basketball game. The score starts at 0. When a player shoots, the score updates to 2, and the physical lights on the board instantly change to show the new number. State is the score; React is the mechanism that changes the lights.

### Why/When to use it
You use State anytime data on the screen needs to change without the user refreshing the web page (e.g., typing in a text box, opening a modal, or updating a bank balance).

### Syntax & Code
```jsx
import { useState } from 'react';

function Counter() {
    // 1. Current value, 2. Function to update it = Initial value (0)
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Clicked {count} times
        </button>
    );
}
```

### Dileepkumar Bank Example
When a user clicks "Deposit $100", we call `setBalance(balance + 100)`. React instantly notices the State changed, and it re-renders the Dashboard to show the new, higher balance without refreshing the page!
