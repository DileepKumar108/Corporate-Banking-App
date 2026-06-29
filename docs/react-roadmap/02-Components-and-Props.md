# Components and Props
## 1. Explain it to me like I'm 5 (For Complete Beginners)
Imagine you are playing with LEGO blocks. You have small blocks (like a 2x2 square) and you can put them together to build bigger things, like a house or a car. 
In React, **Components** are exactly like LEGO blocks. They are small, reusable pieces of code that build up your website (like a button, a menu, or a picture).
Now, imagine you have a special LEGO block that can change color if you ask it to. You say, "Make this one red!" and it becomes red. **Props** (short for properties) are how you talk to your LEGO blocks. You use props to give instructions to your components, telling them how to look or what text to show.

## 2. Why does this even exist? (The Problem it Solves)
If you build a big website using just one giant file of code, it becomes an absolute nightmare to read, fix, or change later. If you have 10 identical buttons on your site and the boss wants them all to be blue instead of green, you'd have to find and change the code 10 different times!
Components solve this by letting you write the code for a "Button" just *once*. Then, you can reuse that same "Button" code anywhere you want. Props solve the problem of customization. You can use the same "Button" component 10 times, but pass different props to each one so they have different text (like "Submit", "Cancel", "Save").

## 3. Real-World Analogy
Think of a Component as a custom Stamp. You design the stamp once (say, a stamp of a smiley face).
Every time you press the stamp onto paper, you are creating an *instance* of that component.
Now, what if you use different colored ink pads? The stamp is the same design, but the result looks different depending on the ink. The **ink** is the **Prop**. The stamp (Component) takes the ink (Prop) and produces a specific result on the page.

## 4. The Syntax (How to write it from scratch)
A React component is just a regular JavaScript function! 
1. The function name MUST start with a Capital Letter (e.g., `MyButton`, not `myButton`).
2. It must `return` JSX (the HTML-like code).
3. It can accept exactly one argument, an object called `props`, which contains all the custom data passed into it.

```jsx
// 1. Defining the Component
function Greeting(props) {
  // We use props.name to access the custom data passed in
  return <h1>Hello, {props.name}! Welcome to React.</h1>;
}

// 2. Using the Component (and passing props!)
function App() {
  return (
    <div>
      {/* We pass the 'name' prop just like an HTML attribute */}
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}
```

## 5. Basic Example (Hello World level)
Let's make a simple ID card component. We will pass in a name and a job title as props.

```jsx
function IdCard({ name, jobTitle }) { // We can "destructure" props right here to save typing!
  return (
    <div className="id-card">
      <h2>{name}</h2>
      <p className="job-title">{jobTitle}</p>
    </div>
  );
}

function CompanyDirectory() {
  return (
    <div>
      <h1>Our Team</h1>
      <IdCard name="Sarah Smith" jobTitle="Developer" />
      <IdCard name="John Doe" jobTitle="Designer" />
    </div>
  );
}
```

## 6. Enterprise Bank Example (Dileepkumar Bank context)
In the Dileepkumar Corporate Banking App, we need a way to show individual transactions. Instead of copying and pasting the HTML for a row in a table a hundred times, we create a `TransactionRow` component.

```jsx
// The reusable Component
function TransactionRow({ date, description, amount, isCredit }) {
  // Decide the color based on whether money came in or went out
  const amountClass = isCredit ? 'text-green-600' : 'text-red-600';
  const displayAmount = isCredit ? `+ $${amount}` : `- $${amount}`;

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3 text-sm text-gray-500">{date}</td>
      <td className="p-3 text-sm font-medium">{description}</td>
      <td className={`p-3 text-sm font-bold text-right ${amountClass}`}>
        {displayAmount}
      </td>
    </tr>
  );
}

// The main page that uses the Component
function TransactionHistory() {
  return (
    <div className="card">
      <h3>Recent Transactions</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* Reusing the component! */}
          <TransactionRow 
            date="Oct 24, 2023" 
            description="Wire Transfer - Vendor Payment" 
            amount="5,400.00" 
            isCredit={false} 
          />
          <TransactionRow 
            date="Oct 23, 2023" 
            description="Client Deposit - Invoice #992" 
            amount="12,500.00" 
            isCredit={true} 
          />
        </tbody>
      </table>
    </div>
  );
}
```

## 7. Common Mistakes & Gotchas
*   **Forgetting to capitalize the Component name:**
    *   *Bad:* `function myButton() { ... }` (React thinks this is a standard HTML tag like `<div>`).
    *   *Good:* `function MyButton() { ... }`
*   **Trying to change props:** Props are strictly **Read-Only**. A component should NEVER try to change the props it was given.
    *   *Bad:* `props.name = "New Name";` (This will break your app!)
*   **Forgetting the curly braces around props inside JSX:**
    *   *Bad:* `<h1>Hello, props.name</h1>` (Will literally print "Hello, props.name" on the screen).
    *   *Good:* `<h1>Hello, {props.name}</h1>`

## 8. Want to Learn More? (External links & Deep Dives)
*   [React Official Docs: Your First Component](https://react.dev/learn/your-first-component)
*   [React Official Docs: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
