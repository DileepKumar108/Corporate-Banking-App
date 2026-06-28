# 5. Type Casting

### What is it?
Converting one data type into another (e.g., turning a `double` 15.5 into an `int` 15).

### Real-World Analogy
Pouring a large bucket of water (double) into a small cup (int). Some water (the decimal) spills out.

### Why/When to use it
When an API gives you text, but you need a number to do math.

### Syntax & Code
```java
double exactBalance = 10.99;
int roughBalance = (int) exactBalance; // Becomes 10
```

### Dileepkumar Bank Example
Converting a string "100" from a frontend form into a double `100.00`.