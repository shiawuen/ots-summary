

Wrap libots for text summary

##Installation

```
npm i ots-summary
```

##Example

```
var ots = require('ots-summary);
var fs = require('fs')

var file = fs.createReadStream('example.txt')
ots({ ratio: 20 }).end(file, function(err, summary){
	if (err) throw err
	console.log(summary)
})
```

##License
MIT