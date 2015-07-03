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
     * [getCountDown description]
     * 年月日を指定するだけで、その日までの残日数がreturnされるメソッドです。
     *
     * 使用例:
     * var getCount = $.handtools.getCountDown(2020, 7, 24); // 東京オリンピック(2020)までのカウントダウン
     *
     * @param {int} year  対象日付の「年」
     * @param {int} month  対象日付の「月」
     * @param {int} date  対象日付の「日」
     * @return {int}  対象までの残日数
     */
    function getCountDown(year, month, date) {
      // 戻り値
      var result = 0;
      
      // Dateオブジェクトを生成
      var
        dateObj = new Date(),
        todayYear = dateObj.getFullYear(),
        todayMonth = dateObj.getMonth(),
        todayDate = dateObj.getDate();
      
      // イベントまでの協定世界時をミリ秒で取得
      var eventUTC = Date.UTC(year, month - 1, date);
      
      // 現在までの協定世界時をミリ秒で取得
      var todayUTC = Date.UTC(todayYear, todayMonth, todayDate);
      
      // イベントまでの差分を日数に直す
      result = Math.max(0, (eventUTC - todayUTC) / 1000 / 60 / 60 / 24);
      
      return result;
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
      'isMobile': isMobile,
      'getCountDown': getCountDown
    };
  })();

})(jQuery, window.document);
