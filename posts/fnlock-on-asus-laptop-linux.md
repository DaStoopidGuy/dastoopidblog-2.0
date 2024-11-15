---
title: 'Default Fnlock state on ASUS laptop'
date: '2024-11-15'
description: 'Setting FNLock to off by default in Arch on my ASUS Vivobook S435E,
 so i can just use media keys by default heh :3'
---

Ever since I started running linux on my ASUS laptop (i use arch btw, 
it's Endeavour OS lol), I have had this small inconvenience of pressing `FN + Esc` everytime I booted up.  
So, today I decided to fix that \>:3  

![salt bae gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2Z4aXNoMHhrZWRxdXpwbGo2eGU3bjE2ZjNuMzJ1NjR1NmhkZHZqdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l4Jz3a8jO92crUlWM/giphy.gif)

> My laptop: ASUS VivoBook S14 (S435E)

Trying to set default fn-lock value
- `/sys/module/asus_wmi/parameters/fnlock_default` contains a Y or N value but it can not be modified
- trying to configure the `asus_wmi` module
	- creating a new file in `/etc/modprobe.d` with name `asus_wmi.conf` and adding the following line: 
		- `options asus_wmi fnlock_default=N`
	- OMAIGAT it works (just rebooted after creating the file)  

![shrek rizzler](https://media1.tenor.com/m/mtiOW6O-k8YAAAAd/shrek-shrek-rizz.gif)
# You're welcome.  
