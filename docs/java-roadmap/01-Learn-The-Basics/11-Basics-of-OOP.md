# Basics of Object-Oriented Programming (OOP)
## 1. Explain it to me like I'm 5 (For Complete Beginners)
Imagine you are building a LEGO city. Instead of trying to build the whole city as one giant piece of plastic, you build separate things: a Car, a House, a Person. Each of these things is an "Object". OOP is a way of writing code where we break our program down into these separate, self-contained Objects that interact with each other.

There are four magic pillars of OOP:
1.  **Encapsulation:** Keeping things in a protective bubble.
2.  **Inheritance:** Passing traits down from a parent to a child.
3.  **Polymorphism:** One thing acting like many different things.
4.  **Abstraction:** Hiding the complicated details.

## 2. Why does this even exist? (The Problem it Solves)
Before OOP, programs were just one giant, long list of instructions. This was fine for small programs, but for huge enterprise apps, it became a tangled, unreadable mess (called "Spaghetti Code"). OOP lets teams of programmers work on different "Objects" simultaneously without breaking each other's code. It keeps code organized, reusable, and easy to maintain.

## 3. Real-World Analogy
Let's look at a **Smartphone** through the four pillars of OOP:
*   **Encapsulation:** The internal wires, battery, and chips are sealed inside a metal case. You can't touch them directly. You only interact with the phone through the buttons and screen. The phone protects its own data.
*   **Inheritance:** You have a "Phone" concept (can make calls). Then you make a "Smartphone" which *is a* Phone, but inherits the calling ability and adds internet!
*   **Polymorphism:** You press the "Volume Up" button. If you are on a call, it turns up the voice. If you are watching a video, it turns up the media volume. Same button (method), different behavior based on context.
*   **Abstraction:** When you take a photo, you just tap the screen. You don't need to know how the camera lens focuses, how light is converted to digital pixels, or how the file is saved. The complexity is hidden behind a simple interface.

## 4. The Syntax (How to write it from scratch)
In OOP, we create a **Class** (a blueprint), and then use that blueprint to create **Objects**.

```java
// The Blueprint (Class)
public class Dog {
    // Attributes (State/Data)
    String name;
    
    // Methods (Behavior/Actions)
    public void bark() {
        System.out.println(name + " says Woof!");
    }
}

// In your main program:
// Creating the Object from the Blueprint
Dog myDog = new Dog();
myDog.name = "Buddy";
myDog.bark(); // Outputs: Buddy says Woof!
```

## 5. Basic Example (Hello World level)
```java
// A simple class demonstrating Encapsulation
class SecretAgent {
    // 'private' means these cannot be accessed outside this class! (Encapsulation)
    private String realName;
    private String codeName;

    public SecretAgent(String realName, String codeName) {
        this.realName = realName;
        this.codeName = codeName;
    }

    // Public method to safely interact with the hidden data
    public void introduce() {
        System.out.println("I am known as Agent " + codeName + ".");
    }
}

public class OopBasics {
    public static void main(String[] args) {
        SecretAgent james = new SecretAgent("James Bond", "007");
        james.introduce(); // Outputs: I am known as Agent 007.
        // james.realName = "John"; // ERROR! The data is protected by Encapsulation.
    }
}
```

## 6. Enterprise Bank Example (Dileepkumar Bank context)
Let's see all 4 pillars in action at the bank!

```java
// 1. ABSTRACTION: We define a concept, but hide the implementation details
abstract class BankAccount {
    // 2. ENCAPSULATION: The balance is hidden and protected
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    // Controlled access to read the balance
    public double getBalance() {
        return balance;
    }

    // Controlled access to modify the balance
    protected void deposit(double amount) {
        this.balance += amount;
    }

    // Abstract method: Every account must have a fee structure, 
    // but HOW it works is decided by the specific account type.
    public abstract void applyMonthlyFee();
}

// 3. INHERITANCE: CheckingAccount "is a" BankAccount
class CheckingAccount extends BankAccount {
    public CheckingAccount(double initialBalance) {
        super(initialBalance); // Call the parent constructor
    }

    @Override
    public void applyMonthlyFee() {
        // Checking has a flat $5 fee
        System.out.println("Applying $5 checking fee.");
        // We can't access 'balance' directly, we use the method provided
    }
}

// 3. INHERITANCE: SavingsAccount "is a" BankAccount
class SavingsAccount extends BankAccount {
    public SavingsAccount(double initialBalance) {
        super(initialBalance);
    }

    @Override
    public void applyMonthlyFee() {
        // Savings has no fee!
        System.out.println("No fee for savings account.");
    }
}

public class DileepkumarBankOOP {
    public static void main(String[] args) {
        // 4. POLYMORPHISM: We treat both as "BankAccount" but they behave differently!
        BankAccount myChecking = new CheckingAccount(100.00);
        BankAccount mySavings = new SavingsAccount(500.00);

        // Same method call, different behaviors!
        myChecking.applyMonthlyFee(); // Outputs: Applying $5 checking fee.
        mySavings.applyMonthlyFee();  // Outputs: No fee for savings account.
    }
}
```

## 7. Common Mistakes & Gotchas
*   **Public Variables:** A huge mistake beginners make is making all variables `public`. This breaks Encapsulation! Variables should almost always be `private`, and you should create `public` methods (getters and setters) to interact with them safely.
*   **Class vs Object Confusion:** A `Class` is the blueprint (like a recipe for a cake). An `Object` is the actual thing built from the blueprint (the cake itself). You can use one recipe to bake 100 cakes!
*   **Overusing Inheritance:** Don't use inheritance just to share code. Inheritance should strictly represent an "IS-A" relationship (A Dog IS-A Animal). If it's a "HAS-A" relationship (A Car HAS-A Engine), you should just use variables.

## 8. Want to Learn More? (External links & Deep Dives)
*   [Oracle Java Tutorials - Object-Oriented Programming Concepts](https://docs.oracle.com/javase/tutorial/java/concepts/index.html)
*   [FreeCodeCamp - The Four Pillars of OOP](https://www.freecodecamp.org/news/four-pillars-of-object-oriented-programming/)