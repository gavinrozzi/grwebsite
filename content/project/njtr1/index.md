---
date: "2021-01-17T00:00:00Z"
external_link: ""
image:
  caption: null
  focal_point: Smart
slides: null
summary: An R package that makes it easy to download and analyze New Jersey car crash
  data
tags:
- Open Source Software
title: njtr1
url_code: https://github.com/gavinrozzi/njtr1
url_pdf: https://cran.r-project.org/web/packages/njtr1/njtr1.pdf
url_slides: ""
url_video: ""
---

[njtr1](https://gavinrozzi.github.io/njtr1/) is an R package that makes it easy to obtain detailed data on car crashes in New Jersey for transportation planning, analyis and research.

The package downloads data published by the New Jersey Department of Transportation that is collected when police officers file the form NJTR-1 following a motor vehicle crash that was reported to law enforcement within the State of New Jersey.

This package takes the raw data that is published by the state and cleans it for use in R. The data published by the state lacks the header row that identifies the column, among other issues, so this package endeavors to make the state's data more easily usable.

The latest development version of the package can currently be installed from Github using devtools:

```r
library(devtools)
install_github("gavinrozzi/njtr1")
```

Once installed, it's easy to start using zipcodeR to obtain ZIP code data for your next project:

```r
get_njtr1(year = 2019, type = "Accidents")

get_njtr1(year = 2019, type = "Drivers")

get_njtr1(year = 2019, type = "Vehicles")


```

Report any issues with the package [here.](https://github.com/gavinrozzi/njtr1/issues)

Pull requests and suggestions for new features / changes are welcome via [Github](https://github.com/gavinrozzi/njtr1)
