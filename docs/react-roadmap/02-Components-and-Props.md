# 2. Components and Props 🧩

### What is it?
A Component is a reusable, independent piece of a User Interface (like a button, a header, or a transaction row). `Props` (Properties) are how you pass data from a parent component down into a child component.

### Real-World Analogy
A Component is like a Lego brick. You snap 50 tiny Lego bricks together to build a giant Lego castle. 
Props are like the instructions you give to a worker. You tell the `Button` component: "Hey, render yourself, and here is a Prop telling you to be the color Blue."

### Why/When to use it
If you have a table with 100 rows, you don't write the HTML 100 times. You write one `<TransactionRow />` component, and you loop over it 100 times, passing different data to it via Props.

### Syntax & Code
```jsx
// The Child Component receives 'props'
function WelcomeBanner(props) {
    return <h1>Welcome to {props.bankName}!</h1>;
}

// The Parent Component passes data down
function App() {
    return <WelcomeBanner bankName="Dileepkumar Bank" />;
}
```

### Dileepkumar Bank Example
In our React UI, we built a `<TransactionItem />` component. The Dashboard passed the `amount` and `date` to it via Props, so it knew exactly what numbers to render on the screen.
