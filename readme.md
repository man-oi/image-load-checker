Image Load Event Helper
-------

a little helper function for the HTML Load Event.
It is intended for use on images, but could also be used for other elements.

### Example

```javascript
Imageloader({
    imageLoaded: function(element) {
        element.parentNode.classList.add('loaded');
    },
    imageLoadedAfterTimeout: function(element) {
        element.parentNode.classList.add('loaded');
    },
    imageError: function(element) {
        element.parentNode.classList.add('error');
    },
    imageErrorAfterTimeout: function(element) {
        element.parentNode.classList.add('error');
    },
    timeoutTime: 2000
});
```



### Settings

Option | Default | Description
-----| -----  | --------
timeoutTime | 1000 * 60 | time in ms, after which the timeout should be called
imageSelector | 'img' | selector used for document.querySelectorAll()



### Events

Event | Params
---- | -----
imageLoaded | element
imageLoadedAfterTimeout | element
imageError | element
imageErrorAfterTimeout | element
