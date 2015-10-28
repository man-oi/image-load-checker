            'use strict';
            
            var imagesloaded = {
                loadedImages    :   0,
                errorImages     :   0,
                
                init    :   function() {
                    this.images = document.querySelectorAll('img'),
                    
                    this.bindEvents();
                },              
                loaded  :   function() {
                    this.loadedImages++;
                    
                    if (this.loadedImages + this.errorImages === this.images.length) {
                        if (this.loadedImages === this.images.length) {
                            console.log('all loaded');
                        }
                        else {
                            this.notAllLoaded();
                        }
                    }
                },
                error   :   function() {
                    this.errorImages++;
                    
                    if (this.loadedImages + this.errorImages === this.images.length) {
                        if (this.errorImages === this.images.length) {
                            console.log('all fails');
                        }
                        else {
                            this.notAllLoaded();
                        }
                    }
                },
                notAllLoaded    :   function() {
                    console.log('not all loaded, just ' + this.loadedImages);
                },
                bindEvents  : function() {              
                    for (var i = 0; i < this.images.length; i++) {
                        if (this.images[i].complete) {
                            this.loaded.bind(this);
                        }
                        else {
                            this.images[i].addEventListener('load', this.loaded.bind(this));
                            this.images[i].addEventListener('error', this.error.bind(this));
                        }
                    }
                }
            }
            
            imagesloaded.init();