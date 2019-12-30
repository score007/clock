var dom=document.getElementById("clock");
var ctx=dom.getContext("2d");
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;
var rem=width/200;

	//画外圆
function drawBac(){
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth=10*rem;
	ctx.arc(0,0,r-5*rem,0,2*Math.PI,false);
	ctx.stroke();
	
	//画时间数
	var hourNum=[3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.textAlign="center";
	ctx.textBaseline="middle";
	ctx.font=18*rem+"px Arial";
	hourNum.forEach(function(number,index){
			var rad=2*Math.PI/12*index;
			var x=Math.cos(rad)*(r-30*rem);
			var y=Math.sin(rad)*(r-30*rem);
			ctx.fillText(number,x,y);
	});
	
	//画点状内圆
	for (var i=0;i<60;i++) {
		var rad =2*Math.PI/60*i;
		var x=Math.cos(rad)*(r-15*rem);
		var y=Math.sin(rad)*(r-15*rem);
		ctx.beginPath();
		if(i%5!=0){
			ctx.fillStyle="#CCCCCC";
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}else{
			ctx.fillStyle="black";
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}
		ctx.fill();
	}
}

function drawHour(hour,minute){
		ctx.save();
		ctx.beginPath();
		var rad =2*Math.PI/12*hour+2*Math.PI/12/60*minute;
		ctx.rotate(rad);
		ctx.lineWidth=6*rem;
		ctx.lineCap="round";
		ctx.moveTo(0,10);
		ctx.lineTo(0,-r/2);
		ctx.stroke();
		ctx.restore();
	}

function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad =2*Math.PI/60*minute;
	ctx.rotate(rad);
	ctx.lineWidth=3*rem;
	ctx.lineCap="round";
	ctx.moveTo(0,10);
	ctx.lineTo(0,-r+30*rem);
	ctx.stroke();
	ctx.restore();
}

function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	var rad =2*Math.PI/60*second;
	ctx.rotate(rad);
	ctx.fillStyle="red";
	ctx.moveTo(-2,20);
	ctx.lineTo(2,20);
	ctx.lineTo(1,-r+18*rem);
	ctx.lineTo(-1,-r+18*rem);
	ctx.fill();
	ctx.restore();
}

function drawDot(){
	ctx.beginPath();
	ctx.fillStyle="#CCCCCC";
	ctx.arc(0,0,3*rem,0,2*Math.PI,false);
	ctx.fill();
}




function draw(){
	ctx.clearRect(0,0,width,height);
	var now =new Date();
	var hour=now.getHours();
	var minute=now.getMinutes();
	var second=now.getSeconds();	
	drawBac();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}


setInterval(draw,1000);
