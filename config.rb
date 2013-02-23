# Load the zurb foundation plugin
require 'zurb-foundation'


# Set this to the root of your project when deployed:
http_path = "/"
project_path = File.dirname(__FILE__)
css_dir = "output/assets/styles"
sass_dir = "content/assets/styles"
images_dir = "output/assets/images"
javascripts_dir = "output/assets/scripts"


output_style = :expanded


sass_options = {
  :syntax => :scss
}

