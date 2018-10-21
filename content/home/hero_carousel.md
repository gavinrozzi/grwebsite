+++
# Hero Carousel widget.
widget = "hero_carousel"
active = true
date = 2017-10-15T00:00:00

# Order that this section will appear in.
weight = 1

# Slide interval.
# Use `false` to disable animation or enter a time in ms, e.g. `5000` (5s).
interval = false

# Minimum slide height.
# Specify a height to ensure a consistent height for each slide.
height = "300px"

# Slides.
# Duplicate an `[[item]]` block to add more slides.
[[item]]
  title = "Welcome"
  content = "Thank you for visiting Gavin Rozzi's official website!"
  align = "center"  # Choose `center`, `left`, or `right`.

  # Overlay a color or image (optional).
  #   Deactivate an option by commenting out the line, prefixing it with `#`.
  overlay_color = "#666"  # An HTML color value.
  overlay_img = "gavin-tr.JPG"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.5  # Darken the image. Value in range 0-1.

  # Call to action button (optional).
  #   Activate the button by specifying a URL and button label below.
  #   Deactivate by commenting out parameters, prefixing lines with `#`.
  cta_label = "Contact Gavin"
  cta_url = "/#contact"
  cta_icon_pack = "fas"
  cta_icon = "comment"

[[item]]
  title = "Simplifying N.J. public records"
  content = "Watch Gavin's webinar about how [OPRAmachine](/project/opramachine) is making the research process easier."
  align = "center"

  overlay_color = "#555"  # An HTML color value.
  overlay_img = "om-background.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.5  # Darken the image. Value in range 0-1.
  cta_label = "Watch Webinar"
  cta_url = "/talk/montclair/"
  cta_icon_pack = "fas"
  cta_icon = "play"
[[item]]
  title = "'You have to read Rozzi'"
  content = "Gavin Rozzi named to InsiderNJ's *Insider 100* Media List"
  align = "left"
  cta_label = "Read more about what they said"
  cta_url = "/post/insider-100/"
  cta_icon_pack = "fas"
  cta_icon = "award"
  overlay_color = "#333"  # An HTML color value.
  overlay_img = "insider100.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.5  # Darken the image. Value in range 0-1.

+++