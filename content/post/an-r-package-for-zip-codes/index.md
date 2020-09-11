---
title: An R package that makes working with US ZIP codes painless
date: 2020-09-08
math: false
diagram: false
image:
  placement: 3
  preview_only: false
tags:
- Open Source Software
---

In this post I will introduce [zipcodeR](https://gavinrozzi.github.io/zipcodeR/), my new open-source R package that provides a set of integrated functions and data that make working with ZIP code-level data easier in R.

The package provides a comprehensive, offline dataset for US ZIP codes in addition to integrating outside open data sources from the Census Bureau and Department of Housing & Urban development to aid researchers and data science practitioners working with ZIP code-level data in R.

## Why a new package is needed

Social science researchers, data scientists and others who are studying topics in the United States have likely come across data at the ZIP code level. There's really nothing special about ZIP codes, as they really only exist to identify USPS service areas, and are not meant to track demographic changes over time such as Census tracts, but they are still an ubiquitous and widely understood way of identifying the approximate geographic location of data, such as [COVID-19 case counts.](https://github.com/nychealth/coronavirus-data/blob/master/tests-by-zcta.csv)

For data science projects involving data that is at the ZIP code level, I've found myself doing a lot of repetitive tasks for reading in and integrating ZIP codes. And since here in New Jersey, our ZIP codes start with leading zeroes, I'm used to R, Excel and other tools being "helpful" and cutting off the leading zeroes, making the ZIP codes not terribly useful.

There are a few good libraries for Python that provide useful data and functions for looking up ZIP codes and related data, such as [uszipcode](https://pypi.org/project/uszipcode/) but nothing with similar functionality is currently available for R, hence the motivation for creating zipcodeR.

## Filling a void in the R ecosystem
For example, the only package I was able to find on CRAN that offered something comparable was the package [zipcode](https://cran.r-project.org/web/packages/zipcode/index.html), which was last updated in 2012 and archived from CRAN in early 2020 due to a lack of maintenance.

That packaged provided data on ZIP codes aggregated from multiple sources similar to the data I am working with for zipcodeR, as well as a basic function for cleaning up improperly formatted ZIP codes, but was primarily just a wrapper for a dataframe with data about ZIP codes.

In creating this package, I wanted to both find a way of simplifying my personal workflow by eliminating the drudgery of making multiple calls to ```read_csv()``` and ```dplyr``` to filter and wrangle ZIP code data, while also avoiding the work of manually integrating outside data sources everytime I wanted to do something with data at the ZIP code level.

## Installation & usage
The latest development version of the package can be installed directly from Github using devtools. Make sure you have devtools installed on your system first by running 
```r  
install.packages('devtools')
```
Then, install zipcodeR by running
```r
devtools::install_github("gavinrozzi/zipcodeR")
```
The current version has also been submitted to the official R package repository, the Comprehensive R Archive Network (CRAN). If the package is accepted for publication there, it will be possible to install it via another call to ```install.packages()```.

### Currently implemented features
At this point, after about a weekend worth of work on this, I feel that zipcodeR is now at the minimum viable product stage. Most of the basic functions one would expect from a library handling ZIP codes have been implemented, although there are still additional features I am hoping to implement in the future.

Here's what is currently working in v0.1.0:

- Search ZIP codes by state
- Search ZIP codes by county
- Search ZIP codes by major city
- Search ZIP codes based upon which timezone they fall in
- Get every Census tract that falls within a given ZIP code (suitable for joining to shapefiles)

And here is an example of basic usage of the zipcodeR library:

```r
# Load the library into your R session
library(zipcodeR)

# Find all ZIP codes for a state
search_state('NJ')

# Find all ZIP codes for a county
search_county('Ocean','NJ')

# Find ZIP codes for a city
search_city('Chappaqua','NY')

# Find all ZIP codes for a timezone
search_tz('Eastern')

# Get all Census tracts for a given ZIP code
get_tracts('08731')
```

Full details on how to use the various functions of zipcodeR can be viewed from the project's [documentation.](https://gavinrozzi.github.io/zipcodeR/)

## Roadmap for future iterations
The work of building a feature-complete zipcode library R is not over with this release. I still want to implement additional features for performing geographic lookups and relating ZIP code data to Census data. But I feel that this is a good start for what could eventually be a swiss army knife for ZIP codes and ZIP code level data in R.

With that said, I invite you to try out zipcodeR by following the installation instructions above, [view the source code on Github](https://github.com/gavinrozzi/zipcodeR/) and submit any bugs [here.](https://github.com/gavinrozzi/zipcodeR/issues)
