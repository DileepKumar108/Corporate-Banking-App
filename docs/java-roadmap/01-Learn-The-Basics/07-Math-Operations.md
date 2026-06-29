# Math Operations in Java
## 1. Explain it to me like I'm 5 (For Complete Beginners)
Imagine you have a calculator. You can add, subtract, multiply, and divide numbers with it. In Java, math operations do exactly the same thing. They let your program act like a calculator to do math with numbers!

## 2. Why does this even exist? (The Problem it Solves)
Computers are essentially giant calculators. Almost everything a computer does involves some kind of math behind the scenes. Without math operations, we couldn't calculate totals, keep track of scores in a game, or figure out how much money is in a bank account.

## 3. Real-World Analogy
Think about going grocery shopping. You pick up an apple that costs $1, and a banana that costs $2. When you go to the cashier, they use addition to find your total: 1 + 2 = 3. Math operations in Java do this exact same calculation.

## 4. The Syntax (How to write it from scratch)
Java uses special symbols (called operators) for math:
*   `+` for Addition
*   `-` for Subtraction
*   `*` for Multiplication
*   `/` for Division
*   `%` for Modulo (Remainder)

You use them by putting the symbol between two numbers or variables:
`int result = number1 + number2;`

## 5. Basic Example (Hello World level)
```java
public class MathBasics {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        
        System.out.println("Addition: " + (a + b));       // Outputs 13
        System.out.println("Subtraction: " + (a - b));    // Outputs 7
        System.out.println("Multiplication: " + (a * b)); // Outputs 30
        System.out.println("Division: " + (a / b));       // Outputs 3 (Integer division cuts off decimals!)
        System.out.println("Modulo: " + (a % b));         // Outputs 1 (Because 10 divided by 3 is 9, with 1 left over)
    }
}
```

## 6. Enterprise Bank Example (Dileepkumar Bank context)
```java
public class BankInterestCalculator {
    public static void main(String[] args) {
        double accountBalance = 1000.00; // Starting balance
        double interestRate = 0.05;      // 5% interest
        
        // Calculate the interest amount
        double interestEarned = accountBalance * interestRate;
        
        // Calculate the new total balance
        double newBalance = accountBalance + interestEarned;
        
        System.out.println("Welcome to Dileepkumar Bank!");
        System.out.println("Interest Earned: $" + interestEarned);
        System.out.println("New Balance: $" + newBalance);
    }
}
```

## 7. Common Mistakes & Gotchas
*   **Integer Division:** If you divide two whole numbers (integers), Java drops the decimal! `5 / 2` will equal `2`, not `2.5`. To get decimals, at least one number must be a decimal (double or float), like `5.0 / 2`.
*   **Order of Operations (PEMDAS):** Java follows standard math rules. Multiplication and division happen before addition and subtraction. Use parentheses `()` to force an operation to happen first! `(2 + 3) * 4` is `20`, but `2 + 3 * 4` is `14`.
*   **Division by Zero:** You cannot divide a number by zero. It will crash your program with an `ArithmeticException`!

## 8. Want to Learn More? (External links & Deep Dives)
*   [Oracle Java Tutorials - Operators](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/opsummary.html)
*   [W3Schools Java Math](https://www.w3schools.com/java/java_math.asp)