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
     * [addMouseEffectImg description]
     * add 'mouseenter' and 'mouseleave' event to <img> and <input> including '_off' in 'src' attribute.
     * 
     * @return {[jQuery object]} [description]
     * jQuery object added this event
     */
    var addMouseEffectImg = function(option) {
      var param = $.extend({
            'fixClass'  : ['current', 'active'],
            'onName'    : '_on',
            'offName'   : '_off'
          }, option),

          $img  = $( 'img[src*="' + param.offName + '.' + '"], input[src*="' + param.offName + '.' + '"]' ),
          i     = 0,
          len   = $img.length,
          $focus,
          defaultSrc,
          rollOverImg,
          rollOverSrc,
          imgType;

      for( ; i < len; i ++ ) {

        $focus      = $img.eq(i);
        defaultSrc  = $focus.attr('src');
        imgType     = defaultSrc.match(/\.(jpg|gif|png)(\?.*)?$/i);

        rollOverSrc = defaultSrc.replace(param.offName + imgType[0], param.onName + imgType[0]);

        rollOverImg = new Image();
        rollOverImg.src = rollOverSrc;

        $.data($focus[0], 'src', {
          'defaultSrc'  : defaultSrc,
          'rollOverSrc' : rollOverSrc
        });
      }

      $img.on({
        'mouseenter': function(){
          $(this).attr('src', $.data(this, 'src').rollOverSrc);
         },
        'mouseleave': function(){
          var $this = $(this);
          if( !(param.fixClass && $this.is('.' + param.fixClass.join(',.'))) ) {
            $this.attr('src', $.data(this, 'src').defaultSrc);
          }
        }
      });

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
