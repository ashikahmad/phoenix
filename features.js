
//------------------------------------------------------
// Key Bindings (Can be disabled)
//------------------------------------------------------

// Column splits
if(pMan.config.colSplits) {
	pMan.registerShortcut(pMan.shortcuts.leftHalf, function() {
		setWindowFrame({x: 0, y: 0, width: 0.5, height: 1});
	});

	pMan.registerShortcut(pMan.shortcuts.rightHalf, function(){
		setWindowFrame({x: 0.5, y: 0, width: 0.5, height: 1});
	});
}

// Row Splits
if(pMan.config.rowSplits) {
	pMan.registerShortcut(pMan.shortcuts.topHalf, function(){
		setWindowFrame({x: 0, y: 0, width: 1, height: 0.5});
	});
	pMan.registerShortcut(pMan.shortcuts.bottomHalf, function(){
		setWindowFrame({x: 0, y: 0.5, width: 1, height: 0.5});
	});  
}

// Fullscreen
if(pMan.config.fullscreenToggle) {
	pMan.registerShortcut(pMan.shortcuts.toggleFull, function(){
		var window = Window.focused();
		if (window) {
			if (window.isMaximised()) { setWindowFrame(pMan.smallFrame); }
			else { setWindowFrame(pMan.fullFrame); }
		}
	});  
}

// Quarter splits
if(pMan.config.quarterSplits) {
	pMan.registerShortcut(pMan.shortcuts.topLeft, function(){
		setWindowFrame({x: 0, y: 0, width: 0.5, height: 0.5});
	});

	pMan.registerShortcut(pMan.shortcuts.topRight, function(){
		setWindowFrame({x: 0.5, y: 0, width: 0.5, height: 0.5});
	});

	pMan.registerShortcut(pMan.shortcuts.bottomLeft, function(){
		setWindowFrame({x: 0, y: 0.5, width: 0.5, height: 0.5});
	});

	pMan.registerShortcut(pMan.shortcuts.bottomRight, function(){
		setWindowFrame({x: 0.5, y: 0.5, width: 0.5, height: 0.5});
	});
}

// Third splits
if(pMan.config.thirdSplits) {
	var f = 1.0/3.0; // third fraction

	pMan.registerShortcut(pMan.shortcuts.leftThird, function(){
		setWindowFrame({x: 0, y: 0, width: f, height: 1});
	});

	pMan.registerShortcut(pMan.shortcuts.centerThird, function(){
		setWindowFrame({x: f, y: 0, width: f, height: 1});
	});

	pMan.registerShortcut(pMan.shortcuts.rightThird, function(){
		setWindowFrame({x: 2*f, y: 0, width: f, height: 1});
	});
}

// Space shifts
if(pMan.config.spaceShifts) {
	pMan.registerShortcut(pMan.shortcuts.prevSpace, function(){
		Window.focused() &&
		Window.focused().moveToSpace('east');
	});

	pMan.registerShortcut(pMan.shortcuts.nextSpace, function(){
		Window.focused() &&
		Window.focused().moveToSpace('west');
	});
}

// Auto-splits
if(pMan.config.autoSplits) {
	pMan.registerShortcut(pMan.shortcuts.autoHalves, function(){
		var w = Window.recent();
		var w1 = w[0], w2 = w[1];
		var screen = Screen.main().usableFrame(); //flippedVisibleFrame();
		if(w1) w1.setRelativeFrame({x: 0, y: 0, width: 0.5, height: 1}, screen);
		if(w2) w2.setRelativeFrame({x: 0.5, y: 0, width: 0.5, height: 1}, screen);
	});

	pMan.registerShortcut(pMan.shortcuts.autoThirds, function(){
		var w = Window.recent();
		var w1 = w[0], w2 = w[1], w3 = w[2];
		var screen = Screen.main().usableFrame(); //flippedVisibleFrame();
		var f = 1.0/3.0; // third fraction
		if(w1) w1.setRelativeFrame({x: 0, y: 0, width: f, height: 1}, screen);
		if(w2) w2.setRelativeFrame({x: f, y: 0, width: f, height: 1}, screen);
		if(w3) w3.setRelativeFrame({x: 2*f, y: 0, width: f, height: 1}, screen);
	});

	pMan.registerShortcut(pMan.shortcuts.autoQuarters, function(){
		var w = Window.recent();
		var w1 = w[0], w2 = w[1], w3 = w[2], w4 = w[3];
		var screen = Screen.main().usableFrame(); //flippedVisibleFrame();
		if(w1) w1.setRelativeFrame({x: 0, y: 0, width: 0.5, height: 0.5}, screen);
		if(w2) w2.setRelativeFrame({x: 0.5, y: 0, width: 0.5, height: 0.5}, screen);
		if(w3) w3.setRelativeFrame({x: 0, y: 0.5, width: 0.5, height: 0.5}, screen);
		if(w4) w4.setRelativeFrame({x: 0.5, y: 0.5, width: 0.5, height: 0.5}, screen);
	});
}

//------------------------------------------------------
// Enable/Disable All other bindings
//------------------------------------------------------

var s = pMan.shortcuts.mainToggle;
Key.on(s.key, s.mod, function(){
	pMan.toggleRegisteredKeys();
});
