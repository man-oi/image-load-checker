'use strict';

ImageLoadChecker({
    imageLoaded(element) {
        element.parentNode.classList.add('loaded');
    },
    imageLoadedAfterTimeout(element) {
        element.parentNode.classList.add('loaded');
        element.style.opacity = 0.5;
    },
    imageError(element) {
        element.parentNode.classList.add('error');
    },
    imageErrorAfterTimeout(element) {
        element.parentNode.classList.add('error');
    },
    timeoutTime: 2000
});
