'use strict';

const Waypoint = require('../../../node_modules/waypoints/lib/noframework.waypoints');

var use_classlist = false;

if (Modernizr.touchevents) {
    console.log('The test touchevents passed!', Modernizr.touchevents);
} else {
    console.log('The test touchevents faild!', Modernizr.touchevents);
}
if (Modernizr.classlist) {
    use_classlist = true;
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

const frankjs = {
    init: function () {
        console.log('frankjs started');
    },
    scrolljack: function (el) {
        var wrapper = el;
        var triggers = Array.prototype.slice.call(wrapper.querySelectorAll('.js-scroll-trigger'));

        var parent = frankutils.addwaypoint(wrapper, wrapper, ['js-active'], '80%');

        triggers.forEach(function (el, i) {
            let trigger = new window.Waypoint({
                element: el,
                handler: function (direction) {
                    var current, deactivate, slideClass

                    if (direction == 'down') {
                        // animate in trigger
                        // animate out trigger - 1
                        current = (i + 1);
                        deactivate = deactivateClasses(current, triggers.length);
                        slideClass = 'js-slide__n' + current;
                        deactivate.push('js-up');
                    }
                    if (direction == 'up') {
                        // animate in trigger - 1
                        // animate out trigger
                        current = i;
                        deactivate = deactivateClasses(current, triggers.length);
                        slideClass = 'js-slide__n' + current;
                        deactivate.push('js-down');
                    }

                    frankutils.removeClass(wrapper, deactivate);
                    frankutils.addClass(wrapper, [slideClass, 'js-' + direction]);

                },
                offset: 'bottom-in-view'
            })
        });

        var deactivateClasses = function (current, total) {
            var classNames = [];
            for (let index = 0; index < total; index++) {
                if (current != (index + 1)) {
                    classNames.push('js-slide__n' + (index + 1));
                }
            }
            return classNames;
        }

        frankjs.trackScroll();
    },
    trackScroll: function () {
        window.addEventListener('scroll', function (event) {
            this.console.log(window.scrollY);
        }, false);
    }

}

const frankutils = {
    addwaypoint: function (el, parent = false, className = ['js-active'], offset = '0') {
        let container = !parent ? el : parent;

        return new window.Waypoint({
            element: el,
            handler: function (direction) {
                frankutils.addClass(container, className);
            },
            offset: offset
        })
    },
    addClass: function (el, className = ['js-active']) {
        className = Array.isArray(className) ? className : [className];
        if (el.classList) {
            className.forEach(function (name) {
                el.classList.add(name);
            });
        } else {
            className.forEach(function (name) {
                el.className += ' ' + name;
            });
        }
    },
    removeClass: function (el, className = ['js-active']) {
        className = Array.isArray(className) ? className : [className];
        if (el.classList) {
            className.forEach(function (name) {
                el.classList.remove(name);
            });
        } else {
            className.forEach(function (name) {
                el.className = el.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            });
        }
    },
    elementOffset: function(el){
        return yOffset = window.scrollY - el.offsetTop;
    }
}

function frankinit() {
    frankjs.init();
    frankjs.scrolljack(document.querySelectorAll('.js-scrolljack-init')[0]);
}

ready(frankinit);