'use strict'; // var imgLoader = new imagesloaded({
//     imageSelector   : 'img',
//     imageLoaded     : function(element) {
//         element.parentNode.classList.add('loaded');
//     },
//     imageError      : function(element) {
//         element.parentNode.classList.add('error');
//     }
// });
//
// imgLoader.init();

Imageloader({
  imageLoaded: function imageLoaded(element) {
    element.parentNode.classList.add('loaded');
  },
  imageLoadedAfterTimeout: function imageLoadedAfterTimeout(element) {
    element.parentNode.classList.add('loaded');
    element.style.opacity = 0.5;
  },
  imageError: function imageError(element) {
    element.parentNode.classList.add('error');
  },
  imageErrorAfterTimeout: function imageErrorAfterTimeout(element) {
    element.parentNode.classList.add('error');
  },
  timeoutTime: 2000
});
//# sourceMappingURL=main.js.map