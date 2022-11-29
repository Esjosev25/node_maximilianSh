const http = require('http');

const fs = require('fs');
const server = http.createServer((req, res) => {
  console.log(req)
  const url = req.url;
  const method = req.method;
  
  if(url === '/'){
    res.setHeader('Content-type', 'text/html');
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <title>Enter message</title>
      <form action="/message" method="POST">
      <input type="text" ></input>
      <button>hi</button>
      </form>
    </body>
    </html>`);
    return res.end();
    
  }
  if(url ==="/message" && method==="POST"){
    fs.writeFileSync('message.txt', 'dummy');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-type', 'text/html');
  res.write(`<!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
      href=""
      rel="stylesheet"
      />
      <title></title>
      </head>
      <body>
      <h1>Hellow </h1>
      </body>
      </html>`);
  return res.end()
});

server.listen(3000);