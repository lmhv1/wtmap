![logo](https://raw.github.com/slikts/wtmap/master/src/images/icon-128.png)

WT map
======

WT map is a Chrome extension that modifies the browser-based map in
[War Thunder](http://warthunder.com/). It can be used with multi-monitor
setups or on a different device from the one running the game. The purpose
of the extension is to help improve situational awareness by adding a level
of nicety to the map presentation.

Using WT map is currently
[within the Terms of Service](http://www.reddit.com/r/Warthunder/comments/1l5489/war_thunder_tactical_map_useful_app_for_android/cc4zudq)
of the game.

Features
--------

![Map screenshot](https://raw.github.com/slikts/wtmap/master/screenshot.png)

![Options screenshot](https://raw.github.com/slikts/wtmap/master/options.png)

 * Different plane icons for fighters, bombers and attackers
 * Plane icons show plane orientation
 * Close to real-time update rate
 * Automatic map centering and zooming on player
 * Configurable plane icon size
 * Option to reduce CPU load
 * Summary of total map objects by kind for both teams
 * Automatic optimal map sizing
 * Options to enable or disable state and indicator panel updating
 * Disables less useful panels like chat, HUD messages
 * Ground units never obscure plane icons
 * Info about spotted enemies, distance to closest enemy and number of allies
   in title bar
 * Off-screen aircraft are displayed at the map edge when zoomed in:
   ![Panning](https://raw.github.com/slikts/wtmap/master/pan.gif)

Installation
------------

The extension can be installed from its [Chrome Web Store page](https://chrome.google.com/webstore/detail/gmhaddmfnmddbjgobfjfghpjlbgmeiop).

For the co-op version, you will need to install this extension locally.

**In Google Chrome:**
 1. Go to [chrome://extensions](chrome://extensions) and enable Developer mode using the toggle button on the top right.
 2. Download the source code [here](https://github.com/lmhv1/wtmap/releases) and extract somewhere you would want to keep it.
 3. Back in the chrome extensions page, click "Load unpacked" and select the "src" folder from the source files.
 4. To access the extension, copy the extension ID and go to **chrome-extension://{id}/options.html** replacing {id} with your own.

![Extension ID](https://raw.github.com/lmhv1/wtmap/master/extid.png)

Usage
-----

The enhanced map can be opened from the extension options page. It's recommended
to bookmark the map page for easy access. War Thunder needs to be running
for the map to work.

To use the map on a different device from the one running the game,
the correct map location should be set in the options. For instance,
if the local IP address of the PC running the game was 192.168.1.1,
the map location would be http://192.168.1.1:8111/. The game process (aces.exe)
may need to be allowed through the firewall. If one of the devices is wireless
and the other wired, the local network needs to be configured to allow
them to connect.

Co-op
-----

Co-op was built with air simulation battles in mind. This functionality allows you to
get friends' map objects info such as their location and objects around them by
using their IP (either LAN or through a private network service such as [Radmin VPN](https://www.radmin-vpn.com/)).

**Considerations**: While using this feature, some map objects may be duplicated.
Setting the co-op poll rate to the same rate as the player's poll rate helps with
making this issue less noticeable, however the summary of total objects will still
show the duplicated values.

![Co-op](https://raw.github.com/lmhv1/wtmap/master/coop.png)

Notes
-----

By default the extension only has permission to access http://localhost:8111/
and the permissions to access other map locations are requested separately
if needed and removed if not used.

The extension works by monkey-patching the code used in the original map.
It doesn't modify the map in-place but recreates it in a special page
because the Chrome content scripts can only access page DOM and not their
JavaScript environment.

The features added by this extension mostly don't depend on Chrome-specific
functionality and should be easily portable to other platforms.

The idea of making this extension comes from the
[War Thunder tactical map](https://play.google.com/store/apps/details?id=net.junkcode.warthundertacticalmap)
Android app.

The icons for the planes are P-39 for fighters, IL-2 for attackers
and Ju 88 for bombers.

Changelog
---------

**0.2.6** [2013-12-18]

 * Fix title info not updating properly if player is not spawned
 * Fix map scale resetting after map info updated
 * Display map size and scale and grid size in map panel caption
 * Decrease CPU usage
 * Make it possible to disable or enable panels in-line
 * Add separate map object totals for allied an enemy objects
 * Make panel layout automatic, map always tries to take the maximum space
 * Usability tweaks

**0.2.5** [2013-12-18]

 * Add support for the new "state" panel in 1.37
 * Fix an issue with persistent zoom levels

**0.2.4** [2013-12-18]

 * Display off-screen aircraft when zoomed in

**0.2.3** [2013-12-17]

 * Fixed zoom bug

**0.2.2** [2013-12-17]

 * Added advanced options to disable cockpit gauge, chat and HUD message panels
 * Significantly increased polling rate of map objects (configurable)
 * Added automatic persistent zoom instead of a configuration option

**0.2.1** [2013-12-16]

 * Removed proximity alerts

**0.1.7** [2013-12-16]

 * Made it possible to set proximity alert volume or radius to 0 to disable it
 * Fixed the centered map panning out of bounds

**0.1.6** [2013-12-15]

 * Added relative alert levels
 * Various fixes

**0.1.5** [2013-12-15]

 * Added configurable map centering and zooming on player

**0.1.4** [2013-12-14]

 * Initial release

Licence
-------

The project is available under the MIT licence.
