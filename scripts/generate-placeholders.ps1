# Create images directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "images"

# Define ImageMagick path
$magick = "C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe"

# Generate placeholder images
& $magick -size 600x600 xc:#f0f0f0 `
-draw "circle 300,300 300,100" `
-draw "circle 300,250 300,200" `
"images/placeholder-profile.jpg"

& $magick -size 800x450 xc:#f0f0f0 `
-draw "rectangle 100,100 700,350" `
"images/placeholder-project.jpg"

& $magick -size 500x500 xc:#f0f0f0 `
-draw "circle 250,250 250,100" `
"images/placeholder-album.jpg"

& $magick -size 150x150 xc:transparent `
-fill "#2d3436" -draw "text 30,85 'LOGO'" `
"images/logo.png"

# Create a copy as generic placeholder
Copy-Item "images/placeholder-profile.jpg" -Destination "images/placeholder.jpg"

& $magick -size 800x450 xc:#f0f0f0 `
-draw "rectangle 100,100 700,350" `
-draw "text 300,225 'Project 1'" `
"images/project1.jpg"

& $magick -size 800x450 xc:#f0f0f0 `
-draw "rectangle 100,100 700,350" `
-draw "text 300,225 'Project 2'" `
"images/project2.jpg"

& $magick -size 800x450 xc:#f0f0f0 `
-draw "rectangle 100,100 700,350" `
-draw "text 300,225 'Project 3'" `
"images/project3.jpg"

Write-Host "Placeholder images generated successfully!"


