# 5. Testing (JUnit & Mockito) 🧪

In personal projects, if the code breaks, you just hit refresh. In a global bank managing billions of dollars, if the code breaks, you go to prison. 

How do we ensure our Java code never breaks? We write code to *test* our code.

---

## 1. JUnit (Unit Testing)

### What is it?
JUnit is the industry-standard framework for writing "Unit Tests" in Java. A Unit Test isolates one tiny piece of your code (like a single math function) and throws hundreds of hypothetical scenarios at it to make sure it answers correctly every single time.

### Real-World Analogy
Imagine building a car. Before you put the engine in the car, you put the engine on a test stand. You redline it to 8,000 RPMs for 10 hours straight to see if it explodes. That is a Unit Test. You are testing *one unit* (the engine) in complete isolation.

### Why use it? / When to use it?
You write tests on **every single enterprise project**. If another developer joins the team and accidentally deletes a minus sign in the DTI calculation, the JUnit tests will immediately turn red and block them from pushing their code to GitHub.

### How to use it (Syntax & Code)
You use the `@Test` annotation, and then you make an `Assertion` (a claim of what the answer *should* be).

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class MathEngineTest {

    @Test
    public void testAddition() {
        // We claim that 5 + 5 should equal 10.
        // If the Math Engine answers anything other than 10, the test FAILS.
        int result = MathEngine.add(5, 5);
        assertEquals(10, result); 
    }
}
```

---

## 2. Mockito (Mocking Data)

### What is it?
Mockito is a library used alongside JUnit. Sometimes, the code you are testing relies on an external database or a 3rd party API (like checking a real Credit Bureau for FICO scores). You don't want to actually ping the real Credit Bureau 1,000 times during a test. Mockito creates a "Fake" (Mock) version of that database.

### Real-World Analogy
Imagine training a pilot in a Flight Simulator. The pilot thinks they are flying a real plane, but the clouds and the turbulence are completely fake (Mocked) by the computer. Mockito puts your Java code into a flight simulator.

### How to use it (Syntax & Code)
We use the `@Mock` annotation to create a fake database.

```java
import static org.mockito.Mockito.when;

public class FraudEngineTest {

    @Mock
    Database fakeDatabase;

    @Test
    public void testFraudDetection() {
        // We tell the fake database: "When the engine asks for Dileep's balance, lie and say he has $1 Million."
        when(fakeDatabase.getBalance("Dileep")).thenReturn(1000000.0);

        // Now we run the Fraud Engine on Dileep. 
        // The Engine doesn't know the database is fake!
        boolean isFraud = FraudEngine.check("Dileep");
        
        // Assert that the engine correctly flagged the massive balance
        assertTrue(isFraud);
    }
}
```

### Dileepkumar Bank Example
If we built Dileepkumar Bank in Java, our `UnderwritingEngine` would heavily rely on JUnit. We would write tests that simulate a customer with a 90% Debt-to-Income ratio. We would use Mockito to mock their credit score. If the `UnderwritingEngine` accidentally output `APPROVED` for this high-risk customer, the JUnit test would fail, the alarms would sound, and the bug would be caught before it ever reached the internet!

---
*You have completed the Interactive Java Encyclopedia! You are now ready to build Enterprise Java Applications.*
