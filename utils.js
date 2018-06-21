
//------------------------------------------------------
// Helper Methods
//------------------------------------------------------

// ------[ pMan's Utility Methods ]------

// Binds shortcut s to task. This shortcut is toggle-able by main toggle.
pMan.registerShortcut = function(s, task) {
	this.keys.push(new Key(s.key, s.mod, task));
}

pMan.toggleRegisteredKeys = function() {
	pMan.enabled = !pMan.enabled;
	for(var i = 0, len = pMan.keys.length; i < len; i++) {
		if(pMan.enabled) { pMan.keys[i].enable(); }
		else { pMan.keys[i].disable(); }
	}

	var text = "Phoenix keys disabled!";
	if(pMan.enabled) {
		text = "Phoenix keys enabled!";
	}
	showModal(text);
}

// ------[ Window Extension ]------

Window.prototype.isMaximised = function() {
	var sf = Screen.main().usableFrame();
	var f = this.frame();
	var buffer = 20;
	return isAlmostEqual(f, sf, buffer);
}

Window.prototype.setRelativeFrame = function(relative, original) {
	original = original || this.screen().usableFrame();
	this.setFrame({
		x: original.x + relative.x * original.width,
		y: original.y + relative.y * original.height,
		width: relative.width * original.width,
		height: relative.height * original.height
	});
}

function setWindowFrame(frame) {
	Window.focused() &&
	Window.focused().setRelativeFrame(frame);
}

Window.prototype.moveToSpace = function(direction){
	if(this.isFullScreen()) {
		showModal("Cannot switch for fullscreen windows", this.app());
		return;
	}	

	var curSpace = Space.active();

	if (direction == 'west') { curSpace = curSpace.next(); }
	else { curSpace = curSpace.previous(); }

	curSpace.moveWindow(this).focus();
};

// ------[ Screen Extension ]------

Screen.prototype.usableFrame = function(){
	var visible = this.flippedVisibleFrame();
	var insets = pMan.screenInsets;
	return {
		x: visible.x + insets.left,
		y: visible.y + insets.top,
		width: visible.width - (insets.left + insets.right),
		height: visible.height - (insets.top + insets.bottom)
	}
};

// ------[ Space Extension ]------

Space.prototype.moveWindow = function(window) {
	if(this.windows().includes(window)) {
		showModal("Already there");
		return;
	}

	// Track oldScreen to detect screen switch
	var oldScreen = window.screen();

	_.forEach(window.spaces(), function(s){
		if(s !== this) s.removeWindows([window]);
	});
	this.addWindows([window]);

	var newScreen = _.first(this.screens());
	// Fix coordinate for screen switching
	if (oldScreen != newScreen) {
		var screenDiff = newScreen.flippedVisibleFrame().x - oldScreen.flippedVisibleFrame().x;
		var frame = window.frame();
		frame.x += screenDiff;
		window.setFrame(frame);
	}

	return window;
}

// ------[ Raw Functions ]------

function isAlmostEqual(rect, other, buffer) {
	return Math.abs(rect.x - other.x) < buffer
		&& Math.abs(rect.y - other.y) < buffer
		&& Math.abs(rect.width - other.width) < buffer
		&& Math.abs(rect.height - other.height) < buffer
}

function showModal(text, app) {
	var screen = Screen.main().flippedVisibleFrame();
	var modal = new Modal();
	modal.duration = 2;
	modal.text = text;

	modal.icon = (app || App.get('Phoenix')).icon();

	var mrect = modal.frame();
	modal.origin = {
		x: screen.x + screen.width/2 - mrect.width/2,
		y: screen.y + screen.height/2 - mrect.height/2
	};
	modal.show();
}
