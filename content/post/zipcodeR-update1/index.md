---
date: "2020-12-13"
diagram: false
image:
  placement: 3
  preview_only: false
math: false
tags:
- R
title: What's new in zipcodeR v0.2?
summary: This post reviews some of the changes that have been made to the {zipcodeR} package in version 0.2 which was recently accepted by CRAN.
---

I first released my open-source R package for processing U.S. ZIP codes, [zipcodeR](https://cran.r-project.org/web/packages/zipcodeR/index.html), in September. From then until December, when I am writing this, the package has received more than 3000 downloads and a lot of interest from the community.

 I'm grateful for all of the interest in the package - I created this to simplify my own personal data science workflow, and the adoption of `zipcodeR` by the wider R community shows that there was a clear need for such a package.


{{< figure src="/media/zipcodeRdownloads-sept-dec.png" title="CRAN downloads of {zipcodeR} from Sept. - Dec. 2020" attr="CRAN Download Dashboard" attrlink="https://hadley.shinyapps.io/cran-downloads/" >}}

I've heard from several users & community members that have had suggestions and requests for features. One of our users, Andre Mikulec, also [recently contributed code](https://github.com/gavinrozzi/zipcodeR/issues/2) to allow the `search_county()` function to perfom an approximate match for county names.  

After incorporating some community feedback along with a few of my own new ideas, I am very happy to share that the next release of `zipcodeR`, version 0.2 is now available on CRAN, and can be installed from the R console by running `install.packages('zipcodeR')`

## New & updated features in v0.2

Here are some of the major changes in this update:

- [`search_county()`](https://gavinrozzi.github.io/zipcodeR/reference/search_county.html) function now allows for approximate matching of county names using agrep (Andre Mikulec)
- [`search_state()`](https://gavinrozzi.github.io/zipcodeR/reference/search_state.html) is now vectorized and will accept a vector of state abbreviations
- [`search_tz()`](https://gavinrozzi.github.io/zipcodeR/reference/search_tz.html) is now vectorized and will accept a vector of timezones
- [`zip_code_db`](https://gavinrozzi.github.io/zipcodeR/reference/zip_code_db.html) has been updated to use latest upstream data
- Added [`reverse_zipcode()`](https://gavinrozzi.github.io/zipcodeR/reference/reverse_zipcode.html) function for obtaining metadata about a given ZIP code.
- Added [`search_cd()`](https://gavinrozzi.github.io/zipcodeR/reference/search_cd.html) function for searching ZIP codes contained within a given congressional district.
- Added [`is_zcta()`](https://gavinrozzi.github.io/zipcodeR/reference/is_zcta.html) function for testing whether a given ZIP code is a ZIP code tabulation area (ZCTA).
- Added [`search_fips()`](https://gavinrozzi.github.io/zipcodeR/reference/search_fips.html) function for searching ZIP codes by state and county FIPS codes.
- Added [`get_cd()`](https://gavinrozzi.github.io/zipcodeR/reference/get_cd.html) and [`search_cd()`](https://gavinrozzi.github.io/zipcodeR/reference/search_cd.html) functions for relating ZIP codes to congressional districts
- Added the first vignette, ["Introduction to zipcodeR"](https://gavinrozzi.github.io/zipcodeR/articles/zipcodeR.html)

As always, review [the documentation](https://gavinrozzi.github.io/zipcodeR/index.html) for a full reference on each of the package's functions.

## Looking ahead

This update aims to improve upon the initial features of `zipcodeR`, but there is still more work to be done. In the next release I aim to implement some much-requested GIS related features for geocoding ZIP codes performing geographic lookups.

It has also been really cool to see how folks have been using `zipcodeR` in their work. So far I've seen two very interesting project done by graudate students in data science and urban informatics that implemented the package. I'm always interested in hearing about interesting use cases of the package, so feel free to reach out if you're working on anything particularly interesting.