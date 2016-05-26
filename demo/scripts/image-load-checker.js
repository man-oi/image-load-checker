'use strict'

var imagesloaded = function(args) {
    this.imageElements = null;
    this.loadedImages = 0;
    this.errorImages = 0;
    this.timeoutFunctions = [];

    this.defaults = {
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
    this.options = {},

    this.init    =   function() {
        if (args === undefined) {
            args = {};
        }
        this.options = this.extend(this.options, this.defaults, args);

        this.imageElements = document.querySelectorAll(this.options.imageSelector);

        this.bindEvents();
    },

    this.bindEvents = function() {
        var event = document.createEvent("HTMLEvents");

        for (var i = 0; i < this.imageElements.length; i++) {
            this.imageElements[i].addEventListener('load', this.loaded.bind(this));
            this.imageElements[i].addEventListener('error', this.error.bind(this));

            this.timeoutFunctions[i] = window.setTimeout(function(i) {
                this.timeout(this.imageElements[i])
            }, this.options.timeoutTime, i);

            if (this.imageElements[i].complete) {
                if (this.imageElements[i].naturalWidth  === 0) {
                    event.initEvent("error", true, true);
                }
                else {
                    event.initEvent("load", true, true);
                }

                this.imageElements[i].dispatchEvent(event);
            }
        }
    },


    /*
        Image Events
    */
    this.loaded = function(e) {
        //console.log('loaded: ' + e.target.src);
        var element = e.target;
        var key = Array.prototype.slice.call(this.imageElements).indexOf(element);

        window.clearTimeout(this.timeoutFunctions[key]);
        element.removeEventListener('load', this.loaded);
        this.loadedImages++;

        this.options.imageLoaded(element);

        if (this.loadedImages + this.errorImages === this.imageElements.length) {
            if (this.loadedImages === this.imageElements.length) {
                this.allLoaded();
            }
            else {
                this.notAllLoaded();
            }
        }
    },

    this.error = function(e) {
        var element = e.target;
        var key = Array.prototype.slice.call(this.imageElements).indexOf(element);

        window.clearTimeout(this.timeoutFunctions[key]);
        element.removeEventListener('error', this.error);
        this.errorImages++;

        this.options.imageError(element);

        if (this.loadedImages + this.errorImages === this.imageElements.length) {
            if (this.errorImages === this.imageElements.length) {
                this.allFails();
            }
            else {
                this.notAllLoaded();
            }
        }
    },

    this.timeout = function(element) {
        console.log('timeout: ' + element);

        this.options.imageTimeout(element);
    },


    /*
        Collection Events
    */
    this.allFails = function() {
        console.log('all fails');
    },

    this.allLoaded = function() {
        console.log('all loaded');
    },

    this.notAllLoaded = function() {
        console.log('not all loaded, just ' + this.loadedImages);
    },


    /*
        Helper Functions
    */
    this.extend = function(destination, defaults, options) {
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
}
