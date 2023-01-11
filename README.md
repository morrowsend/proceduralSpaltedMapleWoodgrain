# proceduralSpaltedMapleWoodgrain
This P5.js sketch uses Perlin noise to generate a stretched camouflage pattern, then runs a simple edge detection on that. Click final image to save a PNG which you can then either raster etch or trace to quickly vector etch a Spalted Maple pattern.

FUTURE WORK: The next step (which I couldn't get working yet) is to interface imagetracerjs or potracejs to export an SVG of the traced value directly. 

Starting with a stretched camo design like this:
![Camo](https://raw.githubusercontent.com/morrowsend/proceduralSpaltedMapleWoodgrain/morrowsend/camo.png)

Tracing only the edges reveals a realistic spalting design
![spalting](https://raw.githubusercontent.com/morrowsend/proceduralSpaltedMapleWoodgrain/morrowsend/spalting.png)

Inspired by [this speaker design on imgur](https://imgur.com/a/eZZpfFl).