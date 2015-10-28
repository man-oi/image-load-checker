var imagesloaded = function(args) {

    console.log('start');

    var imageElements       = null,
        loadedImages        = 0,
        errorImages         = 0,
        timeoutFunctions    = [],

    defaults = {
        imageSelector   : 'img',    
        timeoutTime     : 1000 * 60,

        imageLoaded     : function(element) {
            element.classList.add('loaded');
        },
        imageError      : function(element) {
            element.classList.add('error');
        },
        imageTimeout    : function(element) {}
    },

    options = {},

    init    =   function() {
        console.log('init');
        
        if (args === undefined) {
            args = {};
        }
        options = extend(options, defaults, args);

        imageElements = document.querySelectorAll(options.imageSelector);
        
        bindEvents();
    },

    bindEvents = function() {
        console.log('bind');
        var event = document.createEvent("HTMLEvents");
        
        for (var i = 0; i < imageElements.length; i++) {
            imageElements[i].addEventListener('load', loaded);
            imageElements[i].addEventListener('error', error);

            timeoutFunctions[i] = window.setTimeout(function(i) {
                timeout(imageElements[i])
            }, options.timeoutTime, i);

            if (imageElements[i].complete) {
                if (imageElements[i].naturalWidth  === 0) {
                    event.initEvent("error", true, true);
                }
                else {
                    event.initEvent("load", true, true);
                }

                imageElements[i].dispatchEvent(event);
            }            
        }
    },


    /*
        Image Events
    */
    loaded = function(e) {
        console.log('loaded: ' + e.target.src);
        var element = e.target;
        var key = Array.prototype.slice.call(imageElements).indexOf(element);
        
        window.clearTimeout(timeoutFunctions[key]);
        element.removeEventListener('load', loaded);
        loadedImages++;
        
        options.imageLoaded(element);
        
        if (loadedImages + errorImages === imageElements.length) {
            if (loadedImages === imageElements.length) {
                allLoaded();
            }
            else {
                notAllLoaded();
            }
        }
    },

    error = function(e) {
        console.log('error');
        var element = e.target;
        var key = Array.prototype.slice.call(imageElements).indexOf(element);

        window.clearTimeout(timeoutFunctions[key]);
        element.removeEventListener('error', error);
        errorImages++;
        
        options.imageError(element);

        if (loadedImages + errorImages === imageElements.length) {
            if (errorImages === imageElements.length) {
                allFails();
            }
            else {
                notAllLoaded();
            }
        }
    },

    timeout = function(element) {
        console.log('timeout: ' + element);

        options.imageTimeout(element);
    },


    /*
        Collection Events
    */
    allFails = function() {
        console.log('all fails');
    },

    allLoaded = function() {
        console.log('all loaded');
    },

    notAllLoaded = function() {
        console.log('not all loaded, just ' + loadedImages);
    },


    /*
        Helper Functions
    */
    extend = function(destination, defaults, options) {   
        for (var property in defaults) {
            if (options[property]) {
                destination[property] = options[property];
            }
            else {
                destination[property] = defaults[property];
            }
        }
        return destination;
    };


    init();
}