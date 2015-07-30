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
     * [formatDate description]
     * 与えられたパターン文字列に従って整形された日時の文字列を返す関数です。
     * 文字列の中に下記の文字が含まれていた場合、対応する日時情報に置き換えられます。
     * 下記の文字は複数つなげることによって、その数だけ0づめされます。
     * y: 年, M: 月, d: 日, E: 曜日, H: 時, m: 分, s: 秒
     * 例: 'yyyy/MM/dd E HH:mm:ss' -> '2015/08/10 月 09:30:05'
     * @param {string} pattern - 出力したい日時の文字列のパターン
     * @param {Date} date - 文字列として出力したい日時
     * @return {string} 日時を表現する文字列
     */
    function formatDate(pattern, date) {
      return pattern.replace(/([yMdEHms])\1*/g, function(match) {
        return translateDatePattern(match, date);
      });
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

     /**
      * @private
      * [translateDatePattern description]
      * パターンに従って日時情報の文字列を返す関数です。
      * formatDate 関数内で用います。
      * 例: 'MM' -> '08'
      * @param {string} pattern - 出力したい日時の文字列のパターン
      * @param {Date} date - 文字列として出力したい日時
      * @return {string} 日時を表現する文字列
      */
    function translateDatePattern(pattern, date) {
      var char = pattern.charAt(0),
          value,
          i,
          len,
          pad;

      switch (char) {
        case 'y': // 年
          value = date.getFullYear().toString();
          break;
        case 'M': // 月
          value = (date.getMonth() + 1).toString();
          break;
        case 'd': // 日
          value = date.getDate().toString();
          break;
        case 'E': // 曜日
          // 以後の処理は不要なため、曜日はここでリターン
          return ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
        case 'H': // 時 (24時間)
          value = date.getHours().toString();
          break;
        case 'm': // 分
          value = date.getMinutes().toString();
          break;
        case 's': // 秒
          value = date.getSeconds().toString();
          break;
        default:
          throw new Error('第1引数が不正です。日時フォーマットに使用可能な文字のみを使用してください。');
      }

      // どの長さまで0づめするか
      len = Math.max(pattern.length, value.length);

      // 0づめのためのパディング
      pad = '';
      for (i = 0; i < len; i++) {
        pad += '0';
      }

      return (pad + value).slice(-len);
    }

    return {
      'isMobile' : isMobile,
      'extractUrlParams': extractUrlParams,
      'formatDate': formatDate
    };
  })();

})(jQuery, window.document);
