---
title: Touchpad Natural Scrolling Arch Linux
date: '2023-03-31'
description: 'How to enable touchpad settings like natural scrolling and tap to click on Arch Linux'
---

## Steps

1. install `xf86-input-libinput`
```bash
sudo pacman -S xf86-input-libinput
```

1. go to `/etc/X11/xorg.conf.d`
```bash
cd /etc/X11/xorg.conf.d 
```

1. create a file named `30.touchpad.conf` using the **nano** text editor
```bash
sudo nano 30-touchpad.conf
```

1. put this in the created file:

```json
Section "InputClass"
    Identifier "devname"
    Driver "libinput"
    Option "Tapping" "on"
    Option "Natural Scrolling" "true"
EndSection
```

1. reboot and everything should work fine!

## Update: 19/04/2023
-  changed `Identifier "devname"` to `Identifier "touchpad"`
- also added this after `Driver`:

```json
MatchIsTouchpad "on"
```

