# Remote Base64
======

## Installation

  `npm install --save node-remote-base64`

## Usage

```javascript
  var remoteBase64 = require('node-remote-base64');
  
  const url = 'http://placehold.it/100x100';
  remoteBase65(url)
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

#### Babel (Async/Await)
```javascript
  import remoteBase64 from 'node-remote-base64';
  
  const url = 'http://placehold.it/100x100';
  const data = await remoteBase65(url);
```
