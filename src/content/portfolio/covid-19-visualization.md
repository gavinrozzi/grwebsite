---
title: "COVID-19 Spread Visualization"
summary: "Interactive web-based visualization tracking the spread of COVID-19 across U.S. counties using advanced GIS technologies and real-time data processing."
description: "Interactive visualization platform built with Kepler.gl to track and analyze COVID-19 cases and deaths across all U.S. counties, featuring temporal animations and multiple visualization modes for epidemiological analysis."
date: 2020-09-01
category: "research"
tags: ["GIS", "data visualization", "public health", "web mapping", "Kepler.gl"]
featured: true
links:
  website: "https://rucilab.rutgers.edu/visualizing-the-spread-of-covid-19-in-the-united-states/"
metrics:
  - label: "Counties Tracked"
    value: "3,000+"
  - label: "Days of Coverage"
    value: "240+"
  - label: "Visualization Types"
    value: "4"
---

## Overview

As part of my work at the Rutgers Urban and Civic Informatics (RUCI) Lab, I developed an interactive web-based visualization platform to track and analyze the spread of COVID-19 across the United States at the county level. This project demonstrated the power of advanced web GIS technologies to make complex epidemiological data accessible and understandable to researchers, policymakers, and the general public.

## Project Context

During the early stages of the COVID-19 pandemic, public health authorities were overwhelmed with response efforts, creating gaps in data availability and accessibility. The New York Times created a comprehensive public dataset tracking COVID-19 cases and deaths by county, which served as the foundation for this visualization project.

The project aimed to transform raw epidemiological data into intuitive, interactive visualizations that could help stakeholders understand spatial and temporal patterns in the pandemic's spread across the United States.

## Technical Implementation

### Data Processing Pipeline

- **Data Source**: New York Times COVID-19 dataset (county-level)
- **Time Period**: January 21, 2020 to September 17, 2020
- **Processing**: Cleaned and standardized national county-level data
- **Integration**: Joined epidemiological data with external GIS resources for spatial analysis

### Technology Stack

**Kepler.gl Mapping Framework**
- Implemented Uber's open-source Kepler.gl library for interactive mapping
- Leveraged its powerful capabilities for large-scale dataset visualization
- Utilized built-in temporal animation features to show changes over time
- Optimized for performance with thousands of geographic features

**Key Technical Features:**
- Real-time data processing and transformation
- Spatial joins between epidemiological and geographic datasets
- Temporal animation capabilities
- Interactive filtering and exploration
- Scalable architecture for large datasets

## Visualization Types

The project produced four distinct animated visualizations, each offering unique insights:

### 1. COVID-19 Cases by County
Interactive county-level map with color-coded dots representing case counts for each day throughout the pandemic period. This visualization reveals geographic patterns in disease spread.

### 2. COVID-19 Hotspots by County
Enhanced visualization where dot size scales proportionally to case counts, making it easy to identify emerging hotspots and understand the relative magnitude of outbreaks across different regions.

### 3. COVID-19 Deaths by County
County-level map showing COVID-19 mortality data with color-coded representation, providing crucial information about the pandemic's most severe impacts.

### 4. COVID-19 Death Hotspots by County
Proportional symbol map showing death counts over time, highlighting areas experiencing the highest mortality rates and helping identify regions under the greatest strain.

## Impact and Significance

### Research Applications
- Provided researchers with tools to identify spatial patterns in disease transmission
- Enabled temporal analysis of pandemic progression
- Supported epidemiological studies examining regional variation in outcomes

### Policy Support
- Offered policymakers visual tools to understand pandemic dynamics in their jurisdictions
- Helped inform resource allocation decisions
- Supported evidence-based public health interventions

### Public Information
- Made complex epidemiological data accessible to general audiences
- Increased public understanding of pandemic spread patterns
- Supported transparency in public health reporting

## Technical Achievements

**Scalable Data Processing**
- Successfully processed and visualized millions of data points
- Implemented efficient spatial joins and temporal aggregations
- Maintained responsive performance with large datasets

**Advanced Visualization Techniques**
- Temporal animation showing 8+ months of pandemic data
- Multiple visualization modes for different analytical purposes
- Interactive exploration enabling user-driven analysis

**Web GIS Innovation**
- Demonstrated practical application of cutting-edge mapping libraries
- Showcased potential of open-source GIS tools for public health
- Created accessible web-based platform requiring no specialized software

## Lessons Learned

This project reinforced several key principles for data visualization in crisis situations:

1. **Timeliness**: Real-time or near-real-time data processing is crucial during public health emergencies
2. **Accessibility**: Complex data must be made understandable to diverse audiences
3. **Scalability**: Systems must handle large datasets efficiently
4. **Interactivity**: User-driven exploration reveals insights that static visualizations cannot
5. **Open Source**: Leveraging open-source tools and data promotes transparency and collaboration

## Future Applications

The techniques and technologies developed for this project have broader applications:

- Disease surveillance and outbreak monitoring
- Environmental health tracking
- Urban planning and development analysis
- Emergency response coordination
- Social determinants of health research

## Project Recognition

This work was conducted as part of the RUCI Lab's mission to apply urban informatics and data science to pressing public policy challenges. The visualization platform helped demonstrate how academic research centers can rapidly respond to public health crises by making data more accessible and actionable.

## Technical Details

**Data Volume:**
- 3,000+ U.S. counties tracked
- 240+ days of temporal coverage
- Daily case and death count updates
- Multiple visualization layers

**Performance Optimization:**
- Efficient data structures for temporal queries
- Progressive rendering for smooth animations
- Optimized spatial indexing
- Client-side processing for responsive interaction

**Accessibility Considerations:**
- Color schemes chosen for accessibility
- Multiple visualization modes for different analytical needs
- Embedded video demonstrations for users unable to interact with live maps

---

*This project demonstrates the application of advanced web GIS technologies to public health challenges and showcases how data visualization can support evidence-based decision-making during public health emergencies.*
