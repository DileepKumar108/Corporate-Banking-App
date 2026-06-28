# 1. JSX and Rendering ⚛️

### What is it?
JSX (JavaScript XML) is a syntax extension for React. It looks exactly like HTML, but it allows you to write JavaScript logic directly inside of it using curly braces `{}`.

### Real-World Analogy
Imagine a chameleon. In one environment it looks green, in another it looks brown. JSX is a chameleon. It looks like HTML to the developer, but under the hood, React instantly transforms it into raw JavaScript before the browser sees it.

### Why/When to use it
You use JSX to build the visual structure of your React application. It is infinitely better than manually writing `document.createElement('div')` 100 times.

### Syntax & Code
```jsx
// You can write JavaScript directly inside the HTML using {}
const name = "Dileep";
return (
    <div>
        <h1>Welcome, {name}!</h1>
    </div>
);
```

### Dileepkumar Bank Example
In our bank dashboard, we used JSX to render the user's balance. If their balance drops below zero, we use JSX to conditionally render the text in red!
```jsx
return (
    <h2 style={{ color: balance < 0 ? 'red' : 'green' }}>
        Current Balance: ${balance}
    </h2>
);
```
