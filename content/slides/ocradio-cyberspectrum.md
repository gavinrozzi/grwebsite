---
slides:
  theme: moon
title: Reimagining the police scanner in the era of the SDR
---
## 📶

## Reimagining the police scanner in the era of the SDR

Taking scanning to the next level using distributed RTLSDR receivers & open source software 

### Presented by Gavin Rozzi

Cyberspectrum #23 @ DEF CON 2018

August 9th, 2018

---
# SDR has the potential 
## to expand public knowledge while reducing cost & complexity
---
# The problem with hardware scanners
---
## Hardware scanners are expensive

Digital scanners especially those capable of newer digital protocols are pricey.

{{% fragment %}}## P25 Phase II scanner - $400{{% /fragment %}}
{{% fragment %}}## RTLSDR dongle - $25{{% /fragment %}}

---

## Hardware scanners have limitations
Traditional scanners can only receive one transmission at a time. But large trunked systems could have activity on multiple channels at once, forcing users to miss out.

---

## For many, new digital scanners are out of reach
As agencies continue to adopt radios that use digital modulation. Many scanner enthusiasts are unable or unwilling to obtaing digital scanners due to cost and complexity.

---

## Live feeds aren't much better
They compensate for some shortcomings and allow portability, but are still limited by the constraints
of hardware scanners.

---

## Enter OC Radio Live
Using SDR & open source technologies, we can make scanning easier and more user-friendly.
[OC Radio Live](https://ocradio.live/) is a website that I created to use SDR to stream transmissions from local radio systems.
![Screenshot](https://www.gavinrozzi.com/img/ocrl-new-channels.jpeg)
---

## How scanning can be better with SDR
OC Radio Live features:

 - Time shifting, so simultaneous scanner calls on different channels are saved.
 - Multiple receiving sites can allow wide area coverage
 - Transmissions are stored and archived by talkgroup & scanlist
 - Unlike traditional scanner feed archives, no silence is recorded, only activity on channels.
 
---
## How scanning can be better with SDR
Thanks to [trunk-recorder](https://github.com/robotastic/trunk-recorder) we can record:

- Conventional analog repeater / simplex channels
- Motorola analog trunked systems
- P25 Phase 1 & 2 digital trunking systems

---

## Ocean County, NJ's Radio Systems
These capabilities allow us to record the following types of systems using the site:
{{% fragment %}}### Aging 500 MHz Motorola Type II TRS{{% /fragment %}}
{{% fragment %}}### New State & County 700 MHz P25 Phase II systems{{% /fragment %}}
{{% fragment %}}### Analog VHF and UHF conventional channels{{% /fragment %}}

---

## More Choices
Hardware scanners only offer a simple lockout and various banks of channels. 
OC Radio Live has data on invididual channels, entire radio systems and custom scan lists for regions and types of radio traffic.

![Scan lists on the site](/img/slide-images/ocradio/scanlists.JPG)

---

## Our Receiving Sites
Toms River, NJ (700, 460 and 155 MHz) (outside)
![Toms River 700 receiving site](/img/slide-images/ocradio/tr-700site.jpg)

---

## Our Receiving Sites
Lacey, NJ (500 MHz) (inside)
![Lacey Township receiving site](/img/slide-images/ocradio/IMG_1570.jpg)

---

# The open-source software powering the site

---

## The backend
- trunk-recorder by [Luke Berndt](https://github.com/robotastic/trunk-recorder)
- Radio transmissions are saved to an Amazon S3 bucket
- Desktop with powered USB hubs at receiving site 1
- 2U server along with an Ubuntu desktop with 4 SDRs at receiving site 2

---

## The backend
trunk-recorder uses JSON syntax for defining systems and SDRs.
Some examples of the systems I defined are on [Github](https://github.com/gavinrozzi/ocradio-configs)
![A screenshot of a config file](img/slide-images/ocradio/configfile.JPG)

---

## The backend
Scanning the [NJICS 700 MHz system](https://www.radioreference.com/apps/db/?sid=7021)
![trunk-recorder uploading transmissions](img/slide-images/ocradio/recorderoutput.JPG)

---

## The frontend
The frontend is hosted on a simple Ubuntu 16.04 VPS on a cloud hosting provider.

- Django web framework
- Nginx as a reverse proxy to daphne
- trunk-player handles the scanning interface

---
## Bringing it all together
{{% fragment %}}* trunk-recorder reads in the JSON configuration file for the system(s) and allocates recorders on
multiple RF channels within the SDR's bandwidth.{{% /fragment %}}

{{% fragment %}}* A bash script passes the transmissions along with JSON metadata to the frontend server, where it is written to a database.{{% /fragment %}}


{{% fragment %}}* The transmissions are uploaded to Amazon S3 for storage and deleted from the frontend.{{% /fragment %}}

{{% fragment %}}* Users can play live transmissions & access archives on the frontend website.{{% /fragment %}}

---

## A REST API Endpoint for every radio system
Example request:

curl https://ocradio.live/api_v1/scan/default/?format=json

![A sample API response](/img/slide-images/ocradio/api.JPG)

---

## Conclusion
SDR can break down cost & complexity barriers to monitoring public safety radio systems.
SDR combined with web services can allow receiving setups previously not possible with past hardware radios.

---

## Site demonstration + Q & A
