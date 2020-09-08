---
title: zipcodeR
summary: An R package that makes dealing with ZIP codes painless.
tags:
- Open Source Software
date: "2020-09-08T00:00:00Z"

# Optional external URL for project (replaces project detail page).
external_link: ""

image:
  caption: 
  focal_point: Smart

url_code: "https://github.com/gavinrozzi/zipcodeR"
url_pdf: ""
url_slides: ""
url_video: ""

# Slides (optional).
#   Associate this project with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides = "example-slides"` references `content/slides/example-slides.md`.
#   Otherwise, set `slides = ""`.
slides: 
---

[zipcodeR](https://gavinrozzi.github.io/zipcodeR/) is an R package that makes dealing with ZIP codes painless.

The package provides an integrated set of data and functions that help you save time when working with ZIP code data in R by making it easy to lookup ZIP codes across multiple geographies withour relying on web services.

The latest development version of the package can currently be installed from Github using devtools:

```r
library(devtools)
install_github("gavinrozzi/zipcodeR")
```

Once installed, it's easy to start using zipcodeR to obtain ZIP code data for your next project:

```r
# Load the zipcodeR library into R
library(zipcodeR)

# Find all ZIP codes for a state
search_state('NJ')

# Find all ZIP codes for a county
search_county('Ocean','NJ')

# Find all ZIP codes for a timezone
search_tz('Eastern')

# Get all Census tracts for a given ZIP code
get_tracts('08731')
```

The functions contained within zipcodeR return a dataframe containing the ZIP code and related geographic and demographic information. zipcodeR helps facilitate relating ZIP code-level data to Census tracts and other Census units by providing helper functions.

Report any issues with the package [here.](https://github.com/gavinrozzi/zipcodeR/issues)

Pull requests and suggestions for new features / changes are welcome via [Github](https://github.com/gavinrozzi/zipcodeR)