# 1. Java Fundamentals ☕

Welcome to the foundation of Enterprise Engineering. Java is one of the most powerful, strictly-typed languages in the world. This guide explains every concept point-to-point.

---

## 1. Variables & Data Types

### What is it?
A variable is a container that holds data. Because Java is "Statically Typed", you must explicitly tell Java exactly what *type* of data the container is allowed to hold (e.g., text, numbers, true/false) before you can put anything inside it.

### Real-World Analogy
Imagine a warehouse. A variable is a physical cardboard box with a label on the outside. 
If the label says `String` (Text), you are legally not allowed to put a `boolean` (True/False switch) inside that box. If you try, the warehouse manager (the Java Compiler) will scream at you and refuse to let the program run.

### Why use it? / When to use it?
You use variables anytime you need the computer to remember something. You use strict types so that other developers don't accidentally put a word (like "five") into a math equation expecting a number (`5`).

### How to use it (Syntax & Code)
```java
// Syntax: [DataType] [VariableName] = [Value];

String customerName = "Dileep";       // Text
int customerAge = 35;                 // Whole Numbers (Integer)
double accountBalance = 15000.50;     // Numbers with decimals
boolean isAccountActive = true;       // True or False
```

### Dileepkumar Bank Example
In our bank, when a customer logs in, we need to remember their balance. We create a `double` variable so we can do math with their money, including cents.
```java
double currentBalance = 5000.75;
double deposit = 100.00;
double newBalance = currentBalance + deposit; // newBalance is 5100.75
```

---

## 2. Object-Oriented Programming (OOP) - Classes & Objects

### What is it?
OOP is a way of organizing code. Instead of writing one massive list of instructions, you create "Objects". 
*   A **Class** is the blueprint.
*   An **Object** is the actual thing built from the blueprint.

### Real-World Analogy
*   **Class:** A blueprint for a Toyota Camry. The blueprint itself cannot drive on the road. It just describes that the car has 4 wheels, a color, and a `drive()` function.
*   **Object:** You use the blueprint to manufacture a *real* red Toyota Camry. You can manufacture 10,000 real cars (Objects) from one single blueprint (Class).

### Why use it? / When to use it?
When you are building massive software, having thousands of variables floating around gets confusing. OOP groups variables and functions into neat packages. You use this when you need to represent real-world things in code (like Customers, Transactions, or Accounts).

### How to use it (Syntax & Code)
```java
// 1. The Blueprint (Class)
public class BankAccount {
    // Attributes (What it has)
    String ownerName;
    double balance;

    // Methods (What it can do)
    public void deposit(double amount) {
        balance = balance + amount;
    }
}

// 2. The Real Object
public class Main {
    public static void main(String[] args) {
        // We use the 'new' keyword to build a real object from the blueprint
        BankAccount myAccount = new BankAccount();
        myAccount.ownerName = "Dileep";
        myAccount.balance = 500;
        
        myAccount.deposit(100); // Balance is now 600
    }
}
```

### Dileepkumar Bank Example
In our Underwriting Engine, we don't just calculate FICO scores randomly. We have a `LoanApplication` Class. Whenever someone applies for a loan, we create a `new LoanApplication()` object specifically for them, containing their unique income and debts.

---

## 3. Collections (Lists & Maps)

### What is it?
Variables are great, but they only hold one thing. What if you need to hold 1,000 things? 
**Collections** are advanced containers. 
*   An **ArrayList** is a dynamically sizing list (like a shopping list).
*   A **HashMap** is a dictionary (you look up a "Key" to find a "Value").

### Real-World Analogy
*   **ArrayList:** A line of people waiting outside a bank. You know exactly who is 1st in line, 2nd in line, and 3rd in line.
*   **HashMap:** A safety deposit box room. If you have the unique key (`"Box 104"`), you instantly get the items inside, without having to search the entire room.

### Why use it? / When to use it?
You use ArrayLists when you need to store multiple items of the same type and loop through them. You use HashMaps when you need to instantly look up data using a specific ID or word.

### How to use it (Syntax & Code)
```java
// --- ArrayList ---
List<String> transactions = new ArrayList<>();
transactions.add("Deposit $100");
transactions.add("Withdraw $50");

// --- HashMap ---
Map<String, Double> customerBalances = new HashMap<>();
customerBalances.put("Dileep", 10000.00);
customerBalances.put("John", 50.00);

// Instantly look up Dileep's balance without searching
double balance = customerBalances.get("Dileep"); 
```

### Dileepkumar Bank Example
In our AML Fraud Engine, we use a `HashMap<String, Boolean> sanctionList`. The Key is the country code (like "RU" or "NK"), and the value is `true`. When a wire transfer comes in, we instantly check `sanctionList.get("RU")` to see if we need to freeze the money!

---
*Click back to the Interactive Roadmap to explore the next chapter!*
