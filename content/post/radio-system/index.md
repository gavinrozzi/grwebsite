---
title: Building a digital, interoperable radio system for Lacey Township
date: 2020-02-15
math: false
diagram: false
image:
  placement: 3
  preview_only: false
---

### When Hurricane Sandy struck in 2012, power, internet and cell phone service were knocked out for many across the Jersey Shore.

I first obtained by amateur radio license from the FCC after passing the technician exam the summer prior to Sandy hitting, earning the callsign KD2CXZ. It proved to be a worthwhile endeavor, as during and after the storm my home was without power and cell phones lost connectivity. For me, the only way to obtain and relay information or hear what was going on in the community was via the single handheld radio I owned at the time.

 Radio systems operated by groups like JSARS, W2NJR and others proved to be a very valuable resource during the storm as they allowed individuals and groups to send and receive important information about flooding, property damage and safety. Shelters, hospitals and even severe weather spotters have also historically relied on communications support provided by amateur radio operators in disasters.

I've volunteered with several groups related to amateur radio over the years. For the past year I have been working with a group in Lacey to build a radio system to serve our own community, and after a lot of hard work, I'm pleased to share that our new system is now live and open for use by any properly licensed amateur radio operator.

## How it works
Most radio systems that are operational in our area were built prior to the last decade and have relied on analog FM modulation. So too have most of the systems deployed by the amateur radio community, although there are more digital systems coming online in Ocean County. The [NJ-TRBO network](http://www.n2jti.net/), among others have successfully deployed linked DMR repeaters throughout the state, and I suspect more will be coming online in the near future.

### Adding DMR and other modes to an analog repeater

Our group obtained a used Motorola MTR2000 repeater. The MTR2000 - like others created in its era - was designed to operate solely in analog mode. Motorola makes other commercial repeaters that can handle digital voice modes, including DMR and P25, but they are an order of magnitude more expensive.

![MTR2000](/img/MTR2000.jpg)

Programming the repeater required taking a trip back in time to 2002, as I had to create a virtual machine running a copy of Windows XP. This was necessary because the Motorola Radio Service Software (RSS) would not run on a modern version of Windows. Additional steps to get this working included properly tuning a UHF duplexer for our frequency pair, mounting the antenna at our site in Forked River and running high-quality cable to minimize loss. After testing the machine in analog-only mode, we were ready to deploy digital capabilities.

### The STM-32-DVM-MTR2K

We chose to utilize the [STM-32-DVM-MTR2K](http://ks-dmr.net/2019/04/11/introducing-the-stm32-dvm-mtr2k/) board to provide digital voice support to the repeater. This board builds upon prior open hardware and work of the MMDVM and Raspberry Pi platforms in order to provide a "plug-and-play" solution that will work for MTR2000 repeaters. We've tried other MMDVM boards and didn't have much success. This board is by far the easiest way to convert an analog repeater into a multi-mode digital system.

![MTR2000](/img/stm32.jpg)

The format of the STM-32-DVM-MTR2K is attractive because it is designed to be directly inserted into one of the 3 option card slots of the device and is fully self-contained. A NanoPi Neo is soldered to the board which provides the computing necessary to run the system and the SD card can be swapped out [to run other software like Pi-star.](http://ks-dmr.net/2020/01/05/configuring-pi-star-for-the-stm32-dvm-mtr2k/)

This particular revision of the board also included an additional circuit that emulates the "Wildcard" functionality of proprietary option cards sold by Motorola. [That means that this repeater can be configured to play nice with both analog and digital on the same machine.](http://ks-dmr.net/2019/04/30/mtr2000-and-stm32-dvm-mtr2k-analog-digital-playing-nice-together/) This is a very big advantage of this platform, as most DMR repeaters are usually only configured to handle digital, and nothing else.

## Next steps

Now that the system is finally in a working state, we are going to look for other ways to tweak it and expand further, including exploring the possibility of linking with other systems or introducing analog simulcast capabilities.

For now, the system is open for any licensed amateur radio operator to use. The output frequency is 446.145 MHz, input -5 MHz, color code 1, timeslot 1, talkgroup 9 (local). Additional talkgroups will be added in the future. We would very much like to hear signal reports from people in the greater Ocean County community so we can get an idea of the coverage area.

At the time of this writing, analog mode currently does not work. Only a DMR signal will be repeated until we complete additional programming work.

## Why DMR?

We are often asked why we chose to go with DMR as our preferred choice of digital modulation. I believe that DMR is the best choice for amateur radio digital voice communications because it is based on an open standard, not predominantly controlled by one manufacturer and of the digital modes it is the most widely available at the lowest cost. 

D-STAR, NXDN and Yaesu System Fusion are both comparable modes that are supported by MMDVM boards, but they are heavily tied to ICOM and Yaesu respectively. We are never going to see sub-$100 radios for these two standards, yet DMR radios manufactured in China continue to drop in price and are easily found in websites like Amazon or eBay.

Secondly, I am partial to DMR because it is based upon TDMA technology. That means that 2 separate conversations can be occuring within both timeslots, utilizing the same bandwidth and hardware of the analog repeater. It's like getting another repeater for free. 

Of course, critics of amateur radio digital voice operation will be quick to point out that DMR - like other protocols including P25 and D-STAR etc. - is still reliant on the proprietary AMBE vocoder, which is itself still encumbered by the patents held by DVSI, Inc. This is the case because AMBE has become entrenched as the most commonly used vocoder in digital radio applications. Perhaps there will be future development in this area as open-source codecs, such as Codec2 mature further, as some of the intial results of that project's work have been promising. That's a discussion for another day.

### Acknowledgments

We would like to thank Jim Bangert, KB2UNK, John DePoto, N2LD and Bob Murdock, WX2NJ and many others for their support, hard work and assistance in making this project a success.
 