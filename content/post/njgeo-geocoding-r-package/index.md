---
always_allow_html: true
author: Gavin C. Rozzi
date: 2022-02-04
output:
  md_document:
    df_print: kable
    fig_retina: 2
    preserve_yaml: true
title: New Jersey’s official geocoding API now has a client for R
---

I am often critical of the lack of, or inconsistent availability of
administrative data from public authorities in New Jersey. But one
bright spot I recently discovered has been the [free geocoding
service](https://njgin.nj.gov/njgin/edata/geocoding/index.html#!/)
maintained by the NJ Geographic Information Network. This blog post will
introduce a new side project of mine, `{njgeo}`, which provides an R
client to New Jersey’s publicly available geocoding API to improve the
workflow of analyzing spatial data specific to the state of New Jersey.

### New Jersey’s official geocoding service

The New Jersey Office of GIS (NJOGIS) runs several public [ArcGIS REST
API
endpoints](https://newjersey.maps.arcgis.com/home/item.html?id=dba4fc758a8f425f8fa83b8634b1b95c)
via NJGIN that can be queryed by the public via the NJGIN. Many large
businesses and governments rely on ESRI’s software for their GIS needs,
which has led to its REST API interface becoming a de facto standard in
GIS, not like Microsoft Word in the word processing space.

The state’s official geocoding service (“NJ\_Geocode”) can geocode
addresses in New Jersey, converting addresses into latitude and
longitudes within a coordinate reference system used for mapping. The
API is a convenient, free alternative to many commercial platforms that
charge for geocoding by the API request (some maintained by ESRI).

One other advantage this geocoding service has is that it also takes
into account some of NJOGIS’s New Jersey-specific datasets, such as the
road centerlines and enhanced source address points data that they
integrated.

### The problem

But the problem in this case is that the ArcGIS APIs were only designed
to work directly with ESRI’s software, or through manually generated
user requests via their spartan web interface. There have been other
third party and official clients for ArcGIS written for R, however none
have been targeted specifically to work with New Jersey’s specific
implmentation of the REST APIs.

ArcGIS may work for some people, but I prefer to work on GIS-related
analysis in a scripting / command line environment, and being able to
make requests to the ArcGIS APIs in a language like R or Python is
better aligned with my preferred workflow in data science. So I decided
to make this package mainly to automate some aspects of my workflow in
analyzing New Jersey-specific data in R. If you happen to work with
either of those things, this package may be for you.

### The njgeo R package

`{njgeo}` is a new package for R that I recently created. This package
can be used to query the state’s geocoding API without having to use
ArcGIS on the desktop or use up any limited enterprise credits for
geocoding. The package processes the JSON data received from the API and
formulates the queries needed to perform geocoding, address candidate
matchign & reverse geocoding, fully within R and without needing to rely
on the use of external GIS software.

The package can be downloaded from
[CRAN](https://cran.r-project.org/web/packages/njgeo/index.html) by
running `install.packages('njgeo')`.

You can input a single string to geocode an address using `{njgeo}`

    geocode_address_candidates("33 Livingston Ave. New Brunswick, NJ")

<table style="width:100%;">
<colgroup>
<col style="width: 31%" />
<col style="width: 4%" />
<col style="width: 7%" />
<col style="width: 7%" />
<col style="width: 7%" />
<col style="width: 7%" />
<col style="width: 7%" />
<col style="width: 7%" />
<col style="width: 17%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">address</th>
<th style="text-align: right;">score</th>
<th style="text-align: right;">location.x</th>
<th style="text-align: right;">location.y</th>
<th style="text-align: right;">extent.xmin</th>
<th style="text-align: right;">extent.ymin</th>
<th style="text-align: right;">extent.xmax</th>
<th style="text-align: right;">extent.ymax</th>
<th style="text-align: left;">geometry</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;">33 Livingston Avenue, New Brunswick, NJ, 08901</td>
<td style="text-align: right;">100.00</td>
<td style="text-align: right;">-74.44513</td>
<td style="text-align: right;">40.49297</td>
<td style="text-align: right;">-74.44613</td>
<td style="text-align: right;">40.49197</td>
<td style="text-align: right;">-74.44413</td>
<td style="text-align: right;">40.49397</td>
<td style="text-align: left;">POINT (-74.44513 40.49297)</td>
</tr>
<tr class="even">
<td style="text-align: left;">Livingston Avenue, New Brunswick, NJ, 08901</td>
<td style="text-align: right;">97.59</td>
<td style="text-align: right;">-74.45771</td>
<td style="text-align: right;">40.48024</td>
<td style="text-align: right;">-74.45871</td>
<td style="text-align: right;">40.47924</td>
<td style="text-align: right;">-74.45671</td>
<td style="text-align: right;">40.48124</td>
<td style="text-align: left;">POINT (-74.45771 40.48024)</td>
</tr>
<tr class="odd">
<td style="text-align: left;">Livingston Avenue, North Brunswick, NJ, 08902</td>
<td style="text-align: right;">95.86</td>
<td style="text-align: right;">-74.47533</td>
<td style="text-align: right;">40.46493</td>
<td style="text-align: right;">-74.47633</td>
<td style="text-align: right;">40.46393</td>
<td style="text-align: right;">-74.47433</td>
<td style="text-align: right;">40.46594</td>
<td style="text-align: left;">POINT (-74.47533 40.46493)</td>
</tr>
<tr class="even">
<td style="text-align: left;">Livingston Avenue, East Brunswick, NJ, 08816</td>
<td style="text-align: right;">95.86</td>
<td style="text-align: right;">-74.44593</td>
<td style="text-align: right;">40.49154</td>
<td style="text-align: right;">-74.44693</td>
<td style="text-align: right;">40.49054</td>
<td style="text-align: right;">-74.44493</td>
<td style="text-align: right;">40.49254</td>
<td style="text-align: left;">POINT (-74.44593 40.49154)</td>
</tr>
</tbody>
</table>

The package also allows you to specify a different coordinate reference
system using the package’s functions. Here we are changing from the
default of EPSG:4326 to a projected one, EPSG:3424.

    geocode_address_candidates("33 Livingston Ave. New Brunswick, NJ", crs = 3424)

<table style="width:100%;">
<colgroup>
<col style="width: 31%" />
<col style="width: 4%" />
<col style="width: 7%" />
<col style="width: 7%" />
<col style="width: 8%" />
<col style="width: 8%" />
<col style="width: 8%" />
<col style="width: 8%" />
<col style="width: 17%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">address</th>
<th style="text-align: right;">score</th>
<th style="text-align: right;">location.x</th>
<th style="text-align: right;">location.y</th>
<th style="text-align: right;">extent.xmin</th>
<th style="text-align: right;">extent.ymin</th>
<th style="text-align: right;">extent.xmax</th>
<th style="text-align: right;">extent.ymax</th>
<th style="text-align: left;">geometry</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;">33 Livingston Avenue, New Brunswick, NJ, 08901</td>
<td style="text-align: right;">100.00</td>
<td style="text-align: right;">507385.6</td>
<td style="text-align: right;">604489.2</td>
<td style="text-align: right;">507107.3</td>
<td style="text-align: right;">604124.7</td>
<td style="text-align: right;">507664.0</td>
<td style="text-align: right;">604853.6</td>
<td style="text-align: left;">POINT (507385.6 604489.2)</td>
</tr>
<tr class="even">
<td style="text-align: left;">Livingston Avenue, New Brunswick, NJ, 08901</td>
<td style="text-align: right;">97.59</td>
<td style="text-align: right;">503889.1</td>
<td style="text-align: right;">599850.6</td>
<td style="text-align: right;">503610.8</td>
<td style="text-align: right;">599486.2</td>
<td style="text-align: right;">504167.5</td>
<td style="text-align: right;">600215.1</td>
<td style="text-align: left;">POINT (503889.1 599850.6)</td>
</tr>
<tr class="odd">
<td style="text-align: left;">Livingston Avenue, North Brunswick, NJ, 08902</td>
<td style="text-align: right;">95.86</td>
<td style="text-align: right;">498988.5</td>
<td style="text-align: right;">594272.3</td>
<td style="text-align: right;">498710.2</td>
<td style="text-align: right;">593908.0</td>
<td style="text-align: right;">499266.8</td>
<td style="text-align: right;">594636.7</td>
<td style="text-align: left;">POINT (498988.5 594272.3)</td>
</tr>
<tr class="even">
<td style="text-align: left;">Livingston Avenue, East Brunswick, NJ, 08816</td>
<td style="text-align: right;">95.86</td>
<td style="text-align: right;">507163.8</td>
<td style="text-align: right;">603966.6</td>
<td style="text-align: right;">506885.4</td>
<td style="text-align: right;">603602.2</td>
<td style="text-align: right;">507442.1</td>
<td style="text-align: right;">604331.1</td>
<td style="text-align: left;">POINT (507163.8 603966.6)</td>
</tr>
</tbody>
</table>

### Batch geocoding

It is possible to batch geocode up to 1000 addresses at once using the
two batch geocoding functions provided by the package.

The `batch_geocode_addresses()` and `batch_geocode_sl()` functions can
batch geocode up to 1000 addresses at a time. The first function expects
multiple columns of data to geocode the address, while the **sl**
version requires an address in single column format.

### Reverse geocoding

Provide a point to get matching addresses:

    reverse_geocode(-74.44513, 40.49297)

    ## njgeo: downloading data

<table style="width:100%;">
<colgroup>
<col style="width: 13%" />
<col style="width: 8%" />
<col style="width: 8%" />
<col style="width: 6%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 6%" />
<col style="width: 7%" />
<col style="width: 30%" />
<col style="width: 9%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Address</th>
<th style="text-align: left;">Neighborhood</th>
<th style="text-align: left;">City</th>
<th style="text-align: left;">Subregion</th>
<th style="text-align: left;">Region</th>
<th style="text-align: left;">Postal</th>
<th style="text-align: left;">PostalExt</th>
<th style="text-align: left;">CountryCode</th>
<th style="text-align: left;">Match_addr</th>
<th style="text-align: left;">Loc_name</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;">33 State Highway 171</td>
<td style="text-align: left;"></td>
<td style="text-align: left;">New Brunswick</td>
<td style="text-align: left;">Middlesex</td>
<td style="text-align: left;">NJ</td>
<td style="text-align: left;">08901</td>
<td style="text-align: left;">1900</td>
<td style="text-align: left;"></td>
<td style="text-align: left;">33 State Highway 171, New Brunswick, NJ, 08901</td>
<td style="text-align: left;">NJ_Geocode_Mul</td>
</tr>
</tbody>
</table>

## Shape and boundary files

You can easily obtain spatial boundary data for use in projects via this
package. All objects are returned as an `{sf}` object and a coordinate
reference system can be specified via arguments to repoject the shape
into a different CRS. I mainly wanted to save the time of always
repeating the same API queries in some of my New Jersey-specific
projects.

### State

    get_state_bounds()

    ## njgeo: downloading data

<table>
<colgroup>
<col style="width: 5%" />
<col style="width: 6%" />
<col style="width: 12%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 5%" />
<col style="width: 24%" />
<col style="width: 8%" />
<col style="width: 8%" />
<col style="width: 19%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: right;">OBJECTID</th>
<th style="text-align: left;">NAME</th>
<th style="text-align: left;">GNIS_NAME</th>
<th style="text-align: left;">GNIS</th>
<th style="text-align: right;">ACRES</th>
<th style="text-align: right;">SQ_MILES</th>
<th style="text-align: left;">GLOBALID</th>
<th style="text-align: right;">SHAPE_Length</th>
<th style="text-align: right;">SHAPE_Area</th>
<th style="text-align: left;">geometry</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: right;">1</td>
<td style="text-align: left;">New Jersey</td>
<td style="text-align: left;">State of New Jersey</td>
<td style="text-align: left;">1779795</td>
<td style="text-align: right;">5549497</td>
<td style="text-align: right;">8671.089</td>
<td style="text-align: left;">{64BFC6D2-D0A8-418C-9E76-ADF18AA40F74}</td>
<td style="text-align: right;">2703088</td>
<td style="text-align: right;">241735115122</td>
<td style="text-align: left;">POLYGON ((-74.67081 41.3463…</td>
</tr>
</tbody>
</table>

### Counties

    get_county_bounds() %>% 
      head()

    ## njgeo: downloading data

<table>
<colgroup>
<col style="width: 1%" />
<col style="width: 4%" />
<col style="width: 7%" />
<col style="width: 1%" />
<col style="width: 8%" />
<col style="width: 2%" />
<col style="width: 3%" />
<col style="width: 2%" />
<col style="width: 3%" />
<col style="width: 3%" />
<col style="width: 3%" />
<col style="width: 3%" />
<col style="width: 3%" />
<col style="width: 3%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 4%" />
<col style="width: 12%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: right;">FID</th>
<th style="text-align: left;">COUNTY</th>
<th style="text-align: left;">COUNTY_LABEL</th>
<th style="text-align: left;">CO</th>
<th style="text-align: left;">GNIS_NAME</th>
<th style="text-align: left;">GNIS</th>
<th style="text-align: left;">FIPSSTCO</th>
<th style="text-align: left;">FIPSCO</th>
<th style="text-align: right;">ACRES</th>
<th style="text-align: right;">SQ_MILES</th>
<th style="text-align: right;">POP2010</th>
<th style="text-align: right;">POP2000</th>
<th style="text-align: right;">POP1990</th>
<th style="text-align: right;">POP1980</th>
<th style="text-align: right;">POPDEN2010</th>
<th style="text-align: right;">POPDEN2000</th>
<th style="text-align: right;">POPDEN1990</th>
<th style="text-align: right;">POPDEN1980</th>
<th style="text-align: left;">REGION</th>
<th style="text-align: right;">SHAPE_Length</th>
<th style="text-align: right;">SHAPE_Area</th>
<th style="text-align: left;">geometry</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: right;">1</td>
<td style="text-align: left;">ATLANTIC</td>
<td style="text-align: left;">Atlantic County</td>
<td style="text-align: left;">ATL</td>
<td style="text-align: left;">County of Atlantic</td>
<td style="text-align: left;">882270</td>
<td style="text-align: left;">34001</td>
<td style="text-align: left;">1</td>
<td style="text-align: right;">390815.4</td>
<td style="text-align: right;">610.6491</td>
<td style="text-align: right;">274549</td>
<td style="text-align: right;">252552</td>
<td style="text-align: right;">275372</td>
<td style="text-align: right;">204615</td>
<td style="text-align: right;">450</td>
<td style="text-align: right;">414</td>
<td style="text-align: right;">451</td>
<td style="text-align: right;">335</td>
<td style="text-align: left;">COASTAL</td>
<td style="text-align: right;">2.054478</td>
<td style="text-align: right;">0.1655950</td>
<td style="text-align: left;">MULTIPOLYGON (((-74.67437 3…</td>
</tr>
<tr class="even">
<td style="text-align: right;">2</td>
<td style="text-align: left;">BERGEN</td>
<td style="text-align: left;">Bergen County</td>
<td style="text-align: left;">BER</td>
<td style="text-align: left;">County of Bergen</td>
<td style="text-align: left;">882271</td>
<td style="text-align: left;">34003</td>
<td style="text-align: left;">3</td>
<td style="text-align: right;">153490.3</td>
<td style="text-align: right;">239.8286</td>
<td style="text-align: right;">905116</td>
<td style="text-align: right;">884118</td>
<td style="text-align: right;">829592</td>
<td style="text-align: right;">849843</td>
<td style="text-align: right;">3774</td>
<td style="text-align: right;">3686</td>
<td style="text-align: right;">3459</td>
<td style="text-align: right;">3544</td>
<td style="text-align: left;">NORTHEASTERN</td>
<td style="text-align: right;">1.393879</td>
<td style="text-align: right;">0.0664519</td>
<td style="text-align: left;">MULTIPOLYGON (((-73.90569 4…</td>
</tr>
<tr class="odd">
<td style="text-align: right;">3</td>
<td style="text-align: left;">BURLINGTON</td>
<td style="text-align: left;">Burlington County</td>
<td style="text-align: left;">BUR</td>
<td style="text-align: left;">County of Burlington</td>
<td style="text-align: left;">882272</td>
<td style="text-align: left;">34005</td>
<td style="text-align: left;">5</td>
<td style="text-align: right;">524903.3</td>
<td style="text-align: right;">820.1615</td>
<td style="text-align: right;">448734</td>
<td style="text-align: right;">423394</td>
<td style="text-align: right;">395066</td>
<td style="text-align: right;">362542</td>
<td style="text-align: right;">547</td>
<td style="text-align: right;">516</td>
<td style="text-align: right;">482</td>
<td style="text-align: right;">442</td>
<td style="text-align: left;">SOUTHERN</td>
<td style="text-align: right;">2.439422</td>
<td style="text-align: right;">0.2236824</td>
<td style="text-align: left;">MULTIPOLYGON (((-74.69864 4…</td>
</tr>
<tr class="even">
<td style="text-align: right;">4</td>
<td style="text-align: left;">CAMDEN</td>
<td style="text-align: left;">Camden County</td>
<td style="text-align: left;">CAM</td>
<td style="text-align: left;">County of Camden</td>
<td style="text-align: left;">882273</td>
<td style="text-align: left;">34007</td>
<td style="text-align: left;">7</td>
<td style="text-align: right;">145598.5</td>
<td style="text-align: right;">227.4976</td>
<td style="text-align: right;">513657</td>
<td style="text-align: right;">508932</td>
<td style="text-align: right;">532498</td>
<td style="text-align: right;">471650</td>
<td style="text-align: right;">2258</td>
<td style="text-align: right;">2237</td>
<td style="text-align: right;">2341</td>
<td style="text-align: right;">2073</td>
<td style="text-align: left;">SOUTHERN</td>
<td style="text-align: right;">1.553964</td>
<td style="text-align: right;">0.0619788</td>
<td style="text-align: left;">MULTIPOLYGON (((-75.03314 3…</td>
</tr>
<tr class="odd">
<td style="text-align: right;">5</td>
<td style="text-align: left;">CAPE MAY</td>
<td style="text-align: left;">Cape May County</td>
<td style="text-align: left;">CAP</td>
<td style="text-align: left;">County of Cape May</td>
<td style="text-align: left;">882274</td>
<td style="text-align: left;">34009</td>
<td style="text-align: left;">9</td>
<td style="text-align: right;">183126.6</td>
<td style="text-align: right;">286.1353</td>
<td style="text-align: right;">97265</td>
<td style="text-align: right;">102326</td>
<td style="text-align: right;">95089</td>
<td style="text-align: right;">82266</td>
<td style="text-align: right;">340</td>
<td style="text-align: right;">358</td>
<td style="text-align: right;">332</td>
<td style="text-align: right;">288</td>
<td style="text-align: left;">COASTAL</td>
<td style="text-align: right;">1.589942</td>
<td style="text-align: right;">0.0772352</td>
<td style="text-align: left;">MULTIPOLYGON (((-74.85962 3…</td>
</tr>
<tr class="even">
<td style="text-align: right;">6</td>
<td style="text-align: left;">CUMBERLAND</td>
<td style="text-align: left;">Cumberland County</td>
<td style="text-align: left;">CUM</td>
<td style="text-align: left;">County of Cumberland</td>
<td style="text-align: left;">882275</td>
<td style="text-align: left;">34011</td>
<td style="text-align: left;">11</td>
<td style="text-align: right;">321150.3</td>
<td style="text-align: right;">501.7974</td>
<td style="text-align: right;">156898</td>
<td style="text-align: right;">146438</td>
<td style="text-align: right;">138053</td>
<td style="text-align: right;">132866</td>
<td style="text-align: right;">313</td>
<td style="text-align: right;">292</td>
<td style="text-align: right;">275</td>
<td style="text-align: right;">265</td>
<td style="text-align: left;">SOUTHERN</td>
<td style="text-align: right;">2.213656</td>
<td style="text-align: right;">0.1358676</td>
<td style="text-align: left;">MULTIPOLYGON (((-75.06186 3…</td>
</tr>
</tbody>
</table>

### Municipalities

    get_muni_bounds() %>% 
      head()

    ## njgeo: downloading data

<table style="width:100%;">
<colgroup>
<col style="width: 2%" />
<col style="width: 6%" />
<col style="width: 2%" />
<col style="width: 7%" />
<col style="width: 2%" />
<col style="width: 7%" />
<col style="width: 8%" />
<col style="width: 2%" />
<col style="width: 1%" />
<col style="width: 2%" />
<col style="width: 3%" />
<col style="width: 3%" />
<col style="width: 3%" />
<col style="width: 2%" />
<col style="width: 2%" />
<col style="width: 2%" />
<col style="width: 2%" />
<col style="width: 3%" />
<col style="width: 3%" />
<col style="width: 3%" />
<col style="width: 3%" />
<col style="width: 4%" />
<col style="width: 3%" />
<col style="width: 10%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: right;">OBJECTID</th>
<th style="text-align: left;">MUN</th>
<th style="text-align: left;">COUNTY</th>
<th style="text-align: left;">MUN_LABEL</th>
<th style="text-align: left;">MUN_TYPE</th>
<th style="text-align: left;">NAME</th>
<th style="text-align: left;">GNIS_NAME</th>
<th style="text-align: left;">GNIS</th>
<th style="text-align: left;">SSN</th>
<th style="text-align: left;">MUN_CODE</th>
<th style="text-align: left;">CENSUS2010</th>
<th style="text-align: right;">ACRES</th>
<th style="text-align: right;">SQ_MILES</th>
<th style="text-align: right;">POP2010</th>
<th style="text-align: right;">POP2000</th>
<th style="text-align: right;">POP1990</th>
<th style="text-align: right;">POP1980</th>
<th style="text-align: right;">POPDEN2010</th>
<th style="text-align: right;">POPDEN2000</th>
<th style="text-align: right;">POPDEN1990</th>
<th style="text-align: right;">POPDEN1980</th>
<th style="text-align: right;">SHAPE_Length</th>
<th style="text-align: right;">SHAPE_Area</th>
<th style="text-align: left;">geometry</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: right;">1</td>
<td style="text-align: left;">CAPE MAY POINT BORO</td>
<td style="text-align: left;">CAPE MAY</td>
<td style="text-align: left;">Cape May Point Borough</td>
<td style="text-align: left;">Borough</td>
<td style="text-align: left;">Cape May Point Borough</td>
<td style="text-align: left;">Borough of Cape May Point</td>
<td style="text-align: left;">885179</td>
<td style="text-align: left;">0503</td>
<td style="text-align: left;">0503</td>
<td style="text-align: left;">3400910330</td>
<td style="text-align: right;">192.0512</td>
<td style="text-align: right;">0.3000799</td>
<td style="text-align: right;">291</td>
<td style="text-align: right;">241</td>
<td style="text-align: right;">248</td>
<td style="text-align: right;">255</td>
<td style="text-align: right;">970</td>
<td style="text-align: right;">803</td>
<td style="text-align: right;">826</td>
<td style="text-align: right;">850</td>
<td style="text-align: right;">0.0415470</td>
<td style="text-align: right;">0.0000808</td>
<td style="text-align: left;">MULTIPOLYGON (((-74.95983 3…</td>
</tr>
<tr class="even">
<td style="text-align: right;">2</td>
<td style="text-align: left;">WEST CAPE MAY BORO</td>
<td style="text-align: left;">CAPE MAY</td>
<td style="text-align: left;">West Cape May Borough</td>
<td style="text-align: left;">Borough</td>
<td style="text-align: left;">West Cape May Borough</td>
<td style="text-align: left;">Borough of West Cape May</td>
<td style="text-align: left;">885435</td>
<td style="text-align: left;">0512</td>
<td style="text-align: left;">0512</td>
<td style="text-align: left;">3400978530</td>
<td style="text-align: right;">756.5388</td>
<td style="text-align: right;">1.1820919</td>
<td style="text-align: right;">1024</td>
<td style="text-align: right;">1095</td>
<td style="text-align: right;">1026</td>
<td style="text-align: right;">1091</td>
<td style="text-align: right;">866</td>
<td style="text-align: right;">926</td>
<td style="text-align: right;">868</td>
<td style="text-align: right;">923</td>
<td style="text-align: right;">0.0876926</td>
<td style="text-align: right;">0.0003182</td>
<td style="text-align: left;">MULTIPOLYGON (((-74.92585 3…</td>
</tr>
<tr class="odd">
<td style="text-align: right;">3</td>
<td style="text-align: left;">CAPE MAY CITY</td>
<td style="text-align: left;">CAPE MAY</td>
<td style="text-align: left;">Cape May City</td>
<td style="text-align: left;">City</td>
<td style="text-align: left;">Cape May</td>
<td style="text-align: left;">City of Cape May</td>
<td style="text-align: left;">885178</td>
<td style="text-align: left;">0502</td>
<td style="text-align: left;">0502</td>
<td style="text-align: left;">3400910270</td>
<td style="text-align: right;">1844.8312</td>
<td style="text-align: right;">2.8825488</td>
<td style="text-align: right;">3607</td>
<td style="text-align: right;">4034</td>
<td style="text-align: right;">4668</td>
<td style="text-align: right;">4853</td>
<td style="text-align: right;">1251</td>
<td style="text-align: right;">1399</td>
<td style="text-align: right;">1619</td>
<td style="text-align: right;">1684</td>
<td style="text-align: right;">0.2031847</td>
<td style="text-align: right;">0.0007758</td>
<td style="text-align: left;">MULTIPOLYGON (((-74.8765 38…</td>
</tr>
<tr class="even">
<td style="text-align: right;">4</td>
<td style="text-align: left;">WILDWOOD CREST BORO</td>
<td style="text-align: left;">CAPE MAY</td>
<td style="text-align: left;">Wildwood Crest Borough</td>
<td style="text-align: left;">Borough</td>
<td style="text-align: left;">Wildwood Crest Borough</td>
<td style="text-align: left;">Borough of Wildwood Crest</td>
<td style="text-align: left;">885445</td>
<td style="text-align: left;">0515</td>
<td style="text-align: left;">0515</td>
<td style="text-align: left;">3400981200</td>
<td style="text-align: right;">947.7268</td>
<td style="text-align: right;">1.4808231</td>
<td style="text-align: right;">3270</td>
<td style="text-align: right;">3980</td>
<td style="text-align: right;">3631</td>
<td style="text-align: right;">4149</td>
<td style="text-align: right;">2208</td>
<td style="text-align: right;">2688</td>
<td style="text-align: right;">2452</td>
<td style="text-align: right;">2802</td>
<td style="text-align: right;">0.1013248</td>
<td style="text-align: right;">0.0003987</td>
<td style="text-align: left;">MULTIPOLYGON (((-74.83331 3…</td>
</tr>
<tr class="odd">
<td style="text-align: right;">5</td>
<td style="text-align: left;">WEST WILDWOOD BORO</td>
<td style="text-align: left;">CAPE MAY</td>
<td style="text-align: left;">West Wildwood Borough</td>
<td style="text-align: left;">Borough</td>
<td style="text-align: left;">West Wildwood Borough</td>
<td style="text-align: left;">Borough of West Wildwood</td>
<td style="text-align: left;">885441</td>
<td style="text-align: left;">0513</td>
<td style="text-align: left;">0513</td>
<td style="text-align: left;">3400980210</td>
<td style="text-align: right;">232.8413</td>
<td style="text-align: right;">0.3638145</td>
<td style="text-align: right;">603</td>
<td style="text-align: right;">448</td>
<td style="text-align: right;">453</td>
<td style="text-align: right;">360</td>
<td style="text-align: right;">1657</td>
<td style="text-align: right;">1231</td>
<td style="text-align: right;">1245</td>
<td style="text-align: right;">990</td>
<td style="text-align: right;">0.0520154</td>
<td style="text-align: right;">0.0000980</td>
<td style="text-align: left;">MULTIPOLYGON (((-74.8189 39…</td>
</tr>
<tr class="even">
<td style="text-align: right;">6</td>
<td style="text-align: left;">NORTH WILDWOOD CITY</td>
<td style="text-align: left;">CAPE MAY</td>
<td style="text-align: left;">North Wildwood City</td>
<td style="text-align: left;">City</td>
<td style="text-align: left;">North Wildwood</td>
<td style="text-align: left;">City of North Wildwood</td>
<td style="text-align: left;">885328</td>
<td style="text-align: left;">0507</td>
<td style="text-align: left;">0507</td>
<td style="text-align: left;">3400953490</td>
<td style="text-align: right;">1593.6241</td>
<td style="text-align: right;">2.4900376</td>
<td style="text-align: right;">4041</td>
<td style="text-align: right;">4935</td>
<td style="text-align: right;">5017</td>
<td style="text-align: right;">4714</td>
<td style="text-align: right;">1623</td>
<td style="text-align: right;">1982</td>
<td style="text-align: right;">2015</td>
<td style="text-align: right;">1893</td>
<td style="text-align: right;">0.1403985</td>
<td style="text-align: right;">0.0006708</td>
<td style="text-align: left;">MULTIPOLYGON (((-74.7797 39…</td>
</tr>
</tbody>
</table>
