---
date: '2018-01-22'
external_link: ''
header:
  caption: Ocean County Radio Live
  image: ''
image_preview: ocradio.jpg
links:
math: false
summary: Online SDR trunked radio scanner & archive for Ocean County, NJ
tags:
- radio
- SDR
title: Ocean County Radio Live
---
## The new way to scan Ocean County

[Ocean County Radio Live](https://ocradio.live/) is taking the technical complexity and hassle out of radio scanning in Ocean County, New Jersey. This website was launched in late January, 2018 and since that date has continued to stream & archive multiple police, fire & EMS radio channels.

This website is powered by the latest software defined radio (SDR) technology to process the streams of digital data produced by the Ocean County trunked radio system and also record analog conventional systems used by some departments & squads. The SDRs record radio transmissions and upload them to the site's server, which allows them to easily be played and archived online. When Ocean County activates the new 700 MHz P25 Phase II radio system, our receivers will only need a simple software configuration change in order to pick up the new system's signal. This flexibility makes SDR radios superior for this particular application, allowing us to provide a wide amount of channels on our system.

The system has a major advantage over all traditional forms of radio scanning as it uses "time shifting" like a DVR does when recording multiple overlapping TV shows, ensuring that **no transmissions are missed**, since traditional scanners can only hold on just one channel - potentially missing other calls that could be taking place on different talkgroups.

This system is powered by multiple R820T SDRs running on a desktop computer and connected to the front-end web server accessed by end users.

As our base of users continues to grow, I intend on covering more radio systems and adding them to this system.

The [Ocean County Radio Live](https://ocradio.live/) web application is based on the open-source [Trunk-Player](https://github.com/ScanOC/trunk-player) Django project. So far, I have contributed one [pull request](https://github.com/ScanOC/trunk-player/commit/8dbc011c96bf19951bc9fa1fbf6c37d5e215dc4a) to the upstream open source software that powers the project, and I plan to contribute more in the future as my schedule allows.


### Current scan list lineup

{{% oclive %}}

### Sample talkgroups & channel lineup (click to scan)

{{% oclive_talkgroups %}}
