# يولّد أيقونات التطبيق وصورة الغلاف لمتجر Google Play من images/logo.jpg
# التشغيل:  powershell -ExecutionPolicy Bypass -File tools\make-icons.ps1
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$logo = [System.Drawing.Image]::FromFile((Join-Path $root 'images\logo.jpg'))
$out = Join-Path $root 'images\icons'
New-Item -ItemType Directory -Force $out | Out-Null

function New-Canvas($w, $h, $color) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'; $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.Clear($color)
  return @($bmp, $g)
}
function Save-Icon($size, $scale, $name) {
  $c = New-Canvas $size $size ([System.Drawing.Color]::White); $bmp = $c[0]; $g = $c[1]
  $s = [int]($size * $scale); $o = [int](($size - $s) / 2)
  $g.DrawImage($logo, $o, $o, $s, $s)
  $bmp.Save((Join-Path $out $name), [System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()
}

Save-Icon 192 0.92 'icon-192.png'
Save-Icon 512 0.92 'icon-512.png'
Save-Icon 512 0.66 'maskable-512.png'    # منطقة آمنة للأيقونات الدائرية في أندرويد
Save-Icon 180 0.92 'apple-touch-icon.png'

# صورة الغلاف لمتجر Google Play (1024x500)
$c = New-Canvas 1024 500 ([System.Drawing.Color]::FromArgb(11, 46, 89)); $bmp = $c[0]; $g = $c[1]
$rect = New-Object System.Drawing.Rectangle 0, 0, 1024, 500
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, ([System.Drawing.Color]::FromArgb(11, 46, 89)), ([System.Drawing.Color]::FromArgb(0, 119, 200)), 20
$g.FillRectangle($grad, $rect)
$g.FillEllipse([System.Drawing.Brushes]::White, 694, 100, 300, 300)
$clip = New-Object System.Drawing.Drawing2D.GraphicsPath; $clip.AddEllipse(704, 110, 280, 280)
$g.SetClip($clip); $g.DrawImage($logo, 714, 120, 260, 260); $g.ResetClip()
$rtl = New-Object System.Drawing.StringFormat; $rtl.FormatFlags = [System.Drawing.StringFormatFlags]::DirectionRightToLeft; $rtl.Alignment = 'Near'
$white = [System.Drawing.Brushes]::White
$sun = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(244, 196, 48))
$g.DrawString('مركز رحيم البيطري', (New-Object System.Drawing.Font 'Segoe UI', 46, ([System.Drawing.FontStyle]::Bold)), $white, (New-Object System.Drawing.RectangleF 40, 120, 620, 80), $rtl)
$g.DrawString('Raheem Pet Care Center', (New-Object System.Drawing.Font 'Segoe UI', 26, ([System.Drawing.FontStyle]::Bold)), $sun, (New-Object System.Drawing.RectangleF 40, 205, 620, 50), $rtl)
$g.DrawString('صحة حيوانك بين أيادٍ رحيمة', (New-Object System.Drawing.Font 'Segoe UI', 26), $white, (New-Object System.Drawing.RectangleF 40, 270, 620, 50), $rtl)
$g.DrawString('ماركا الشمالية، عمّان · احجز موعدك بسهولة', (New-Object System.Drawing.Font 'Segoe UI', 18), $white, (New-Object System.Drawing.RectangleF 40, 330, 620, 40), $rtl)
$bmp.Save((Join-Path $out 'play-feature-graphic.png'), [System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()

$logo.Dispose()
Get-ChildItem $out | ForEach-Object { "{0}  {1:N0} bytes" -f $_.Name, $_.Length }
