'use strict';

var imgLoader = imagesloaded({
    imageSelector   : 'img',
    imageLoaded     : function(element) {
        element.parentNode.classList.add('loaded');
    },
    imageError      : function(element) {
        element.parentNode.classList.add('error');
    }    
});