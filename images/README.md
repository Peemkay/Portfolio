# Image Assets Required

## Profile Image (Required)
profile.jpg
- Location: /images/profile.jpg
- Dimensions: 600x600px
- Format: JPEG
- Max file size: 200KB
- Requirements:
  - Professional headshot
  - Square format
  - Clean background
  - Well-lit face
  - Centered composition

## Placeholder Images
placeholder-profile.jpg
- Location: /images/placeholder-profile.jpg
- Dimensions: 600x600px
- Format: JPEG
- Used as fallback when main images fail to load

## Image Optimization Steps
1. Resize to exact dimensions (600x600px for profile)
2. Optimize using ImageOptim or similar tool
3. Verify file size is under maximum limit
4. Test in both light and dark modes
5. Verify loading performance

## Quick Fix Steps
1. Place your profile photo in /images/profile.jpg
2. Ensure it meets the size requirements (600x600px)
3. Optimize the image to be under 200KB
4. Clear browser cache and refresh page
5. Verify image loads correctly

## Hero Section
- hero-bg.jpg (1920x1080px)
  - Dark, professional photo showing music studio or coding setup
  - Alternatively, abstract background with music/tech elements
  - Should be high quality but optimized for web (max 500KB)

## Music Section
- album1.jpg (500x500px)
  - "First Album" artwork
- album2.jpg (500x500px)
  - "Second Album" artwork
- mixtape1.jpg (500x500px)
  - "Mixtape 1" artwork
- mixtape2.jpg (500x500px)
  - "Mixtape 2" artwork
- mixtape3.jpg (500x500px)
  - "Mixtape 3" artwork

## Tech Section
- project1.jpg (800x450px)
  - Screenshot of first project UI
- project2.jpg (800x450px)
  - Screenshot of second project UI
- project3.jpg (800x450px)
  - Screenshot of third project UI

## Image Specifications
- All images should be optimized for web
- Use .jpg for photos, .png for screenshots with text
- Maximum file size:
  - Hero background: 500KB
  - Profile photo: 200KB
  - Album artwork: 200KB each
  - Project screenshots: 300KB each

## Recommended Tools
- Image editing: Photoshop, GIMP, or Figma
- Image optimization: TinyPNG or ImageOptim
- Screenshot tools: ShareX or built-in OS tools

## Logo Files
- logo.png (Original logo file)
- favicon.ico (16x16, 32x32, 48x48px versions)
- logo-white.png (White version for dark backgrounds)
- logo-dark.png (Dark version for light backgrounds)

## Logo Usage
- Header Navigation: 150px height max
- Favicon: ICO format with multiple sizes
- Mobile: Responsive scaling

# Required Placeholder Images

Create these files in the images directory:

1. placeholder-profile.jpg (600x600px)
2. placeholder-project.jpg (800x450px)
3. placeholder-album.jpg (500x500px)
4. logo.png (150x150px)

Steps to create placeholders:
1. Create directory structure:
   mkdir -p images

2. Generate placeholder images using ImageMagick:

   # Profile placeholder
   convert -size 600x600 xc:#f0f0f0 \
   -draw "circle 300,300 300,100" \
   -draw "circle 300,250 300,200" \
   images/placeholder-profile.jpg

   # Project placeholder
   convert -size 800x450 xc:#f0f0f0 \
   -draw "rectangle 100,100 700,350" \
   images/placeholder-project.jpg

   # Album placeholder
   convert -size 500x500 xc:#f0f0f0 \
   -draw "circle 250,250 250,100" \
   images/placeholder-album.jpg

   # Logo placeholder
   convert -size 150x150 xc:transparent \
   -fill "#2d3436" -draw "text 30,85 'LOGO'" \
   images/logo.png

Or use any image editing software to create these placeholders.


