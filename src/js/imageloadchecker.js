const ImageLoadChecker = (function() {
    'use strict'

    function Imageloader(options) {
        var _ =  {};
        _.defaults = {
            imageSelector: 'img',
            timeoutTime: 1000 * 60,
            imageLoaded: function(element) {
                element.classList.add('loaded');
            },
            imageLoadedAfterTimeout: function(element) {
                element.classList.add('loaded');
            },
            imageError: function(element) {
                element.classList.add('error');
            },
            imageErrorAfterTimeout: function(element) {
                element.classList.add('error');
            },
            imageTimeout: function(element) {}
        };
        _.options = {};
        _.imageElements = null;
        _.timeoutFunctions = [];
        _.timeouts = [];
        _.loadedImages = 0;
        _.errorImages = 0;
        _.timeoutImages = 0;


        _.init = function() {
            console.log('init');
            if (options === undefined) {
                options = {};
            }
            _.extend(_.options, _.defaults, options);

            _.imageElements = document.querySelectorAll(_.options.imageSelector);

            _.bindEvents();
        }

        _.bindEvents = function() {
            var event = document.createEvent("HTMLEvents");

            for (var i = 0; i < _.imageElements.length; i++) {
                _.imageElements[i].addEventListener('load', _.loaded);
                _.imageElements[i].addEventListener('error', _.error);

                _.timeoutFunctions[i] = window.setTimeout(function(i) {
                    _.timeout(_.imageElements[i])
                }, _.options.timeoutTime, i);
                _.timeouts[i] = false;


                if (_.imageElements[i].complete) {
                    if (_.imageElements[i].naturalWidth  === 0) {
                        event.initEvent("error", true, true);
                    }
                    else {
                        event.initEvent("load", true, true);
                    }

                    _.imageElements[i].dispatchEvent(event);
                }
            }
        }



        /*
            Image Events
        */
        _.loaded = function(e) {
            console.log('loaded: ' + e.target.src);
            var element = e.target;
            var key = Array.prototype.slice.call(_.imageElements).indexOf(element);

            window.clearTimeout(_.timeoutFunctions[key]);
            element.removeEventListener('load', _.loaded);

            if (!_.timeouts[key]) {
                _.loadedImages++;
                _.options.imageLoaded(element);

                if (_.loadedImages + _.errorImages + _.timeoutImages === _.imageElements.length) {
                    if (_.loadedImages === _.imageElements.length) {
                        _.allLoaded();
                    }
                    else {
                        _.notAllLoaded();
                    }
                }
            }
            else {
                _.options.imageLoadedAfterTimeout(element);
            }
        },

        _.error = function(e) {
            var element = e.target;
            var key = Array.prototype.slice.call(_.imageElements).indexOf(element);

            window.clearTimeout(_.timeoutFunctions[key]);
            element.removeEventListener('error', _.error);

            if (!_.timeouts[key]) {
                _.errorImages++;
                _.options.imageError(element);

                if (_.loadedImages + _.errorImages + _.timeoutImages === _.imageElements.length) {
                    if (_.errorImages === _.imageElements.length) {
                        _.allFails();
                    }
                    else {
                        _.notAllLoaded();
                    }
                }
            }
            else {
                _.options.imageErrorAfterTimeout(element);
            }
        }

        _.timeout = function(element) {
            var key = Array.prototype.slice.call(_.imageElements).indexOf(element);

            _.timeouts[key] = true;
            _.timeoutImages++;

            _.options.imageTimeout(element);

            if (_.loadedImages + _.errorImages + _.timeoutImages === _.imageElements.length) {
                if (_.errorImages === _.imageElements.length) {
                    _.allFails();
                }
                else {
                    _.notAllLoaded();
                }
            }
        }



        /*
            Collection Events
        */
        _.allFails = function() {
            console.log('all fails');
        },

        _.allLoaded = function() {
            console.log('all loaded');
        },

        _.notAllLoaded = function() {
            console.log('not all loaded, just ' + _.loadedImages + ' of ' + _.imageElements.length);
        },



        /*
            Helper Functions
        */
        _.extend = function(destination, defaults, options) {
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

        _.init();
    }

    return Imageloader;
})();
