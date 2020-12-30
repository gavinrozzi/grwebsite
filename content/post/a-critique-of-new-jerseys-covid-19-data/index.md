---
title: A critique of New Jersey's COVID-19 data
date: 2020-12-29
math: false
diagram: false
image:
  placement: 1
  caption: "A screenshot of New Jersey's COVID-19 data dashboard."
  preview_only: false
---

In this post I will explore how New Jersey compares to neighboring states in terms of the granularity, format and accessibility of raw data about COVID-19 cases and deaths made available to the public during the pandemic's outbreak in 2020. I conclude that New Jersey is failing to adequately publish raw data on COVID-19 cases for use in research and journalistic reporting, falling short compared to others in the tri-state region. 

By "raw data" I mean structured data, either in CSV, Excel, an API, or some other machine-readable format published by a state public health authority and not locked to a dashboard or website that cannot be exported for analysis that provides aggregated counts of COVID-19 cases and deaths at the state or sub-regional level. 

Making this data available is important because it allows journalists, researchers, & others wishing to study COVID-19 to get a better understanding of both conditions in their communities and the decisions made by government in response to the pandemic.

## How New Jersey compares to its neighbors

With that definition in mind, just what does New Jersey have to offer for COVID-19 data? 

Not much.

Unlike three neighboring states - including New York, Connecticut & Pennsylvania - [the homepage of New Jersey's state open data portal](https://data.nj.gov/) has not been updated to highlight the state's collection of COVID-19 data available for download. In fact, the New Jersey open data portal really has not changed much at all since the beginning of the year. Not updating the state data portal to highlight the availability of COVID-19 data was a missed opportunity for state officials to both showcase the value of the state's open data initiatives as well as to build trust with the public by prioritizing transparency in the state's response to the pandemic.

Instead, to find out what types of COVID-19 data are available through New Jersey's portal, one must manually search for it. Even then, the results leave much to be desired. The first 5 results when searching the keyword "COVID" [don't yield any raw data for New Jersey at all](https://data.nj.gov/browse?q=COVID&sortBy=relevance), they're just links to external websites that don't provide New Jersey-specific data.

### Links ≠ Data

Using an open data portal - [and all of the advanced features that it provides for sharing and visualizing data](https://www.tylertech.com/products/socrata/open-data-citizen-engagement) - as a simple directory of links to other websites that do not provide downloadable data essentially defeats the purpose of adopting an open data portal as a clearinghouse of government data in the first place, **since the goal of an open data portal is to facilitate the sharing of data, not a simple directory of links.** 

Links to external websites that don't provide data, however helpful they may be, fall short of advancing the wider purpose of open government data. The state did publish some data files and a map view on the site containing businesses that received [Paycheck Protection Program loans](https://data.nj.gov/Government-Finance/PPP-Loans-Map/dp7b-ist4), but I am limiting my discussion of data in this post to COVID-19 case and death data.

### Disabled Data Downloads

New Jersey's COVID-19 data dashboard is actually a mishmash of two popular technologies used for publishing online dashboards. While the main dashboard interface is built with [ArcGIS StoryMaps,](https://storymaps.arcgis.com/) several of the core views of the dashboard are actually built with [Tableau](https://www.tableau.com/). 

One of the most frustrating and arbitrary barriers to accessing the state's COVID-19 data results from attempting to actually download some of the data that is presented on some dashboards. New Jersey's Tableau-based dashboards provide an option to download the contents of the dashboard to save a local copy to your device. Unfortunately, New Jersey's explicitly disabled the option to download copies of the underlying data presented in the state's COVID-19 dashboard.

{{< figure src="/media/covid-download.jpg" title="The download prompt for the state COVID dashboard" >}}

Sure, you can download a copy of the dashboard in PDF, PowerPoint or as a JPEG image, but not in the format that it was stored in when used to produce the maps, statistics and visualizations shown by it. This makes it nearly impossible for any substantive analysis of the state's COVID-19 cases and deaths using the state's official data. The options to download the raw data or a cross tabulation are greyed out by the prompt shown by Tableau when a user clicks the download button.

This is one of the most frustrating barriers to accessing New Jersey's COVID-19 data due to its seemingly contradictory basis and arbitrary imposition. **If the data presented in this dashboard is fit for public release and consumption by way of the dashboard, then surely the same data must also be suitable for the public to download?**

It is extremely disappointing that the state explicitly disabled the download of data from the official COVID-19 dashboard in the format that would be most useful for journalists, researchers & other stakeholders while allowing it to be downloaded in a far less useful format.

The failure of the New Jersey Department of Health to enable downloads of these data represents an unnecessary barrier to a greater understanding of the full impact of the pandemic across New Jersey's diverse communities and regions. By enabling these data downloads, NJDOH could also very likely reduce the number of [OPRA requests they receive for these data](https://www.northjersey.com/story/news/new-jersey/2020/06/12/coronavirus-nj-you-can-now-look-up-cases-deaths-your-zip-code/3175245001/), which has at times resulted in litigation over the department's failure to release the requested records as required by the freedom of information law.

### Lack of ZIP code-level data

Another frustrating shortcoming of the state's COVID dashboard lies in the lack of availability of ZIP code level data. In addition to infrequently updating this segment of the dashboard (monthly), many New Jersey towns lack data because the NJDOH refuses to publish these numbers for any ZIP code with less than 20,000 residents, citing privacy concerns.

As a result of these limitations, this mean that the state's ZIP code level dashboard does not display any information for my hometown of Forked River:

{{< figure src="/media/forkedrivercovid.jpg" title="NJ ZIP code level dashboard showing Forked River (08731) selected with data suppressed" >}}

The barriers to accessing ZIP code-level COVID data in New Jersey is significantly limiting the public's ability to study more localized trends in cases, especially in less populated regions of the state.

## New Jersey is behind the pack when it comes to open data

To understand how far behind New Jersey is in publishing open data concerning the pandemic, we need only to contrast the state's paltry availability of data with the efforts of our regional neighbors in the greater tri-state area.

### New York

[New York City](https://github.com/nychealth/coronavirus-data) provides multiple CSV files updated with daily counts of COVID-19 cases and deaths within the city's five boroughs. They've done a great job with keeping these files updated and the level of data they provide should be a model for other states & localities to follow. The data files published by NYC include counts of cases and deaths by ZIP code, along with other files tracking rates of COVID-19 in hospitals and broken out by race and ethnicity. The fact that they publish the raw data as a series of flat files using GitHub is a big plus because that makes it possible to study changes in COVID-19 cases both over time and at the present without requiring the city to build a separate time series dataset.

Since the city releases their public dataset via GitHub, this also externalizes any costs for infrastructure and bandwidth associated with making the data available to the public. This simultaneously saves the city health department money while providing a more convenient way for developers & researchers to access the data thanks to the ease of use & ubiquity of the GitHub platform in software development and data publishing. I wish more state & local governments would follow this model, because this is working quite well there. 

New York City's use of the GitHub platform and its version control features also provide a record of who updated the data files and when, providing a new level of transparency to the creation of official government datasets regarding COVID-19. Perhaps I am a bit biased as somebody who writes code for a living, but seeing how users can ask questions or raise concerns about the data with the NYC health department data team and other data users [in public via GitHub issues](https://github.com/nychealth/coronavirus-data/issues) seems like an effective way of encouraging reuse of the data and providing a better experience to end users. 
Additionally, leveraging platforms that facilitate open code and collaboration like GitHub could also create value for the city government by allowing more people to look at their code and data and catch problems / offer solutions via pull requests and issues. 

This level of openness displayed by New York City stands in stark contrast to the opaqueness displayed by New Jersey's existing approach to COVID-19 data sharing. This level of openness should be something that New Jersey and its municipalities aspire to and would reflect a significant improvement from the current status quo marked by a lack of proactive sharing of open data concerning COVID-19 cases and deaths.

### Connecticut

Next, I'll turn to the state of [Connecticut](https://data.ct.gov/browse?tags=covid-19), which provides data on COVID-19 via their [state open data portal.](https://data.ct.gov/) That state went as far as creating a separate curated collection of COVID-19 data on their website, making this data even easier to access. While Connecticut falls short of providing data at the ZIP code level as New York City does, they do provide a data file with COVID-19 case counts by municipality, which is of comparable granularity and suitable for a more local analysis and mapping.

Interestingly enough, Connecticut's state data portal is built with [Socrata](https://www.tylertech.com/products/socrata) which is the same platform that New Jersey's state open data portal, data.nj.gov. Despite the same underlying technology driving both open data portals, New Jersey's implementation pales in comparison to that of Connecticut.

### Pennsylvania

The state of [Pennsylvania's official COVID-19 dashboard](https://experience.arcgis.com/experience/ed2def13f9b045eda9f7d22dbc9b500e) is also built with some of the same underlying technology that powers the dashboard created by the New Jersey Department of Health, ArcGIS StoryMaps, yet it provides a far greater level of openness because it explicitly facilitates the download of raw data, something that New Jersey has failed to even entertain.

Pennsylvania does not currently offer the download of raw data at the sub-regional or ZIP code level. At present, Pennsylvania currently only allows the download of raw data aggregated to the statewide level, but even this modicum of data is far more than what the New Jersey Department of Health has chosen to make available to the public.

The [City of Philadelphia](https://www.opendataphilly.org/dataset?q=covid) provides the most granular COVID-19 data, providing cases and deaths by ZIP code as a flat CSV file or API, but also in geospatial formats including GeoJSON and SHP. This is another excellent supplement to the official dashboards published by the city and is something that New Jersey could replicated with its Socrata open data portal.

## Dashboards alone are not enough

A dashboard, like the one created by New Jersey or others, should not be the be all and end all data strategy for the state's COVID-19 response. Dashboards can be helpful and have a role to play in informing the public, but publishing open data would better serve the public interest. 

At this point in the pandemic, a dashboard should be considered the bare minimum. Dashboards that do not make some form of the underlying data that they present available for analysis fall short of providing full transparency regarding the state's response to COVID-19. It would serve the public interest for more states and localities to prioritize open data and develop a plan to facilitate its sharing with the public. Making this data more accessible can help to make the public more informed about the pandemic in local communities. New Jersey can and must do better.

I can appreciate the fact that many state & local health departments are overwhelmed by the array of novel challenges presented by their response to the pandemic and may be lacking IT resources to fully support open data initiatives, but publishing data in a format that is usable by the public should be a priority due to the impact of decisions made by public health authorities that impact the lives of citizens.

Fixing the lack of COVID-19 data in New Jersey does not solely have to be an effort from the public sector. To some extent, volunteer efforts like the [COVID Tracking Project](https://covidtracking.com/) and efforts by media outlets such as the [New York Times](https://github.com/nytimes/covid-19-data) to compile data obtained by their journalists in machine readable format have helped to fill in some of the gaps in COVID-19 data availability, but governments like New Jersey can and should increase efforts to publish open data regarding the COVID-19 pandemic. By following the best practices of others who have already done so, New Jersey can easily make changes that would improve its open data efforts.
