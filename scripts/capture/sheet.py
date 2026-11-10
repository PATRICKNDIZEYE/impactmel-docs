import sys, glob, os
from PIL import Image, ImageDraw
files = sorted(sys.argv[2:])
cols, tw = 4, 720
th = int(tw * 1800 / 2880)
rows = (len(files) + cols - 1) // cols
S = Image.new('RGB', (cols * tw, rows * (th + 24)), 'white')
d = ImageDraw.Draw(S)
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB'); im.thumbnail((tw, th * 3))
    im = im.crop((0, 0, tw, min(im.height, th)))
    x, y = (i % cols) * tw, (i // cols) * (th + 24)
    S.paste(im, (x, y + 24)); d.text((x + 4, y + 6), os.path.basename(f), fill='black')
S.save(sys.argv[1])
