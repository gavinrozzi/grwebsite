---
date: "2020-11-29"
external_link: ""
header:
  caption: ""
  image: ""
math: false
summary: The encyclopedia of New Jersey politics
tags:
- politics
- transparency
- civic tech
title: TrentonTracker
---
[TrentonTracker](https://trentontracker.com) is a powerful new civic platform that makes it easy for anyone to engage with New Jersey politics, with a focus on the state legislature and governor.

The New Jersey state Senate & General Assembly consider thousands of pieces of legislation each year, but the official legislature website has fallen behind the times and doesn't work well on mobile devices.

Against this background, TrentonTracker aims to create. The site is built as a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) which allows for fast performance and native app-like features. The entire site was built with [GatsbyJS](https://www.gatsbyjs.com/) as a fully static website. The data layer of the app is served via the R Plumber library which exposes a custom JSON REST API of New Jersey legislative data, which integrates official data with other sources while also making use of my open-source R library [zipcodeR](/project/zipcoder) to enable users to look up their legislators by ZIP code.



### More details

[View the dashboard](https://rozzi.shinyapps.io/1033watch/)

[View the source code on Github](https://github.com/gavinrozzi/1033-watch)
