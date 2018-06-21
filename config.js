/*
Created by Ashik uddin Ahmad
Copyright © 2017 Ashik uddin Ahmad. All rights reserved.
*/

//------------------------------------------------------
// Overview
//------------------------------------------------------

/*

Key symbols
-------------------------------------------
⇧  Shift          ⌃  Control
⌥  Option         ⌘  Command

←  Left Arrow     →  Right Arrow
↑  Up Arrow       ↓  Down Arrow

␣  Space


Shortcuts:  [✔] Added  [︎✘] Not Added Yet
-----------------------------------------------------

## Global
[✔] ⌃ ⌥ P  ~~~~~>  ⨂ Enable / Disable all other shortcuts

## Column Splits
[✔] ⌃ ⌥ ←  ~~~~~>  ◧ Left Half
[✔] ⌃ ⌥ →  ~~~~~>  ◨ Right Half

## Row Splits
︎[✔] ⌃ ⌥ ↑  ~~~~~>  ⬒ Top Half
︎[✔] ⌃ ⌥ ↓  ~~~~~>  ⬓ Bottom Half

## Fullscreen Toggle
[✔] ⌃ ⌥ ␣  ~~~~~>  ⧈ Toggle Full screen ↔︎ Centered

## Quarter splits 
︎[✔] ⌃ ⌥ U  ~~~~~>  ◰ Top Left Quarter
︎[✔] ⌃ ⌥ I  ~~~~~>  ◳ Top Right Quarter
︎[✔] ⌃ ⌥ J  ~~~~~>  ◱ Bottom Left Quarter
︎[✔] ⌃ ⌥ K  ~~~~~>  ◲ Bottom Right Quarter

## Third splits
[✔] ⌃ ⌥ ⇧ ←  ~~~>  ⧯⧮⧮ Left Third
[✔] ⌃ ⌥ ⇧ ↓  ~~~>  ⧮⧯⧮ Center Third
[✔] ⌃ ⌥ ⇧ →  ~~~>  ⧮⧮⧯ Right Third

## Space shifts
[✔] ⌃ ⌥ ⌘ ←  ~~>  ⇠◻︎ To Previous Space
[✔] ⌃ ⌥ ⌘ →  ~~>  ◻︎⇢ To Next Space

## Screen shifts
[ ] ⌃ ⌥ [  ~~>  ⇠◻︎ To Previous Screen
[ ] ⌃ ⌥ ]  ~~>  ◻︎⇢ To Next Screen

## Auto-split Recent Windows
┌─┬─┐ ┌─┬─┬─┐ ┌─┬─┐
│ │ │ │ │ │ │ ├─┼─┤
└─┴─┘ └─┴─┴─┘ └─┴─┘

[︎✘] ⌥ 1 ~~~~~~~>  Fullscreen current one
[︎✘] ⌥ 2 ~~~~~~~>  Column split first two equally
[︎✘] ⌥ 3 ~~~~~~~>  Column split first three equally
[︎✘] ⌥ 4 ~~~~~~~>  Split first four as quarters

*/

//------------------------------------------------------
// Configurations
//------------------------------------------------------

Phoenix.set({
	daemon: false, // true => run in background, false => run in menubar
	openAtLogin: true
});

var MOD = {
	alt: ['alt'],
	ctrl_alt: ['ctrl', 'alt'],
	ctrl_alt_shift: ['ctrl', 'alt', 'shift'],
	ctrl_alt_cmd: ['ctrl', 'alt', 'cmd']
}

var pMan = {
	// This config is only applied on loading, not dynamically changed
	config: {
		colSplits: true,        // ◧ ◨
		rowSplits: false,       // ⬒ ⬓
		quarterSplits: false,   // ◰ ◳ ◱ ◲
		thirdSplits: true,      // ⧯⧮⧮  ⧮⧯⧮  ⧮⧮⧯
		fullscreenToggle: true, // ⧈
		spaceShifts: true,      // ⇠◻︎ ◻︎⇢
		autoSplits: true
	},

	// Samll centered window toggled from fulscreen (relative ratio to screen)
	smallFrame: {x: 0.15, y: 0.15, width: 0.7, height: 0.7},
	fullFrame: {x: 0, y: 0, width: 1, height: 1},
	screenInsets: {top: 0.0, left: 0.0, bottom: 35.0, right: 0.0},

	// All shortcut mapping. Will not be bound if disabled in config.
	shortcuts: {
		mainToggle: { mod: MOD.ctrl_alt, key: 'p' },

		leftHalf:  { mod: MOD.ctrl_alt, key: 'left' },
		rightHalf: { mod: MOD.ctrl_alt, key: 'right' },

		topHalf:    { mod: MOD.ctrl_alt, key: 'up' },
		bottomHalf: { mod: MOD.ctrl_alt, key: 'down' },

		topLeft:     { mod: MOD.ctrl_alt, key: 'u' },
		topRight:    { mod: MOD.ctrl_alt, key: 'i' },
		bottomLeft:  { mod: MOD.ctrl_alt, key: 'j' },
		bottomRight: { mod: MOD.ctrl_alt, key: 'k' },

		leftThird:   { mod: MOD.ctrl_alt_shift, key: 'left' },
		centerThird: { mod: MOD.ctrl_alt_shift, key: 'down' },
		rightThird:  { mod: MOD.ctrl_alt_shift, key: 'right' },

		toggleFull: { mod: MOD.ctrl_alt, key: 'space' },

		prevSpace: { mod: MOD.ctrl_alt_cmd, key: 'left' },
		nextSpace: { mod: MOD.ctrl_alt_cmd, key: 'right' },

		autoHalves: { mod: MOD.alt, key: '2' },
		autoThirds: { mod: MOD.alt, key: '3' },
		autoQuarters: { mod: MOD.alt, key: '4' },
	},

	// Variables below SHOULD NOT BE CHANGED!
	keys: [], // To keep reference of all key binds to enable/disable.
	enabled: true // To keep track if registered keys are enabled.
};
