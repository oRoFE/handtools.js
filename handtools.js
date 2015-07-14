;(function($, document) {
  'use strict';


  $.handtools = (function() {

    /**
     * Public variables
     */
    var UA = navigator.userAgent;


    /**
     * Public functions
     */

    /**
     * [isMobile description]
     * check whether userAgent is matched mobile or not
     */
    var isMobile = function() {
      var useragents = [
            'iPhone',         //  Apple iPhone
            'iPod',           //  Apple iPod touch
            'Android',        //  1.5+ Android
            'dream',          //  Pre 1.5 Android
            'CUPCAKE',        //  1.5+ Android
            'blackberry9500', //  Storm
            'blackberry9530', //  Storm
            'blackberry9520', //  Storm v2
            'blackberry9550', //  Storm v2
            'blackberry9800', //  Torch
            'webOS',          //  Palm Pre Experimental
            'incognito',      //  Other iPhone browser
            'webmate'         //  Other iPhone browser
          ],
          i       = 0,
          len     = arguments.length,
          pattern,
          matchStr;

      for( ; i < len; i++ ) {
        useragents.push(arguments[i]);
      }

      pattern = new RegExp(useragents.join('|'), 'i');
      matchStr = UA.match(pattern);

      return matchStr? matchStr[0] : false;
    };

    /**
     * [extractUrlParams description]
     * URL のパラメータをオブジェクトとして返す関数です。
     * 例: http://example.com/?q=search&foo=bar
     *    => { q: 'search', foo: 'bar' }
     * @return {object} URL パラメータのオブジェクト
     */
    function extractUrlParams() {
      var paramObj = {},
          i,
          ii,
          param,
          paramList;

      // '?' を除くクエリ文字列を取得し、'&' で区切り、配列にする。
      paramList = location.search.slice(1).split('&');

      // それぞれのパラメータの値をオブジェクト内へと格納する。
      for (i = 0, ii = paramList.length; i < ii; i++) {
        param = paramList[i].split('=');

        // 左辺が空の場合は結果には含めない
        if (param[0] === '') {
          continue;
        }

        // 右辺がない場合は空文字を入れる
        param[1] = param[1] || '';

        paramObj[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
      }

      return paramObj;
    }

    /**
     * for IE
     */
    if('undefined' === typeof window.console) {
      window.console = {};

      console.log      =
      console.error    =
      console.info     =
      console.debug    =
      console.warn     =
      console.trace    =
      console.dir      =
      console.dirxml   =
      console.group    =
      console.groupEnd =
      console.time     =
      console.timeEnd  =
      console.assert   =
      console.profile  = $.noop;
    }

    /**
     * Private functions
     */

    return {
      'isMobile' : isMobile,
      'extractUrlParams': extractUrlParams
    };
  })();

})(jQuery, window.document);
