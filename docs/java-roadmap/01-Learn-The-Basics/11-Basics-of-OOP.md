# 11. Basics of Object-Oriented Programming (OOP) 🏛️

### What is it?
Object-Oriented Programming (OOP) is a paradigm based on the concept of "Objects". Instead of writing just a long list of instructions, you create digital objects that represent real-world things (like a `Customer`, a `BankAccount`, or a `Transaction`).

There are **4 Core Pillars of OOP**: Encapsulation, Inheritance, Polymorphism, and Abstraction.

---

## 1. Encapsulation 🛡️
### What is it?
Hiding the internal state of an object and requiring all interaction to be performed through an object's methods. You make variables `private` and provide `public` getter and setter methods.

### Real-World Analogy
An ATM machine. You cannot open the ATM and grab the cash yourself (private data). You must use the keypad and card reader (public methods) to securely ask the ATM to give you cash.

### Dileepkumar Bank Example
We NEVER want a hacker to directly change their balance.
```java
public class BankAccount {
    // PRIVATE: No one outside this class can touch this variable!
    private double balance = 0.0;

    // PUBLIC: The only way to add money
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    // PUBLIC: Read-only access to see the balance
    public double getBalance() {
        return this.balance;
    }
}
```

---

## 2. Inheritance 🧬
### What is it?
Creating new classes that inherit properties and methods from an existing "parent" class. This prevents you from writing the exact same code twice.

### Real-World Analogy
A Parent passes down their eye color and hair color to their Child.

### Dileepkumar Bank Example
A `SavingsAccount` and a `CheckingAccount` are both types of an `Account`.
```java
// Parent Class
public class Account {
    public String accountNumber;
    public double balance;
}

// Child Class (Inherits accountNumber and balance automatically!)
public class SavingsAccount extends Account {
    public double interestRate = 0.05;

    public void applyInterest() {
        balance += (balance * interestRate);
    }
}
```

---

## 3. Polymorphism 🎭
### What is it?
Polymorphism means "many forms". It allows a child class to share the same method name as its parent class, but execute different, specialized behavior.

### Real-World Analogy
If you tell a Dog to "Speak", it barks. If you tell a Cat to "Speak", it meows. The command is the same, but the behavior takes different forms depending on the animal.

### Dileepkumar Bank Example
Different accounts charge different withdrawal fees!
```java
public class Account {
    public void withdraw(double amount) {
        balance -= amount; // Standard withdrawal
    }
}

public class VipAccount extends Account {
    // Override the parent's method to add VIP behavior!
    @Override
    public void withdraw(double amount) {
        balance -= amount;
        balance += 5.00; // VIPs get a $5 cash-back bonus on every withdrawal!
    }
}
```

---

## 4. Abstraction 🌫️
### What is it?
Hiding complex implementation details and showing only the essential features of an object. You interact with a simple interface without needing to understand the millions of lines of code running underneath.

### Real-World Analogy
Driving a car. You press the gas pedal to go forward. You don't need to know how the fuel injectors, spark plugs, and combustion engine work. The complexity is abstracted away.

### Dileepkumar Bank Example
When a user clicks "Transfer Money" on the UI, they just call one simple method. They don't know that underneath, we are running complex AML (Anti-Money Laundering) checks!
```java
public class TransferService {
    
    // The only method the user sees
    public void sendWireTransfer(String toAccount, double amount) {
        runComplexFraudCheck();
        contactInternationalBank();
        processCurrencyConversion();
        // Send money
    }

    // Hidden, complex background tasks
    private void runComplexFraudCheck() { /* 1000 lines of code */ }
    private void contactInternationalBank() { /* 500 lines of code */ }
    private void processCurrencyConversion() { /* 200 lines of code */ }
}
```