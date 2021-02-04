// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $last = $('.last');
var $siteList = $('.siteList');
var getStr = JSON.parse(localStorage.getItem('hash'));
var hash = getStr || [{
  logo: 'B',
  url: 'https://www.bilibili.com'
}, {
  logo: 'W',
  url: 'https://www.weibo.com'
}, {
  logo: 'D',
  url: 'https://www.douyu.com'
}, {
  logo: 'Z',
  url: 'https://www.zhihu.com/'
}, {
  logo: 'X',
  url: 'https://www.ximalaya.com/'
}, {
  logo: 'G',
  url: 'https://github.com/'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '').replace('.com', '');
};

var rander = function rander() {
  $siteList.find('.site:not(.last)').remove();
  hash.forEach(function (node, index) {
    var iconSrc = "".concat(node.url + '/favicon.ico');
    var $li = $("<li class=\"site\">\n            <div class=\"icon-wrapper\">".concat(node.logo, "</div>\n            <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n            <svg class=\"icon close\" aria-hidden=\"true\">\n                    <use xlink:href=\"#icon-shanchu\"></use>\n                </svg></li>")).insertBefore($last);
    $li.find('.icon-wrapper').addClass("".concat(simplifyUrl(node.url)));
    var $img = $("<img class=\"icon-wrapper\" src=\"".concat(iconSrc, "\"/>"));
    $img.on('load', function () {
      var $removeClass = $('.site').find("".concat('.' + simplifyUrl(iconSrc)));
      $removeClass.replaceWith($img);
    });
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hash.splice(index, 1);
      localStorage.setItem('hash', JSON.stringify(hash));
      rander();
    });
    var timeOutEvent;
    var $site = $('.site');
    $site.on({
      touchstart: function touchstart(e) {
        timeOutEvent = setTimeout(function () {
          if (e.target.lastChild) e.target.lastChild.style.display = 'block';
        }, 500);
      },
      touchmove: function touchmove() {
        clearTimeout(timeOutEvent);
      }
    });
    $(document).on("click", function () {
      $li.find(".close").css("display", "none");
    });
  });
};

rander();
$('.addButton').on('click', function () {
  var url = window.prompt('请输入要添加的网址');

  if (url && url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  if (url) {
    hash.push({
      logo: simplifyUrl(url)[0].toUpperCase(),
      url: url
    });
    localStorage.setItem('hash', JSON.stringify(hash));
    rander();
  }
});

window.onbeforeunload = function () {
  localStorage.setItem('hash', JSON.stringify(hash));
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.97c38e89.js.map