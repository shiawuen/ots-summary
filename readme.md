
#node-libots

Wrap libots for text summary

##Installation

```
npm i libots
```

##Example

```
var ots = require('libots);
var fs = require('fs')

var file = fs.createReadStream('example.txt')
ots({ ratio: 20 }).end(file, function(err, summary){
	if (err) throw err
	console.log(summary)
})
```

##License
MIT