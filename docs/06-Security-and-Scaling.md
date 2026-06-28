# 06: Security & Scaling 🛡️

When you build an enterprise application, making the code "work" is only 10% of the job. The other 90% is ensuring it is fast enough to handle millions of users, and secure enough to stop elite hackers.

In Dileepkumar Bank, we encountered three massive engineering challenges. Here is exactly how we solved them.

## Challenge 1: The Event Loop Block (Performance)

**The Problem:**
Initially, whenever a user submitted a transaction, the backend used this code to save it to the database:
```javascript
const saveDb = () => {
  fs.writeFileSync(dbFile, JSON.stringify(db));
};
```
Notice the word `Sync` in `writeFileSync`. That stands for **Synchronous**. 

Node.js runs on a "Single Thread" (meaning it only has one brain processing tasks, unlike a computer with an 8-core processor). When you use a Synchronous command, Node.js stops everything it is doing, completely freezing the entire server, until the hard drive finishes writing the file. 

If 10,000 users hit "Send Money" at the same time, the 10,000th user would be stuck staring at a loading screen for minutes while the server slowly wrote files one by one.

**The Solution:**
We changed it to **Asynchronous** programming using Promises.
```javascript
const saveDb = async () => {
  await fs.promises.writeFile(dbFile, JSON.stringify(db));
};
```
By switching to `fs.promises.writeFile`, we told Node.js: "Hey, ask the hard drive to start saving this file, but *don't wait around for it to finish*." Node.js instantly turns around and accepts the next user's request. When the hard drive finishes saving, it taps Node.js on the shoulder and says "I'm done!". This makes the server incredibly fast and capable of handling massive traffic.

## Challenge 2: The Path Traversal Hack (Security)

**The Problem:**
We built a feature for employees to download customer documents (like tax returns). The code looked like this:
```javascript
app.get('/api/documents/download/:filename', (req, res) => {
  // Grab the filename the user requested from the URL
  const filename = req.params.filename; 
  
  // Look inside the 'uploads' folder for that file
  const filePath = path.join(__dirname, 'uploads', filename);
  
  // Send the file to the user
  res.download(filePath);
});
```
This looks perfectly innocent. If the user asks for `tax_return.pdf`, the server looks in `/uploads/tax_return.pdf` and sends it.

However, a hacker realized they could ask for a file named: `../../../server.js`.
The server blindly joined the path: `/uploads/../../../server.js`. 
In computer terms, `../` means "go backwards one folder". By using `../`, the hacker broke *out* of the `uploads` folder, went backward into the main bank directory, and downloaded the source code of our secure server!

**The Solution:**
We fixed it using `path.basename()`.
```javascript
  const safeFilename = path.basename(req.params.filename);
  const filePath = path.join(__dirname, 'uploads', safeFilename);
```
`path.basename()` is a security tool that automatically strips out all directory paths. If the hacker sends `../../../server.js`, `path.basename` instantly strips out the `../` and converts it to just `server.js`. The server then looks in `/uploads/server.js`, realizes the file doesn't exist in that specific folder, and stops the hacker cold.

## Challenge 3: Unrestricted CORS (Security)

**The Problem:**
Our backend API was originally configured like this:
```javascript
app.use(cors()); 
```
CORS stands for **Cross-Origin Resource Sharing**. By leaving it blank, we essentially told the server: "Accept API requests from *any website on the internet*."

If a user was logged into Dileepkumar Bank, and then they visited a malicious website (`www.evil-hacker.com`), that malicious website could secretly send an API request to `http://localhost:3000/api/transactions` behind the scenes. Because the user was logged in, the bank would accept the transaction! This is known as a CSRF attack.

**The Solution:**
We hardened the CORS policy.
```javascript
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
```
We told the backend server: "If an API request comes from ANY website other than `http://localhost:5173` (our official React frontend), block it immediately." 

Now, when `www.evil-hacker.com` tries to send a request, the browser's CORS policy steps in like a bouncer and drops the connection before it even reaches the vault.

---
## 🎓 Graduation

Congratulations! You have completed the Dileepkumar Bank Masterclass. You now understand Frontend UI development, Backend APIs, synchronous vs asynchronous performance, complex business logic, and enterprise security.

Now, go out there and build something incredible!
