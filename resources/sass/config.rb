# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework automatically.
load File.join('/', 'Developer', 'SenchaTouch', 'latest', 'resources', 'themes')

# Compass configurations
relative_assets = true
sass_path = dir
css_path = File.join(dir, "..", "css")

# Require any additional compass plugins here.
images_dir = "../imgs"
#images_path = File.join(dir)
output_style = :compressed
environment = :production