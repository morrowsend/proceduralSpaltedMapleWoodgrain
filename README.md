# proceduralSpaltedMapleWoodgrain
This P5.js sketch uses Perlin noise to generate a stretched camouflage pattern, then runs a simple edge detection on that. Click final image to save a PNG which you can then either raster etch or trace to quickly vector etch a Spalted Maple pattern.

FUTURE WORK: The next step (which I couldn't get working yet) is to interface imagetracerjs or potracejs to export an SVG of the traced value directly. 

Starting with a stretched camo design like this:

![Camo](https://raw.githubusercontent.com/morrowsend/proceduralSpaltedMapleWoodgrain/morrowsend/camo.png)

Tracing only the edges reveals a realistic spalting design

![spalting](https://raw.githubusercontent.com/morrowsend/proceduralSpaltedMapleWoodgrain/morrowsend/spalting.png)

You can add this as a texture to 3D prints in the slicer. The slicer will adjust the print to incorporate the texture in 3D giving it a woodgrain-like effect.

Inspired by [this speaker design on imgur](https://imgur.com/a/eZZpfFl).


TODO: Incorporate imagetracejs or potracejs to export an SVG of the edges for vector cutting on a laser. 
