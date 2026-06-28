# 3. Middleware 🛡️

### What is it?
Middleware are functions that run *in the middle* of a request. When a request hits your server, it goes through a pipeline of middleware functions before it finally reaches your main route logic.

### Real-World Analogy
Imagine trying to enter a VIP nightclub (Your Route). 
Before you get inside, you have to pass the Bouncer (Middleware). The Bouncer checks your ID. If your ID is fake, the Bouncer kicks you out and you never see the inside of the club. If your ID is real, the Bouncer lets you pass to the next stage.

### Why/When to use it
You use Middleware for Security (like JWT Token verification, CORS, and Rate Limiting), or for parsing data (like reading JSON bodies). It prevents you from writing security checks 100 times on every single route.

### Syntax & Code
```javascript
// A simple Middleware function
function checkBouncer(req, res, next) {
    if (req.headers.authorization !== "SecretPassword") {
        return res.status(401).send("Get out of here!");
    }
    next(); // Pass the request to the actual route
}

// Attach the middleware to a protected route
app.get('/api/vault', checkBouncer, (req, res) => {
    res.send("Welcome to the highly secure vault!");
});
```

### Dileepkumar Bank Example
In our bank, we implemented massive security middleware. We used a Global Rate Limiter middleware (`express-rate-limit`) to prevent hackers from DDoS attacking the server. Every single request had to pass the rate limiter bouncer before it could reach the banking logic.
