+++
# Hero widget.
widget = "hero"  # See https://sourcethemes.com/academic/docs/page-builder/
headless = true  # This file represents a page section.
active = true  # Activate this widget? true/false
weight = 10  # Order that this section will appear.

title = "3D Printing Masks for COVID-19"

# Hero image (optional). Enter filename of an image in the `static/img/` folder.
hero_media = "3dprinter.jpg"

[design.background]
  # Apply a background color, gradient, or image.
  #   Uncomment (by removing `#`) an option to apply it.
  #   Choose a light or dark text color by setting `text_color_light`.
  #   Any HTML color name or Hex value is valid.

  # Background color.
  # color = "navy"
  
  # Background gradient.
  gradient_start = "#4bb4e3"
  gradient_end = "#2b94c3"
  
  # Background image.
  # image = ""  # Name of image in `static/img/`.
  # image_darken = 0.6  # Darken the image? Range 0-1 where 0 is transparent and 1 is opaque.
  # image_size = "cover"  #  Options are `cover` (default), `contain`, or `actual` size.
  # image_position = "center"  # Options include `left`, `center` (default), or `right`.
  # image_parallax = true  # Use a fun parallax-like fixed background effect? true/false
  
  # Text color (true=light or false=dark).
  text_color_light = true

# Call to action links (optional).
#   Display link(s) by specifying a URL and label below. Icon is optional for `[cta]`.
#   Remove a link/note by deleting a cta/note block.
[cta]
  url = "https://docs.google.com/forms/d/e/1FAIpQLScH7MKM1nGlYAcnBevILOQtV1Rwsy1nxUK4wJurB9h-du8HfQ/viewform"
  label = "Request a Mask or Face Shield"
  icon_pack = "fas"
  icon = "user-nurse"
  
[cta_alt]
  url = "https://www.paypal.me/GavinRozzi"
  label = "Or donate so I can keep making more"

# Note. An optional note to show underneath the links.
[cta_note]
  label = 'Masks are NOT for sale at this time and are being given to healthcare workers and first responders on the frontlines. Priority will be given to ICU / emergency departments and hospitals.'
+++

I am currently [using my 3D printer to make masks and PPE](https://stockton.edu/news/2020/data-science-major-prints-protective-masks-for-health-care-workers.html) for healthcare workers combating the COVID-19 pandemic in New Jersey.
