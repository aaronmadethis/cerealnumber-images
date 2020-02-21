'use strict';
var use_classlist = false;

if (Modernizr.classlist) {
    use_classlist = true;
}

const amtUtility = {

    hasClass: function (el, className) {
        let test;
        if (use_classlist) {
            test = el.classList.contains(className);
        } else {
            test = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        }

        return test;
    },
    
    addClass: function (el, theClass) {
        var arr
        if (use_classlist) {
            el.classList.add(theClass);
        } else {
            arr = el.className.split(" ");
            if (arr.indexOf(theClass) == -1) {
                el.className += " " + theClass;
            }
        }
    },

    removeClass: function (el, theClass) {
        var arr
        if (use_classlist) {
            el.classList.remove(theClass);
        } else {
            e.className = e.className.replace(new RegExp('(?:^|s)' + theClass + '(?!S)'), '');
        }
    },

    toggleClass: function (el, theClass) {
        if (use_classlist) {
            el.classList.toggle(theClass);
        } else {
            var classes = el.className.split(' ');
            var existingIndex = classes.indexOf(theClass);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(theClass);

            el.className = classes.join(' ');
        }
    }

}

module.exports = amtUtility;


