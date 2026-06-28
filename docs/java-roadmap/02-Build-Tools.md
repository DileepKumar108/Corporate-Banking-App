# 2. Build Tools (Maven & Gradle) 🛠️

In the real world, you do not write 100% of the code yourself. You borrow tools and libraries written by other brilliant engineers. But how do you manage all those borrowed tools?

---

## 1. Dependency Management (Maven / Gradle)

### What is it?
A build tool (like Maven or Gradle) is a package manager for Java. It automatically downloads external libraries (like database connectors or security tools) from the internet and glues them to your project. It also handles "building" your code (translating it from Java into machine code so the server can run it).

### Real-World Analogy
Imagine you are building a house. 
Instead of chopping down trees yourself to make wood, you use a catalog (Maven). You write down: "I need 500 bricks from Acme Corp, and 1 roof from RoofCo." 
You give this list to your Project Manager (the Build Tool). The Project Manager automatically drives to the store, buys exactly what you asked for, and brings it to the construction site.

### Why use it? / When to use it?
Without a build tool, you would have to manually download `.jar` files from random websites and drag them into your folders. If a library updates, you have to do it again. You use Maven or Gradle on **every single enterprise project** to automate this.

### How to use it (Syntax & Code)
In Maven, you use a file called `pom.xml`. You write exactly what you need in XML format.
```xml
<!-- Telling Maven we want to borrow the Spring Web tool -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>3.1.2</version>
</dependency>
```
Once you save the file, Maven automatically downloads it into your project!

### Dileepkumar Bank Example
In our Node.js version of the bank, we used `npm` and `package.json` to download `express` and `bcryptjs`. If we were writing the bank in Java, we would use Maven and `pom.xml` to download `spring-boot-starter-web` (to build the API) and `spring-boot-starter-security` (to encrypt the passwords).

---
*Click back to the Interactive Roadmap to explore the next chapter!*
