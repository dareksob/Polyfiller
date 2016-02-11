# Polyfiller
load resources by detection
Polyfiller is written in EcmaScript5 standard, but require promises

## require
promise
can implemented by polyfill 
https://cdnjs.cloudflare.com/ajax/libs/es6-promise/3.0.2/es6-promise.min.js

## info
for detection you can use third part projects like modernizr or featurejs

Example
´´´´´´´´´´
Polyfiller
// pre defined urls
  .map({
    'fetch': 'https://cdnjs.cloudflare.com/ajax/libs/fetch/0.11.0/fetch.min.js'
  })
// write detection and loading  by map
  .test(
    typeof window.fetch === 'function',
    function() {
        return Polyfiller.load('fetch')
    }
  )
// alternative
  .test(
    typeof window.fetch === 'function',
    'fetch'
  )
// write detection and loading
  .test(
    function() {
        return false; // feature not exists
    },
    function() {
        return Polyfiller.load('local/cdn/URL');
    }
  )
// hard defined loading
  .test(
    false,
    function() {
        return new Promise() // what ever
    }
  )
// if errors happend
  .catch(function(event) {
    // your code
  })
  
// all polyfills (scripts) loaded
  .ready(function() { 
    // your code 
  });
´´´´´´´´´´


You can also load styles with load function
Polyfiller
    .load('local/cdn/URL.css', 'link')
    .then(function()) {
        // ready
    });
    
    
## documentation

### properties

#### parentNode
(default head or body node)
require a node element

### functions
#### map: function(mapping) 
set mapping

@param mapping
@returns {Polyfiller}

#### test: function (test, calling)
test and load as fallback

@param test function or boolean
@param calling function or string
@returns {Polyfiller}

#### ready: function(callback)
called after all test and loaded done
@param callback
@returns {Polyfiller}


#### catch: function(callback)
@param callback
@returns {Polyfiller}


#### load: function (url, type)
internal loader
support script and link tags

@param url URL or map key
@param type default script, link is optional
@returns {Promise}
