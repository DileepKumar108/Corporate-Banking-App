# 4. Lifecycle and useEffect 🔄

### What is it?
Components have a lifecycle: they are Born (Mount), they change (Update), and they Die (Unmount). The `useEffect` hook allows you to run background code at specific points in this lifecycle (like fetching data the exact moment a component appears).

### Real-World Analogy
Imagine walking into a hotel room. 
When you enter (Mount), the lights turn on automatically (`useEffect` runs). While you are inside, you change the TV channel (State updates). When you check out and leave the room (Unmount), the lights turn off automatically (Cleanup function).

### Why/When to use it
You use `useEffect` primarily to fetch data from your Backend API, or to set up things like timers and event listeners that should only happen once.

### Syntax & Code
```jsx
import { useEffect, useState } from 'react';

function UserProfile() {
    const [user, setUser] = useState(null);

    // This code runs EXACTLY ONCE when the component first appears on screen
    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => setUser(data));
    }, []); // The empty array [] means "Only run once!"

    return <div>{user ? user.name : "Loading..."}</div>;
}
```

### Dileepkumar Bank Example
When the Dileepkumar Bank Dashboard opens, it is completely empty. We use a `useEffect` block to immediately fire a network request to our Node.js backend. The backend replies with the user's transaction history, and we update the state to display it!
