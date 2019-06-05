+++
# Date this page was created.
date = "2018-11-22"

# Project title.
title = "911maps"

# Project summary to display on homepage.
summary = "Map and analyze 911 call data"

# Optional image to display on homepage (relative to `static/img/` folder).
image_preview = "tr911.jpeg"

# Tags: can be used for filtering projects.
# Example: `tags = ["machine-learning", "deep-learning"]`
tags = ["data"]

# Optional external URL for project (replaces project detail page).
external_link = ""

# Does the project detail page use math formatting?
math = false

# Optional featured image (relative to `static/img/` folder).
[header]
image = ""
caption = ""

+++

911maps evolved from my earlier work in 2018 creating the [Toms River 911 Call Explorer](https://tr911test.rozzi.media), a small web development project that I
created to visualize [data that I obtained using an OPRA request](https://opramachine.com/request/active911_call_data_may_1st_to_j_2).

Content on the website is rendered using the Hugo static site generator, with the request thread on OPRAmachine hosting the actual CSV file with 911 call data.

Columns from the CSV file are rendered on the homepage of the site after being pulled from OPRAmachine. This setup sees OPRAmachine function as a sort of a "poor man's API backend."

As additional requests are made for Active911 call data, they can easily be added to the site with simple changes to HTML on the live site.

### More details

[View the website](https://tomsriver911.ocscanner.news)

[View the source code on Github](https://github.com/gavinrozzi/toms-river-911-calls)