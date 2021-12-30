---
date: "2020-09-08T00:00:00Z"
external_link: ""
image:
  caption: null
  focal_point: Smart
slides: null
summary: An R package that makes dealing with ZIP codes painless
tags:
- Open Source Software
- R
title: zipcodeR
url_code: https://github.com/gavinrozzi/zipcodeR
url_pdf: https://cran.r-project.org/web/packages/zipcodeR/zipcodeR.pdf
url_slides: ""
url_video: ""
---

[zipcodeR](https://gavinrozzi.github.io/zipcodeR/) is an R package that makes dealing with ZIP codes painless.

The package provides an integrated set of data and functions that help you save time when working with ZIP code data in R by making it easy to lookup ZIP codes across multiple geographies withour relying on web services.

The current release of the package can be installed from CRAN by entering the following at the R console:

```r
install.packages(‘zipcodeR’)
```

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
