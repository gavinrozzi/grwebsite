+++
# Date this page was created.
date = "2018-01-22"

# Project title.
title = "Ocean County Radio Live"

# Project summary to display on homepage.
summary = "Online software defined trunked radio scanner for Ocean County, NJ"

# Optional image to display on homepage (relative to `static/img/` folder).
image_preview = "ocradio.jpg"

# Tags: can be used for filtering projects.
# Example: `tags = ["machine-learning", "deep-learning"]`
tags = ["radio"]

# Optional external URL for project (replaces project detail page).
external_link = ""

# Does the project detail page use math formatting?
math = false

# Optional featured image (relative to `static/img/` folder).
[header]
image = "OCradio_preview.jpeg"
caption = "Ocean County Radio Live"

+++
## The new way to scan Ocean County

[Ocean County Radio Live](https://ocradio.live/) is taking the technical complexity and hassle out of scanning in Ocean County, New Jersey. I recently launched this website at the beginning of 2018.

This website uses software defined radio (SDR) technology to process the streams of digital data produced by the Ocean County trunked radio system. The SDRs record radio transmissions and upload them to the site's server, which allows them to easily be played and archived online.

The system has a major advantage over all traditional forms of radio scanning as it uses "time shifting" like a DVR does when recording multiple overlapping TV shows, ensuring that no transmissions are missed, since traditional scanners can only hold on one channel - potentially missing other calls.

This system is powered by multiple R820T SDRs running on a desktop computer and connected to the front-end web server accessed by end users.

As our base of users continues to grow, I intend on covering more radio systems and adding them to this system.

### Coming soon to OC Radio Live
- Little Egg Harbor Police P25
- Ocean County Probation
- OC-ALERT Fire & EMS paging channel

### Atlantic County version coming soon
We are also hoping to setup a similar system for the new Atlantic County P25 Phase II system that recently became fully operational. Check back here for more details on that at a later date.

The Ocean County Radio Live web application is based on the open-source [Trunk-Player](https://github.com/ScanOC/trunk-player) Django project. So far, I have contributed one [pull request](https://github.com/ScanOC/trunk-player/commit/8dbc011c96bf19951bc9fa1fbf6c37d5e215dc4a) to the upstream open source software that powers the project, and I plan to contribute more in the future as my schedule allows.
