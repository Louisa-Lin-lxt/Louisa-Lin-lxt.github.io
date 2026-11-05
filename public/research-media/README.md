# Research media sources

These are laboratory-authored visual materials, presented within the portfolio research descriptions. They are not authored by the portfolio owner.

## He Lab
- Source page: https://www.cmu.edu/bme/helab/
- Original animation: https://www.cmu.edu/bme/helab/images/web-pictures/LabHome_2015Oct.gif
- Local file: he-lab.mp4, converted from the existing public/orgs/he-lab.gif. Original framing and timing preserved; silent H.264 for lighter playback.
- Supporting official CMU Engineering video: https://www.youtube.com/watch?v=bwriLGRuDZI
- Article: https://engineering.cmu.edu/news-events/news/2025/06/30-bci-robotic-hand-control.html

## Yttri Lab
- B-SOiD source: https://github.com/YttriLab/B-SOID
- Original, freely accessible source GIF: https://raw.githubusercontent.com/YttriLab/B-SOID/master/demo/2x2grid.gif
- Files: yttri-behavior.mp4 and yttri-behavior-poster.jpg. Converted from the source GIF to 960px-wide silent H.264; poster is its first frame. No labels, panels, or results were changed.
- B-SOiD material is distributed under GNU GPL v3; see B-SOiD-LICENSE.txt. Original authors retain copyright. This media conversion is also provided under GPL v3. Original editable source is the linked GIF.
- Conversion: ffmpeg -i 2x2grid.gif -movflags +faststart -vf 'scale=960:-2' -c:v libx264 -crf 24 -pix_fmt yuv420p -an yttri-behavior.mp4
- CARL figure: https://labs.bio.cmu.edu/yttri/wp-content/uploads/sites/19/2026/08/fig3-carl-task-v2.png
- Figure source page: https://labs.bio.cmu.edu/yttri/research/
- The CARL figure is displayed unchanged, with all labels visible.

Retrieved 2026-11-04. Official source links remain visible in the detail media captions. No third-party player or video is loaded on the homepage; local videos mount only while their detail dialog is open.
