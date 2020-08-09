---
title: A new dashboard for visualizing NJ OPRA data
date: 2020-08-08
math: false
diagram: false
image:
  placement: 3
  preview_only: false
---

### I'm thrilled to announce the public release of [a new interactive dashboard](https://rozzi.shinyapps.io/nj-opra-dashboard/) created from 3 years of OPRA request metadata collected via [OPRAmachine.](https://opramachine.com)

I first created the OPRAmachine platform in 2017, and one of my goals since starting the project was collecting data about OPRA requests in order to track how well public authorities comply with New Jersey's state freedom of information law. The large amount of data collected through the platform is proving to be a valuable source of data for researching OPRA compliance in the state.

## Leveraging the OPRAmachine dataset for new insights

Now that the project has been in existence for about three years, I have sought ways to best leverage the voluminous amount of data that has been collected from OPRA requests and responses. At this point, OPRAmachine has collected data on more than 15,000 OPRA requests that have been submitted using the platform since 2017, so we have quite a bit of data to work with. The metadata is suitable for studying trends in the content of requests as well as the timeliness in which public officials respond to them. I decided to create the dashboard, as well as a [peer-reviewed journal article](/publication/opramachine-data-paper/) that is currently under review, as a part of my final practicum for my graduate studies in Data Science & Strategic Analytics at Stockton University.

## How the dashboard works

Using raw data exported from the OPRAmachine database, the dashboard presents maps, visualizations and statistics regarding all OPRA requests submitted via OPRAmachine. The dashboard is currently tracking the percentages of succesful, unsuccesful and other request states.

## Important caveats & assumptions

While these data represent a significant milestone in terms of quantifying the number of requests sent to particular jurisdictions in New Jersey, I want to be very clear that there may be some fringe cases that impact the accuracy of the statistics reported within this dataset. For example, certain types of OPRA requests may require more work from public authorities in order to compile a response. As of now, we have no way of taking into account simple vs. complex OPRA requests, so future iterations of this work will likely address this and other issues.

One other thing to keep in mind is that the total number of public authorities and users may have discrepancies between the dashboard and the OPRAmachine website. The dashboard can only take into account users and authorities that have actually received requests via OPRAmachine, so if an authority never was sent a request we are not producing any statistics for it.
Another key assumption that this dataset makes is that users are accurately classifying the responses to OPRA requests that they receive. We are unable to manually review the thousands of requests or automatically classify them, so we rely on users to answer a survey question about the response they receive from public authorities.

## Future plans

Against that background, I believe this dashboard is a significant step forward in increasing the public's understanding of how timely their governments are at responding to requests for public records. 

This dashboard represents the first iteration of my vision of making use of the data we've collected to increase public awareness of government transparency issues in New Jersey, and my goal is to build upon this work with future revisions to the dashboard and other data tools.

Right now, the data used to power the dashboard is created from manual exports from the OPRAmachine database - it is NOT a realtime representation of the data contained on the site. In a future version of this dashboard, I hope to add functionality to automatically update the data so that realtime information can be provided.

In the future, I hope to add additional visualizations and metrics to the dashboard, and any suggestions as to the content are welcome. In the meantime, [please feel free to check out the dashboard here.](https://rozzi.shinyapps.io/nj-opra-dashboard/)
