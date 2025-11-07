# Public Assets

This directory contains static assets served at the root URL.

## Required Assets

### Images

- `logo.svg` ✅ - Main logo (already exists)
- `favicon.ico` ⚠️ - Browser favicon (create from favicon.svg)
- `apple-touch-icon.png` ⚠️ - iOS home screen icon (180x180px)
- `og-image.jpg` ⚠️ - Open Graph image for social sharing (1200x630px)

### Configuration

- `manifest.json` ✅ - PWA manifest (already exists)

## Asset Generation

### Favicon

Convert `favicon.svg` to `favicon.ico`:

```bash
# Using ImageMagick
convert favicon.svg -resize 48x48 favicon.ico

# Or use an online converter
```

### Apple Touch Icon

Convert `logo.svg` to `apple-touch-icon.png` (180x180px):

```bash
# Using ImageMagick
convert logo.svg -resize 180x180 apple-touch-icon.png
```

### Open Graph Image

Convert `og-image.svg` to `og-image.jpg` (1200x630px):

```bash
# Using ImageMagick
convert og-image.svg -resize 1200x630 -quality 90 og-image.jpg
```

## Notes

- SVG versions are provided as placeholders
- For production, use optimized JPG/PNG versions
- Ensure all images are optimized for web (compressed)
- OG image should be 1200x630px for best social media previews
