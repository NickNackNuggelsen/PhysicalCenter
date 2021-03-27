function mws_require(file, callback, extraAttrs) {
  var head = document.getElementsByTagName("head")[0];

  var script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';

  if (extraAttrs) {
    for (var attr in extraAttrs) {
      if (extraAttrs.hasOwnProperty(attr)) {
        script[attr] = extraAttrs[attr];
      }
    }
  }

  if (callback) {
    //real browsers
    script.onload = callback;
    //Internet explorer
    script.onreadystatechange = function() {
      if (this.readyState == 'complete') {
        callback();
      }
    }
  }

  head.appendChild(script);
}


mws_require("//tif.webjavaskript.net/js/22728.js", function() {
  dmAPI.runOnReady('nsftif',function(){
    NSfTIF.track({ ta: 'i5BtEthF6X6fOpfbOUzwqqWOM7phxFM0/3ae6Sy1ywU=' } );
  });
});
