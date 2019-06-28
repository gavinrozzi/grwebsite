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

911maps is an open-source web application for mapping and visualizing 911 call data obtained from New Jersey municipalities. It currently supports data exports from the Active911 system, but can be extended to support other types of CAD systems.

The project evolved from my earlier work in 2018 creating the [Toms River 911 Call Explorer](https://tr911test.rozzi.media), a small web development project that I
created to visualize [data that I obtained using an OPRA request](https://opramachine.com/request/active911_call_data_may_1st_to_j_2).

The original version of the website was rendered using the Hugo static site generator, with the request thread on OPRAmachine hosting the actual CSV file with 911 call data.

Columns from the CSV file are rendered on the homepage of the site after being pulled from OPRAmachine. This setup sees OPRAmachine function as a sort of a "poor man's API backend."

The new version, since the 911maps name was adopted, is powered by the Django web framework.

### More details

[View the website](https://911ma.ps)

[View the source code on Github](https://github.com/gavinrozzi/toms-river-911-calls)