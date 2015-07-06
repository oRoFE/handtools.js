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
     * 年月日時分秒（時、分、秒は任意）を指定すると、残り年月日時分秒が返る。
     *
     * @param {int} year  指定日の「年」
     * @param {int} month  指定日の「月」
     * @param {int} date  指定日の「日」
     * @param {int} hour  指定日の「時」
     * @param {int} minute  指定日の「分」
     * @param {int} second  指定日の「秒」
     * @return {object} year  指定日までの残年数（※時分秒は考慮しない）
     * @return {object} month  指定日までの残月数（※時分秒は考慮しない）
     * @return {object} date  指定日までの残日数
     * @return {object} hour  指定日までの残時間
     * @return {object} minute  指定日までの残分
     * @return {object} second  指定日までの残秒
     */
    function getCountDown(year, month, date, hour, minute, second) {
      if (!year || !month || !date || parseInt(year, 10) === 0 || parseInt(month, 10) === 0 || parseInt(date, 10) === 0 || parseInt(month, 10) > 12) return false;
      if (!hour) hour = 0;
      if (!minute) minute = 0;
      if (!second) second = 0;
      
      var
        // 指定日のint化
        targetYear = parseInt(year, 10),
        targetMonth = parseInt(month, 10),
        targetDate = parseInt(date, 10),
        targetHour = parseInt(hour, 10),
        targetMinute = parseInt(minute, 10),
        targetSecond = parseInt(second, 10),
        
        // 現在の設定
        dateObj = new Date(),
        todayYear = dateObj.getFullYear(),
        todayMonth = dateObj.getMonth() + 1,
        todayDate = dateObj.getDate(),
        todayHour = dateObj.getHours(),
        todayMinute = dateObj.getMinutes(),
        todaySecond = dateObj.getSeconds(),
        
        // 時間差の算出
        targetUTC = Date.UTC(targetYear, targetMonth, targetDate, targetHour, targetMinute, targetSecond),
        todayUTC = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond),
        scope = Math.max(0, targetUTC - todayUTC),
        
        // 結果
        result = {
          "year": Math.max(0, targetYear - todayYear),
          "month": Math.floor(Math.max(0, (targetYear * 12 + targetMonth) - (todayYear * 12 + todayMonth) + (targetDate - todayDate) / 100)),
          "date": Math.floor(scope / 1000 / 60 / 60 / 24),
          "hour": Math.floor(scope / 1000 / 60 / 60),
          "minute": Math.floor(scope / 1000 / 60),
          "second": Math.floor(scope / 1000)
        };
        
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
