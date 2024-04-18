const http = require('http');

const server = http.createServer((req, res) => {
  if(req.url === '/hello') {
    res.write('<!DOCTYPE html>');
    res.write('<html><head><title>Node.js Introduction</title></head><body>');
    res.write('<h1>Hello World</h1>');
    res.write('<p>Welcome to Node.js</p>');
    res.write('<input type="text" id="myInput" placeholder="Enter your name" />');
    res.write('<button onclick="showName()">Submit</button>');
    res.write('<script>');
    res.write('function showName() {');
    res.write('  var inputElement = document.getElementById("myInput");');
    res.write('  alert("Hello, " + inputElement.value);');
    res.write('}');
    res.write('</script>');
    res.write('</body></html>');
    res.end();

    return;
  } else {
    res.write('<!DOCTYPE html>');
    res.write('<html><head><title>Node.js Introduction</title></head><body>');
    res.write('<h1>Page Not Found</h1>');
    res.write('<p>The page you are looking for is not found.</p>');
    res.write('</body></html>');
    res.end();

    return;
  }
}).listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});