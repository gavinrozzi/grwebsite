---
title: Mapping Philadelphia's Bike Sharing Data
date: 2020-01-17
math: false
diagram: false
image:
  placement: 3
  preview_only: true
---

### Indego operates a bike sharing network in Philadelphia. They also publish anonymized data detailing usage of the service.

As a part of my coursework for the [Data Science & Strategic Analytics](https://stockton.edu/graduate/data-science_strategic-analytics.html) masters program at Stockton University, last semester I was tasked with creating a visualization that told a data story regarding the bike sharing program using the Python library matplotlib. Here's how I solved this project and produced the following animated visualization.

![The animated visualization](/img/indego.gif)

## How it works
To create the visualization, I wanted to create a simple and repeatable workflow. Rather than designing multiple scripts that had to be run individually or doing things manually, my goal from a technical standpoint was to have a single script that I could execute from the command line that would run all of the needed code and output a final animated GIF suitable for sharing.

### Downloading the data
The bash script works by first obtaining a list of all quarterly data files published on the Indego website. It does this by using a grep expression to filter out just the URLs we are interested from the HTML code of the web page that we have downloaded using curl. It stores the list of URLs as an array and iterates over each URL to download a ZIP file containing data in CSV format. 

To conserve bandwidth, I used the -N argument in the script's calls to wget to tell the it not to download the data files if they are already present on the user's computer and have not changed on the server.

Once the data files are downloaded, the bash script subsequently extracts each ZIP archive of data and stores the extracted CSV files that each cover one quarter's worth of activity in a directory for each year from 2015 - 2019. Thus, each quarter of 2015's data is stored in a folder for 2015 and so on.

### Creating the visualization
Now that the data is properly downloaded and organized by year, we can begin creating the visualization.

I coded the Python script to accept the filenames of the CSV files as arguments, therefore the Python code can be executed simply by running the initial bash script and the Python code will run for each file.

The Python code utilizes Pandas and GeoPandas to clean the data as well as parse the latitude and longitude columns in order to plot them using matplotlib. Some of the data files have latitude and longitude values equal to zero, which caused problems with the visualization, so I cleaned the dataset to remove these problemtatic cases. This was a very small subset of the total records in the dataset.

The Python code uses matplotlib for visualizing trends in Indego usage by plan. I wanted to map this against a background of a map of the city of Philadelphia and was able to do so using open data published by the city government.

[The city publishes a GeoJSON file](https://raw.githubusercontent.com/azavea/geo-data/master/Neighborhoods_Philadelphia/Neighborhoods_Philadelphia.geojson) that can be used to draw the city limits and various neighborhoods within Philadelphia, so I settled on that. GeoPandas makes it simple to read in this file and plot it using matplotlib.

With the background of the visualization ready to go, we are now ready to plot the data on the map. Our data is now stored as a GeoPandas dataframe, which is quite similar to the format used by Pandas but tailored for working with geospatial data. 

For this visualization, I chose to focus on the destinations column of the dataset in order to plot the markers on a map of Philadelphia. Similar columns for where bike trips began are included in Indego's public data, but GeoPandas only allows one geometry feature per dataframe, so I had to choose between one or the other for the purpose of this project. This concept could be extended in the future to potentially include where trips started from, but time constraints made me unable to explore that possibility.

 A different marker and color is used based upon which plan the customer was subscribed to when they used the bike sharing network, allowing bike usage to be visualized over time by plan.

The plans that are tracked in the dataset are as follows:

![The plans](/img/indegoplans.jpg)

I chose to represent the Indego30 plan as a red star, walk up (no plan) as a blue dot and the IndegoFlex plan as a green triangle on the map.

The end result of the Python script will be a PNG file for each quarter's worth of data from 2015 to the present, stored in the current working directory. Thus, each iteration of the Python code will produce one frame for the final GIF.

### Putting it all together
At this point, all that is left to do is stitch the PNG files created by the Python script into the final animated GIF shown at the top of this post. Fortunately the ImageMagick library makes this task quite easy and scriptable. The final line of the script makes use of the convert command provided by ImageMagick to stitch all of the PNG files into the final animated GIF visualizng trends in bike usage over time.

## The code

```bash
#!/bin/bash
# This script downloads all Indego data and stores it in a folder for each year
# Last modified 12/22/2019

# Get a list of URLS to download
URL_LIST=$(curl https://www.rideindego.com/about/data/ | grep -e ".zip" | grep -Eoi '<a [^>]+>' | grep -Eo 'href="[^\"]+"' | grep -e "uploads" | tr -d '"' | cut -c 6-)

# Iterate over each line in the URL list to download the data
echo $URL_LIST | while read line ; do
   wget -N $line -P data/
done

# Find all downloaded ZIPs and extract them in the same folder for each year, then run
# Python script to create a plot for each file
YEARS=(2015 2016 2017 2018 2019)

for year in ${YEARS[@]}; 
    do
FILES=$(find data/ -type f -name *$year*)
    for file in $FILES;
        do
        unzip -o $file -d data/$year
    done
YEAR_CSV=$(find data/$year/ -type f -name "*.csv" | sort -n)
    for csv in $YEAR_CSV
        do
        python3 plot.py $csv
    done
done

# Convert the plotted pngs to an animated GIF sequence
convert -delay 75 -loop 0 *.png indego.gif

```

The above bash script runs each month's data through a Python script, plot.py, which consists of the following code:

```python
# Last Modified 12/22/2019
# This script plots one month of data and saves it to a PNG file
import sys
import os
import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt

# Set coordinate system for map
crs = {'init': 'epsg:4326'}

# Create name of plot based upon filename of CSV
base = os.path.basename(sys.argv[1])
file_name = os.path.splitext(base)[0]
ext = '.png'
plot_file_name = file_name + ext

print("Plotting " + sys.argv[1])
# Read in CSV file to pandas
df = pd.read_csv(sys.argv[1])

# Remove problematic cases where either lat or lon is equal to 0
df = df[df.start_lat != 0]
df = df[df.start_lon != 0]
df = df[df.end_lat != 0]
df = df[df.end_lon != 0]

# Convert to a geodataframe
destinations = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.end_lon, df.end_lat))

# Load GeoJSON file of Philadelphia neighborhoods
# Download it from https://raw.githubusercontent.com/azavea/geo-data/master/Neighborhoods_Philadelphia/Neighborhoods_Philadelphia.geojson
philly = gpd.read_file('Neighborhoods_Philadelphia.geojson')
# Create map
fig,ax = plt.subplots(figsize = (15,15))

philly.plot(ax = ax, color = 'grey')
destinations[destinations['passholder_type'] == 'Indego30'].plot(ax = ax, color = 'red', marker = "*", label = "Indego30")
destinations[destinations['passholder_type'] == 'Walk-up'].plot(ax = ax, color = 'blue', marker = "8", label = "Walk-up") 
destinations[destinations['passholder_type'] == 'IndegoFlex'].plot(ax = ax, color = 'green', marker = "^", label = "IndegoFlex")


ax.axis('off')
plt.legend()
plt.title('Indego Usage by Plan Type')
plt.savefig(plot_file_name, format="png")

```