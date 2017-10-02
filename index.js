var events = require('events');
var addon = require('./build/Release/addon.node');
var Mouse = addon.Mouse;

module.exports = function() {
	var that = new events.EventEmitter();
	var mouse = null;

	that.once('newListener', function() {
		mouse = new Mouse(function(type, x, y) {
			that.emit(type, x, y);
		});
	});

	that.ref = function() {
		if(mouse) mouse.ref();
	};

	that.unref = function() {
		if(mouse) mouse.unref();
	};

	that.destroy = function() {
		if(mouse) mouse.destroy();
		mouse = null;
	};

	return that;
};
