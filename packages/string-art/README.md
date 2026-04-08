# String Art

This is the packaged up calculations which generate the polygons on [playingwithpolygons.com](https://www.playingwithpolygons.com/).

## What is String Art

Imagine a board with nails in it, each nail is an evenly spaced vertex on a 2D plane. We then take a string connecting these vertices to make lines forming a polygon. This is the fundamental idea that drives everything else that this library does.

Vertices are the original polygon.

Subdivisions are dividing the lines between vertices, which means putting another vertex in the middle of a line connecting two vertices. Turning what was one line, into two lines.

Points are how many vertices to count before connecting the line again. If points is two, every second vertex will be used; effectively halving the vertices used.

Jumps are a sequence of counting before connecting the line, similar to points. However this happen before the lines are subdivided; meaning they too can be subdivided creating vertices outside of the lines originally established by the original polygon.
