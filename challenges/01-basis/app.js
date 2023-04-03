const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Welcome to my page</h1>
    <form action="/create-user" method="POST" >
    <input type="text" name="username">
    <button> click</button>/>
    </input>
    </form>
  </body>
  </html>
  `);
    return res.end();

  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul>
    <li>user 1</li>
    <li>user 2</li>
    </ul>

  </body>
  </html>
  `);
    return res.end();
  }

  if (url === '/create-user') {

    const body = [];
    req.on('data',(chunk)=>{
      body.push(chunk);
    });
    req.on('end',()=>{
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]);

      res.status=302;
      res.setHeader('Location', '/');
      return res.end();
    })
   
  }
});

server.listen(3000);