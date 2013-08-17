// STEP 3. Draw the image onto the canvas

canvas = document.getElementById('maincontainer');
/* $('#jripples').width(img.width); // We set the canvas width and height with jquery
$('#jripples').height(img.height);
*/
canvas.style.height = canvas.height = img.height ; // Set the canvas size to the image
canvas.style.width = canvas.width =img.width;
ctx = canvas.getContext("2d"); // Get the 2d drawing context
ctx.clearRect(0,0,canvas.width,canvas.height); // Clear the canvas
ctx.drawImage(img, 0,0,canvas.width,canvas.height); // Draw the image



// STEP 4. Build the data structures behind the wave
orginalData = ctx.getImageData(0,0,canvas.width,canvas.height).data; // The array of pixels for the image
myImageData = ctx.getImageData(0,0,canvas.width,canvas.height); // Modifications of pixels
buffer1 = []; // Create new array for the image buffer
buffer2 = [];
// orginal data length is 4 times the pixel dimensions since they store RGBA (red,green, blue, alpha)
for (var i=0; i
 buffer1[i] = 0;
buffer2[i] = 0;
}


//  STEP 5. Creating ripples (the wave algorithm) function
function processWater(source, dest) {
for (var i=imagewidth; i< source.length-imagewidth; i++)
{
// check for bounds
var xi = i % imagewidth;
if ((xi==0) || (xi==imagewidth-1)) continue;
dest[i] = (
((source[i-1]+
source[i+1]+
source[i-imagewidth]+
source[i+imagewidth]) >>1) ) -dest[i];
dest[i] -= (dest[i] >> 5); // Damping - Quick divde by 32 (5 bits)
}
}


// STEP 6. Render the new image with waves.
 function texture(buffer) {
var xoffset, yoffset;
for (var i=imagewidth; i
 {
// check for bounds
var xi = i % imagewidth;
if ((xi==0) || (xi==imagewidth-1)) continue;
xoffset = buffer[i-1] - buffer[i+1];
yoffset = buffer[i-imagewidth] - buffer [i+imagewidth];
var offset = i+xoffset+yoffset*imagewidth;
if (offset>0 && offset<="" p="">
for (var x=0;x<3;x++) { //4 for alpha
myImageData.data[i*4+x] = orginalData[offset*4+x];
}
}
}
// Draw
ctx.putImageData(myImageData, 0, 0);
}


// STEP 7. Call the rippling function in a timer
rippling = setInterval(ripple, 50); // This calls the ripple function every 20 times a second
// STEP 8
// We can calling another timer to add rain
raining = setInterval(function() { // random rain
var randomX = Math.round(Math.random() * canvas.width);
var randomY = Math.round(Math.random() * canvas.height);
buffer1[randomY*imagewidth+randomX] += Math.round( Math.random()*-500);
},300);
/* STEP 9. Add more raindrops/ripples reactivity to mouse clicks. We use jquery to add mouse listeners quickly. */
$(canvas).mousedown(function(e) {
var x = e.pageX - $(this).offset().left;
var y = e.pageY - $(this).offset().top ;
buffer1[y*imagewidth+x] = -400;
clicked.dragged= true;
}).
// STEP 10. Provides FPS(Frames per second)
setInterval(function() {
$('#jdebug').html(fpsCount + " fps");
fpsCount= 0; // recent
},1000);

