#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p images

# Generate placeholder images
convert -size 600x600 xc:#f0f0f0 \
-draw "circle 300,300 300,100" \
-draw "circle 300,250 300,200" \
images/placeholder-profile.jpg

convert -size 800x450 xc:#f0f0f0 \
-draw "rectangle 100,100 700,350" \
images/placeholder-project.jpg

convert -size 500x500 xc:#f0f0f0 \
-draw "circle 250,250 250,100" \
images/placeholder-album.jpg

convert -size 150x150 xc:transparent \
-fill "#2d3436" -draw "text 30,85 'LOGO'" \
images/logo.png

# Create a copy as generic placeholder
cp images/placeholder-profile.jpg images/placeholder.jpg

echo "Placeholder images generated successfully!"
