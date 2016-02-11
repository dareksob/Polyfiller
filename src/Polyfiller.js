/**
 * Polyfiller
 *
 * @ecmascript 5
 * @require promise
 */

var Polyfiller = {
  count: 0,
  listener: {
    ready: [],
    error: []
  },
  parentNode: document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0],
  mapping: {},

  /**
   * set mapping
   *
   * @param mapping
   * @returns {Polyfiller}
   */
  map: function(mapping) {
    this.mapping = mapping;
    return this;
  },

  /**
   * test and load as fallback
   *
   * @param test function or boolean
   * @param calling function or string
   * @returns {Polyfiller}
   */
  test: function (test, calling) {
    if (typeof test === 'function') {
      test = test();
    }

    if (test === true) {
      return this;
    }

    var type = typeof calling;
    var promise;

    // load by function
    if (type == 'function') {
      promise = calling();
    }
    // load by url
    else {
      promise = this.load(calling);
    }

    // regist promise
    if (promise && typeof promise.then === 'function') {
      this.count++;
      promise
        .then(function(response) {
          this.count--;
          return response;
        }.bind(this))
        .then(this.onLoaded.bind(this))
        .catch(this.onError.bind(this));
    } else {
      console.warn('calling not promise like');
      this.onLoaded();
    }

    return this;
  },

  /**
   * @param callback
   * @returns {Polyfiller}
   */
  ready: function(callback) {
    this.listener.ready.push(callback);
    this.onLoaded();
    return this;
  },

  /**
   *
   * @param callback
   * @returns {Polyfiller}
   */
  catch: function(callback) {
    this.listener.error.push(callback);
    return this;
  },

  /**
   * interal event called after loaded
   */
  onLoaded: function() {
    if ( ! this.count) {
      this.listener.ready.forEach(function(listener) {
        listener();
      })
    }
  },

  onError: function(event) {
    this.listener.error.forEach(function(listener) {
      listener(event);
    })
  },

  /**
   * internal loader
   * support script and link tags
   *
   * @param url
   * @param type
   * @returns {Promise}
   */
  load: function (url, type) {
    var parentNode = this.parentNode;

    // overwrite url by mapping
    if (this.mapping.hasOwnProperty(url)) {
      url = this.mapping[url];
    }

    return new Promise(function(resolve, reject) {
      var script = document.createElement(type ? type : 'script');

      if (type === 'script') {
        script.src = url;
      } else {
        script.rel = 'stylesheet';
        script.type = 'text/css';
        script.href = url;
      }

      script.onload = script.onreadystatechange = function (event) {
        if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
          resolve(event);
        }
      };
      script.onerror = reject;
      parentNode.appendChild(script);
    });
  }
};