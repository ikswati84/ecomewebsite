#!/bin/bash

# Script to download brand logos
echo "Downloading brand logos..."

# Create brands directory if it doesn't exist
mkdir -p public/images/brands

# Download brand logos from reliable sources
echo "Downloading Apple logo..."
curl -L -o public/images/brands/apple.png "https://cdn-icons-png.flaticon.com/512/0/747.png"

echo "Downloading Samsung logo..."
curl -L -o public/images/brands/samsung.png "https://cdn-icons-png.flaticon.com/512/882/882849.png"

echo "Downloading Adidas logo..."
curl -L -o public/images/brands/adidas.png "https://cdn-icons-png.flaticon.com/512/882/882860.png"

echo "Downloading Nike logo..."
curl -L -o public/images/brands/nike.png "https://cdn-icons-png.flaticon.com/512/882/882862.png"

echo "Downloading Gucci logo..."
curl -L -o public/images/brands/gucci.png "https://cdn-icons-png.flaticon.com/512/882/882863.png"

echo "Downloading Louis Vuitton logo..."
curl -L -o public/images/brands/louis-vuitton.png "https://cdn-icons-png.flaticon.com/512/882/882864.png"

echo "Downloading Chanel logo..."
curl -L -o public/images/brands/chanel.png "https://cdn-icons-png.flaticon.com/512/882/882865.png"

echo "Downloading Dior logo..."
curl -L -o public/images/brands/dior.png "https://cdn-icons-png.flaticon.com/512/882/882866.png"

echo "All logos downloaded successfully!"
echo "Files in public/images/brands/:"
ls -la public/images/brands/ 