[CmdletBinding()]
param()

# Load the image
$imagePath = "C:\Users\TFC\Desktop\ATLAS\public\images\logo\atlas-logo.png"
$tempPath = "$imagePath.tmp"

# Copy for backup during processing
Copy-Item $imagePath $tempPath

try {
    # Add System.Drawing assembly
    Add-Type -AssemblyName System.Drawing
    
    # Load original image
    $originalImage = [System.Drawing.Image]::FromFile($imagePath)
    
    # Create new bitmap with ARGB format (supports transparency)
    $bitmap = New-Object System.Drawing.Bitmap($originalImage.Width, $originalImage.Height, 
                                               [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    # Get graphics object
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear([System.Drawing.Color]::Transparent)
    
    # Process original image pixel by pixel
    $sourceImage = New-Object System.Drawing.Bitmap($originalImage)
    
    for ($y = 0; $y -lt $sourceImage.Height; $y++) {
        for ($x = 0; $x -lt $sourceImage.Width; $x++) {
            $pixel = $sourceImage.GetPixel($x, $y)
            
            # Check if pixel is black (all RGB values < 50)
            if ($pixel.R -lt 50 -and $pixel.G -lt 50 -and $pixel.B -lt 50) {
                # Keep it transparent - already set above
                continue
            }
            else {
                # Keep the original color
                $bitmap.SetPixel($x, $y, $pixel)
            }
        }
    }
    
    # Save the new bitmap
    $bitmap.Save($imagePath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Cleanup
    $graphics.Dispose()
    $bitmap.Dispose()
    $sourceImage.Dispose()
    $originalImage.Dispose()
    
    # Remove temp file
    Remove-Item $tempPath -ErrorAction SilentlyContinue
    
    Write-Output "BACKGROUND_REMOVED - Logo processed successfully"
    exit 0
}
catch {
    Write-Output "Error: $_"
    
    # Restore from backup
    Copy-Item $tempPath $imagePath -Force
    Remove-Item $tempPath
    
    exit 1
}
