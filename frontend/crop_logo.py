from PIL import Image
try:
    img = Image.open('src/assets/invenger logo.jpg')
    # The logo has the icon on the left. The total width is probably around 300, height 76 based on previous magick.
    # Let's crop a square from the left side.
    # We can get bounding box or just crop width = height
    width, height = img.size
    print(f"Original size: {width}x{height}")
    # The icon is on the left. Let's crop a box from (0, 0) to (height, height) assuming it's roughly square
    # or let's use the aspect ratio.
    left = 0
    top = 0
    right = height * 1.2 # slightly wider than square maybe? Actually let's just make it square: height x height
    bottom = height
    cropped_img = img.crop((left, top, height, bottom))
    cropped_img.save('public/invenger-logo-icon.jpg')
    print("Cropped successfully to", height, "x", height)
except Exception as e:
    print("Error:", e)
