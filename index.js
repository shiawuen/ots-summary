
var concat = require('concat-stream')
var spawn = require('child_process').spawn

module.exports = OTS

function OTS(opts){
  if (false == this instanceof OTS)
    return new OTS(opts)
  this.opts = opts = opts || {}
  opts.ratio = opts.ratio || 20
  opts.dictionary = opts.dictionary || void 0
}

OTS.prototype.ratio = function(ratio){
  this.opts.ratio = ratio
  return this
}

OTS.prototype.dictionary = function(dictionary){
  this.opts.dictionary = dictionary
  return this
}

OTS.prototype.end = function(source, next){
  if (!next) throw new Error('Missing callback')
  var mergeError = concat(function(err){
    if (err.length)
      next(new Error(err.toString()))
  })
  var params = ['-r', this.opts.ratio]
  if (this.opts.dictionary)
    params.push('-d', this.opts.dictionary)
  if ('function' !== typeof source.pipe) {
    var cat = spawn('cat', [source])
    source = cat.stdout
    cat.stderr.pipe(mergeError)
  }
  var task = spawn('ots', params)
  task.stdout.setEncoding('utf8')
  task.stdout.pipe(concat(function(data){ next(null, data) }))
  task.stderr.pipe(mergeError)
  source.pipe(task.stdin)
}
