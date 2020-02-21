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
    scrollParallax: function (el) {
        var win_h = window.innerHeight;
        var wrapper = el;
        var current = 0;
        var target = 0;
        var ease = 0.065;
        var rafId = undefined;
        var rafActive = false;
        var triggers = Array.prototype.slice.call(wrapper.querySelectorAll('.js-scroll-trigger'));
        var maxY = 32;
        var maxScale = 4;
        // var parent = frankutils.addwaypoint(wrapper, wrapper, ['js-active'], '100%');

        triggers.forEach(function (el, i) {
            let animateImg = el.querySelector(".cereal_img");
            frankutils.setTransform(animateImg, 'translateY(' + -maxY + 'px) scale(1.02)')
        })

        var updateScroll = function() {
            target = window.scrollY || window.pageYOffset
            startAnimation()
        }

        var startAnimation = function() {
            if (!rafActive) {
                rafActive = true
                rafId = requestAnimationFrame(updateAnimation)
            }
        }

        var updateAnimation = function(){
            var diff = target - current
            var delta = Math.abs(diff) < 0.1 ? 0 : diff * ease

            if (delta) { // If `delta !== 0`
                // Update `current` scroll position
                current += delta
                // Round value for better performance
                current = parseFloat(current.toFixed(2))
                // Call `update` again, using `requestAnimationFrame`
                rafId = requestAnimationFrame(updateAnimation)
            } else { // If `delta === 0`
                // Update `current`, and finish the animation loop
                current = target
                rafActive = false
                cancelAnimationFrame(rafId)
            }
            updateAnimationImages();
        }

        var updateAnimationImages = function() {
            triggers.forEach(function (el, i) {
                let animateImg = el.querySelector(".cereal_img")
                let imgTop = window.innerHeight - el.getBoundingClientRect().top;
                let myCurrent = frankutils.getComputedTranslateY(animateImg);
                let myTarget = ((imgTop / window.innerHeight) - 1) * maxY;
                let diff = myTarget - myCurrent;
                let delta = Math.abs(diff) < 0.1 ? 0 : diff * ease;
                myCurrent += delta
                // let imgHeight = el.getBoundingClientRect().height;
                // myCurrent = myCurrent < 10 ? parseFloat(myCurrent.toFixed(2)) : 10;
                // let scaleDiff = imgTop / imgHeight;
                // scaleDiff = (scaleDiff * maxScale) / 100;
                // scaleDiff += 1;
                // console.log(scaleDiff);

                // frankutils.setTransform(animateImg, 'translateY(' + myCurrent + 'px) scale(' + scaleDiff + ')')
                frankutils.setTransform(animateImg, 'translateY(' + myCurrent + 'px) scale(1.02)')
            })
        }

        // startAnimation();
        window.addEventListener('scroll', updateScroll)

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
        return window.innerHeight - el.getBoundingClientRect().top;
    },
    setTransform: function(el, transform) {
        el.style.transform = transform
        el.style.WebkitTransform = transform
    },
    easeOutQuad: function(t) {
        return t * _(2 - t)
    },
    getComputedTranslateY: function(obj){
        if (!window.getComputedStyle) return;
        var style = getComputedStyle(obj),
            transform = style.transform || style.webkitTransform || style.mozTransform;
        var mat = transform.match(/^matrix3d\((.+)\)$/);
        if (mat) return parseFloat(mat[1].split(', ')[13]);
        mat = transform.match(/^matrix\((.+)\)$/);
        return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
    }
}

function frankinit() {
    frankjs.init();
    frankjs.scrollParallax(document.querySelectorAll('.js-scrolljack-init')[0]);
}

ready(frankinit);