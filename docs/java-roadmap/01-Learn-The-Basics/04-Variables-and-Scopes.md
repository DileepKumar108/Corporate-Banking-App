# 4. Variables and Scopes

### What is it?
Variables hold data. Scope determines where that variable is allowed to be seen or used.

### Real-World Analogy
A global variable is a loudspeaker. A local variable is a whisper in a private room.

### Why/When to use it
Keep variables as local as possible to avoid security leaks.

### Syntax & Code
```java
public void calculate() { int localTotal = 50; }
```

### Dileepkumar Bank Example
A user's transaction is local. The bank's total vault amount is global.