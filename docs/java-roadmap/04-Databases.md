# 4. Databases (JDBC & Hibernate) 🗄️

In our Node.js tutorial, we saved data to a text file (`db.json`). In Java Enterprise apps, we connect to massive relational databases like Oracle or PostgreSQL. 

But Java speaks "Objects" and Databases speak "Tables". How do they talk to each other?

---

## 1. JDBC (Java Database Connectivity)

### What is it?
JDBC is the raw, low-level translator. It allows you to write raw SQL code (like `SELECT * FROM users`) directly inside your Java application and send it to the database over the network.

### Real-World Analogy
JDBC is like driving a manual transmission car. It gives you 100% raw control over the engine (the database), but it is very tedious, requires writing a lot of repetitive code, and if you make one typo in your SQL String, the app crashes.

### Why use it? / When to use it?
You use JDBC when you need absolute, ultra-high-performance control over a specific, complex database query. However, for 90% of daily tasks, it is too slow to write by hand.

### How to use it (Syntax & Code)
```java
// You have to manually open a connection, write the exact SQL, and manually map the results back to variables.
Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost/bank", "user", "password");
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT balance FROM accounts WHERE user = 'Dileep'");

while (rs.next()) {
    double balance = rs.getDouble("balance");
    System.out.println(balance);
}
```

---

## 2. ORM (Hibernate & Spring Data JPA)

### What is it?
ORM stands for **Object-Relational Mapping**. It completely hides JDBC from you. Instead of writing raw SQL tables, you just write normal Java Classes. The ORM automatically reads your Java Class and magically generates the SQL tables for you in the background!

**Hibernate** is the most famous Java ORM.

### Real-World Analogy
An ORM is like a Self-Driving Car. You don't have to steer, shift gears, or write SQL. You just say "Drive to the store" (save this object), and the ORM handles all the mechanical translation to the database.

### Why use it? / When to use it?
You use Hibernate/JPA on almost every enterprise project. It speeds up development by 10x because you never have to write raw SQL strings.

### How to use it (Syntax & Code)
You just use the `@Entity` annotation on a regular Java class. Hibernate sees this and instantly creates a database table called "Customer", with columns for "id" and "name".

```java
import jakarta.persistence.*;

@Entity // Tells Hibernate to turn this Class into a SQL Table!
public class Customer {
    
    @Id // Makes this the Primary Key in the database
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private double balance;
}
```

To save it, you don't write `INSERT INTO...` you just do this:
```java
Customer dileep = new Customer("Dileep", 50000.0);
customerRepository.save(dileep); // Hibernate writes the SQL automatically!
```

### Dileepkumar Bank Example
If we built Dileepkumar Bank in Java, we would create a `Transaction` class and mark it with `@Entity`. Whenever the Fraud Engine caught a money launderer, we would simply call `transactionRepository.save(fraudTx)`, and Hibernate would instantly write it to our PostgreSQL database so the FBI could review it later.

---
*Click back to the Interactive Roadmap to explore the next chapter!*
