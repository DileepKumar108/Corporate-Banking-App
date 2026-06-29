# Loops in Java
## 1. Explain it to me like I'm 5 (For Complete Beginners)
Imagine you are punished in school and the teacher tells you to write "I will not talk in class" 100 times on the chalkboard. Doing that by hand is exhausting. A loop is a way to tell the computer: "Do this specific thing 100 times for me," so you only have to write the code once!

## 2. Why does this even exist? (The Problem it Solves)
Programmers hate repeating themselves. If you need to process 1,000 user profiles, you don't want to write the processing code 1,000 times. Loops automate repetitive tasks, running a block of code over and over again until a specific condition is met.

## 3. Real-World Analogy
Think about eating a bowl of soup. The algorithm is:
1. Scoop soup onto spoon.
2. Eat soup.
3. Is the bowl empty? If no, go back to step 1.
This is a loop! You keep repeating the scooping and eating actions *while* there is still soup in the bowl.

## 4. The Syntax (How to write it from scratch)
There are three main types of loops, but the `for` loop is the most common for counting.

```java
// For Loop: Great when you know exactly how many times to loop
for (start; condition to keep going; what to do after each step) {
    // code to repeat
}

// While Loop: Great when you don't know how many times, just loop WHILE something is true
while (condition) {
    // code to repeat
}
```

## 5. Basic Example (Hello World level)
```java
public class LoopBasics {
    public static void main(String[] args) {
        
        // A for loop that counts from 1 to 5
        System.out.println("Counting to 5:");
        for (int i = 1; i <= 5; i++) {
            System.out.println("Number: " + i);
        }
        
        // A while loop doing the same thing
        System.out.println("Counting to 3 with a while loop:");
        int count = 1;
        while (count <= 3) {
            System.out.println("Count: " + count);
            count++; // don't forget to increase count, or it loops forever!
        }
    }
}
```

## 6. Enterprise Bank Example (Dileepkumar Bank context)
```java
public class BankStatementPrinter {
    public static void main(String[] args) {
        // An array of recent transaction amounts
        double[] transactions = {150.00, -25.50, -10.00, 200.00, -5.99};
        
        System.out.println("--- Dileepkumar Bank Monthly Statement ---");
        
        // We use a loop to go through the array
        for (int i = 0; i < transactions.length; i++) {
            double currentTransaction = transactions[i];
            
            if (currentTransaction > 0) {
                System.out.println("DEPOSIT: +$" + currentTransaction);
            } else {
                System.out.println("WITHDRAWAL: -$" + Math.abs(currentTransaction));
            }
        }
        System.out.println("------------------------------------------");
    }
}
```

## 7. Common Mistakes & Gotchas
*   **Infinite Loops:** If the condition in your `while` loop never becomes false, the loop will run forever until your computer crashes or you kill the program. Always make sure the condition will eventually end the loop!
*   **Off-by-One Errors:** When looping through arrays, it's very easy to loop one time too many or one time too few. Remember arrays start at `0` and go up to `length - 1`. `for (int i = 0; i < array.length; i++)` is the golden rule.
*   **Scope:** A variable declared inside a loop (like `int i = 0` in a for loop) cannot be used outside of that loop!

## 8. Want to Learn More? (External links & Deep Dives)
*   [Oracle Java Tutorials - For Loop](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html)
*   [Oracle Java Tutorials - While Loop](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/while.html)