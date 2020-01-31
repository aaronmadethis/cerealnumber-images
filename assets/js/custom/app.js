'use strict';

const jQuery = require('jquery');
var use_classlist = false;

if (Modernizr.touchevents) { 
    console.log('The test touchevents passed!', Modernizr.touchevents);
}else{
    console.log('The test touchevents faild!', Modernizr.touchevents);
}
if (Modernizr.classlist) {
    use_classlist = true;
}

( function( $ ) {
	$( document ).ready( function() {
        console.log('doc ready');
	});
}( jQuery ) );