+++
date = 2019-08-09
draft = false
tags = [""]
title = "GeigerSQL: Storing geiger counter data in a PostgreSQL database"
summary = ""

[header]
image = "headers/geigersql.jpg"
caption = ""
+++

Living in close proximity to the Oyster Creek nuclear power plant in Lacey Township has always left me interested in studying background radiation and some of the safety concerns associated with the aging plant, which has since shut down.

A few years ago I purchased an electronic geiger counter to monitor radiation, but never did much with it. Eventually I discovered Geigerlog, an open-source program for interfacing with electronic geiger counters and taking readings.

I have been using the command line Python version on one of the servers I also use to run [OC Radio Live.](/project/ocradiolive/) By default, the only option is to log the data to a CSV file. For basic analysis, this is fine, but after the software stops running (either due to a power outage or crash), starting it up again will result in the data getting overwritten from starting again. So this wasn't very useful for longterm data storage and analysis.

To address this issue, I decided to fork Geigerlog and create a new version that supports storing the data to a database, which would be more useful for longterm archiving and analysis. My new fork, GeigerSQL extends Geigerlog to store Geiger counter readings to a PostgreSQL database every minute using Python's popular Psycopg2 module.

Thus, data can be queryed like so:

![querying](/img/geigersql.JPG)

Eventually I may extend this to include a web interface and other capabilities. For now, [the code](https://github.com/gavinrozzi/geigersql) can be downloaded from Github here.

Here is some [sample data](/files/geiger-data.csv) that I have recorded since I started the project.
