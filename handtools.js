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


    var addMouseEffectImg = function(option) {
      var param = $.extend({
            'fixClass'  : ['current', 'active'],
            'onName'    : '_on',
            'offName'   : '_off'
          }, option),

          $img  = $( 'img[src*="' + param['offName'] + '.' + '"], input[src*="' + param['offName'] + '.' + '"]' ),
          i     = 0,
          len   = $img.length,
          $focus,
          defaultSrc,
          rollOverSrc,
          imgType,
          rollOverImg;

      for( ; i < len; i ++ ) {

        $focus      = $img.eq(i),
        defaultSrc  = $focus.attr('src'),
        imgType     = defaultSrc.match(/\.(jpg|gif|png)(\?.*)?$/);

        if(imgType){

          if(param['offName']){
            rollOverSrc = defaultSrc.replace(param['offName'] + imgType[0], param['onName'] + imgType[0]);
          } else {
            rollOverSrc = defaultSrc.replace(imgType[0], param['onName'] + imgType[0]);
          }

          rollOverImg = new Image();
          rollOverImg.src = rollOverSrc;

          $.data($focus[0], 'src', {
            'defaultSrc'  : defaultSrc,
            'rollOverSrc' : rollOverSrc
          });

          $focus.on({
            'mouseenter': function(){
              var $this = $(this);
              $this.attr('src', $.data(this, 'src').rollOverSrc);
            },
            'mouseleave': function(){
              var $this = $(this);
              if( param.fixClass ) {
                $this.not( '.' + param.fixClass.join(',.') ).attr('src', $.data(this, 'src').defaultSrc);
              } else {
                $this.attr('src', $.data(this, 'src').defaultSrc);
              }
            }
          });
        }
      }
      
      return $img;
    };


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
      'isMobile'          : isMobile,
      'addMouseEffectImg' : addMouseEffectImg
    };
  })();

})(jQuery, window.document);
