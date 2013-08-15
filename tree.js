function point(x,y){
	this.x=x;
	this.y=y;
}
function CreateCanvas(elementId){
	var canvas = new Object();
	canvas.canvas=document.getElementById(elementId);
	canvas.context=canvas.canvas.getContext('2d');
	
	canvas.mouse=new point(0,0);
	canvas.inside=false;
	canvas.last_mouse=new point(0,0);
	canvas.delta=new point(0,0);
	
	
	canvas.canvas.onmousemove = function (event){
		canvas.last_mouse.x=canvas.mouse.x;
		canvas.last_mouse.y=canvas.mouse.y;
		
		canvas.mouse.x=event.clientX-canvas.canvas.offsetLeft;
		canvas.mouse.y=event.clientY-canvas.canvas.offsetTop;
		
		canvas.delta.x=canvas.mouse.x-canvas.last_mouse.x;
		canvas.delta.y=canvas.mouse.y-canvas.last_mouse.y;
	};
	canvas.canvas.onmouseout = function (event){
		canvas.inside=false;
	}
	canvas.canvas.onmouseover = function (event){
		canvas.inside=true;
		
		canvas.mouse.x=event.clientX-canvas.canvas.offsetLeft;
		canvas.mouse.y=event.clientY-canvas.canvas.offsetTop;
		canvas.last_mouse.x=canvas.mouse.x;
		canvas.last_mouse.y=canvas.mouse.y;
		canvas.delta.x=0;
		canvas.delta.y=0;
	}

	return canvas;
}






        // function draw_linie(){
            // context.save();
            // context.beginPath();
            // context.moveTo(this.x1,this.y1);
            // context.lineTo(this.x2,this.y2);
            // context.strokeStyle = 'black';
            // context.stroke();
            // context.restore();
        // }



        // canvas.onmousedown=start_draw;
        // canvas.onmouseup=stop_draw;
        // canvas.onmouseout=stop_draw;

		}
		//var wind_img=new Image();
		//wind_img.src="wind.png";
		
		function arata(){
			desen.context.fillStyle="black";
			desen.context.fillRect(0,0,800,600);
			//desen.context.drawImage(wind_img,650,25);
			
			wind=curent*wind_strength+wind_dev;
			recalculate();
			
			
			
			desen.context.strokeStyle="white";
			
			desen.context.save();
			desen.context.translate(-200,-270);
			desen.context.scale(1.5,1.5);
			desen.context.translate(0,-60);
			
			draw();
			desen.context.restore();
			
		}
		
		
		
		function huricane(event){
			if(window.innerHeight-event.clientY<100){
				wind_dev=-((event.clientX/window.innerWidth)-1/2)*0.1;
			}
		}
		onmousemove=huricane;
		
		
		
		
		run_interval=setInterval(run,1);
		setInterval(arata,60);
		
		
		
 

