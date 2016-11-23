# Remote Base64
======

## Installation

  `npm install --save node-remote-base64`

## Usage

#### ES5
```javascript
  const remoteBase64 = require('node-remote-base64');
  
  const getBase64 = () =>
    remoteBase65('http://placehold.it/100x100')
      .then(data => console.log(data))
      .catch(err => console.log(err));
```

#### Babel ES7 (Async/Await)
```javascript
  import remoteBase64 from 'node-remote-base64';

  const getBase64 = async () {
    const b64data = await remoteBase65('http://placehold.it/100x100');
    console.log(b64data);
  }
```
