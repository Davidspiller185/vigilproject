import http from 'http';
import router from './routes.js'
import { send, status } from './utils.js';

const server = http.createServer();

server.on('request', (req, res) => {

  
  const url = new URL(req.url, 'http://' + req.headers.host);
  req.query = Object.fromEntries(url.searchParams);

  
  if (['GET', 'DELETE'].includes(req.method)) req.resume();

  let body = '';

  
  req.on('data', chunk => {
    body += chunk;
  })



  req.on('end', () => {
    req.body = body ? JSON.parse(body) : null;
    
    
    res.send = send;
    res.status = status;
    
    
    let handler = router[req.method][req.url];
    if (handler) return handler(req, res);

    
    handler = router[req.method][url.pathname];
    if (handler) return handler(req, res);

    
    req.params = {};
    const arrParams = req.url.split('/');
    const param = arrParams.pop();
    const path = arrParams.join('/') || '/';

    for (const url in router[req.method]) {
      if (url.includes('/:')) {
        let [baseUrl, paramName] = url.split('/:');
        if(!baseUrl) baseUrl = '/';
        if (path === baseUrl) {
          req.params[paramName] = param;
          router[req.method][url](req, res);
        }
      }
    }

  })
})

server.listen(3000, () => console.log('Listening on port 3000...'));