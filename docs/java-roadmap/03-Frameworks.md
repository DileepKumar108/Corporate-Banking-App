# 3. Web Frameworks (Spring Boot) 🌱

Writing a web server from scratch in pure Java is excruciatingly painful. You have to manually manage HTTP connections, port listening, and thread pooling. 

To solve this, we use **Frameworks**. A framework gives you a fully working car; you just have to paint it and decide where to drive.

---

## 1. Spring Boot

### What is it?
Spring Boot is the absolute undisputed king of Java backend frameworks. It takes the massive, highly-complex "Spring" ecosystem and "boots" it up automatically with default settings, allowing you to create a running web server in seconds.

### Real-World Analogy
Imagine opening a restaurant. 
If you use pure Java, you have to build the oven, wire the electricity, and hire the waiters yourself before you can cook a single meal.
If you use **Spring Boot**, you walk into a fully furnished, operational restaurant. The ovens are hot, the waiters are ready. All you have to do is write the menu (your API routes) and cook the food (your business logic).

### Why use it? / When to use it?
You use Spring Boot for 99% of modern Java web applications. It handles security, database connections, and API routing out-of-the-box. It is used by Netflix, Uber, and thousands of global banks.

### How to use it (Syntax & Code)
Here is how you open an API "door" (endpoint) in Spring Boot. It uses **Annotations** (words starting with `@`) to do heavy lifting invisibly.

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TransactionController {

    // When a POST request hits /api/transactions, run this code!
    @PostMapping("/transactions")
    public String createTransaction(@RequestBody double amount) {
        if (amount < 0) {
            return "Error: Cannot send negative money!";
        }
        return "Successfully sent $" + amount;
    }
}
```

### Dileepkumar Bank Example
In our Node.js server, we used `app.post('/api/transactions')` via the Express framework. In Java, we use the `@PostMapping("/transactions")` annotation via the Spring Boot framework. Both do the exact same thing: they open a secure vault door and listen for the Frontend to send money!

---

## 2. Dependency Injection (Inversion of Control)

### What is it?
This is the core magic behind Spring Boot. Instead of your Objects creating their own tools, Spring Boot acts as a giant factory. When your Object needs a tool, it simply asks Spring to "inject" it.

### Real-World Analogy
Imagine a Surgeon. 
Without Dependency Injection, the Surgeon has to pause the surgery, walk to the store, buy a scalpel, bring it back, and then use it.
With **Dependency Injection**, the Surgeon just holds out their hand. A nurse (Spring Boot) instantly places the exact right scalpel into their hand.

### How to use it
We use the `@Autowired` annotation to tell Spring to inject a tool.
```java
@RestController
public class LoanController {

    // The Controller doesn't create the engine, it asks Spring to provide it!
    @Autowired
    private UnderwritingEngine underwritingEngine; 

    @PostMapping("/apply")
    public String applyForLoan() {
        // The engine is ready to use instantly!
        return underwritingEngine.calculateFico(); 
    }
}
```

---
*Click back to the Interactive Roadmap to explore the next chapter!*
