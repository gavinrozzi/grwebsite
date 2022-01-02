---
date: "2022-01-02"
diagram: false
image:
  placement: 3
  preview_only: true
math: false
tags:
- R
- Politics
title: 'Interactive map: 2022 New Jersey congressional redistricting'
---

The [New Jersey Congressional Redistricting Commission](https://www.njredistrictingcommission.org) recently wrapped up the process of redrawing the state's congressional districts based on new Census data. These new districts will take effect beginning this year and shape congressional elections for the next decade.

The controversial, closed-door process resulted in the Commission's chair, former New Jersey Supreme Court Justice John Wallace [selecting the Democratic Party's map.](https://newjerseyglobe.com/redistricing/after-closed-door-process-wallace-chooses-democratic-congressional-map/)

Following the adoption of the map, the Commission released PDF copies of maps that denote the split between municipalities. The PDFs aren't that great for zooming in to see the precise differences, and a GIS shapefile didn't become available until later.

The Commission subsequently released shapefile that shows the precise boundaries of each congressional district, which I processed andvisualized below in an interactive map:

<iframe seamless
src="/leaflet/njcongdists/index.html" width="100%" height="900">
</iframe>


## Code

I created the above map using the following R code:

```{r}
library(sf)
library(leaflet)
library(tidyverse)


# Read in shapefile, arrange by district number
# Source: https://www.njredistrictingcommission.org/documents/2021/Shapefiles2021/NJCD_2021_SHAPE_FILE.zip
shape <- st_read("NJCD_2021_ADOPTED_DEC22.shp") %>% 
  arrange(as.numeric(DISTRICT)) %>%
  mutate(DISTRICT = factor(DISTRICT,ordered = TRUE, levels = c(1:12)))

# Create color pallete
factpal <- colorFactor(cartography::carto.pal("multi.pal",13), shape$DISTRICT)

# Build the map
leaflet(shape) %>%
  addTiles() %>%
  addPolygons(stroke = FALSE, smoothFactor = 0, fillOpacity = 0.6,
              fillColor = ~factpal(DISTRICT),
              label = ~paste("Congressional District",DISTRICT)) %>%
  addLegend(title = "NJ Redistricting",pal = factpal, values = ~DISTRICT, opacity = 1.0)
```

