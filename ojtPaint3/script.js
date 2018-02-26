var canvasFront = document.getElementById('front-canvas'),
    canvasBack = document.getElementById('back-canvas'),
    ctxf = canvasFront.getContext('2d'),
    ctxb = canvasBack.getContext('2d');

var canvasWidth = document.getElementById('canvas-width'),
    canvasHeight = document.getElementById('canvas-height');


var canvasPosition;

var mouseX, mouseY, 
    mouseXl = document.getElementById('mouseX'),
    mouseYl = document.getElementById('mouseY');

var tools = [], sizes = [], colors = [], shapes = [];

tools.pencil = document.getElementById('pencil');
tools.eraser = document.getElementById('eraser');
    
sizes.small = document.getElementById('small');
sizes.middle = document.getElementById('middle');
sizes.big = document.getElementById('big');

var eraserSize = 8,
    eraserCursor = "url('images/cursor/eraser_small.png'), auto";

var canvasClear = document.getElementById('clear-canvas'),
    fileImg = document.getElementById('img-file'),
    properties = document.getElementById('properties'),
    imgWidth = document.getElementById('img-width'),
    imgHeight = document.getElementById('img-height');
    

var startX = 100, startY = 100;

colors.bcolor = document.getElementById('blue');
colors.blcolor = document.getElementById('black');
colors.gcolor = document.getElementById('green');
colors.ycolor = document.getElementById('yellow');
colors.rcolor = document.getElementById('red');


colors.bcolor.onclick = function(){
 
    
    ctxb.strokeStyle = '#0000ff';   
    
}

colors.blcolor.onclick = function(){
 
    
    ctxb.strokeStyle = '#000000';   
    
}

colors.gcolor.onclick = function(){
 
    
    ctxb.strokeStyle = '#00cc00';   
    
}

colors.ycolor.onclick = function(){
 
    
    ctxb.strokeStyle = '#ffff00';   
    
}

colors.rcolor.onclick = function(){
 
    
    ctxb.strokeStyle = '#ff0000';   
    
}




shapes.square = document.getElementById('square');
shapes.rectangle = document.getElementById('rectangle');
shapes.secondSizel = document.getElementById('secondSize');
shapes.thirdSizel = document.getElementById('thirdSize');
shapes.circle = document.getElementById('circle');

var shapeOpenSquare = false, shapeOpenRectangle = false, shapeOpenCircle = false;

shapes.square.onclick = function() {

      canvasBack.width = canvasBack.width;
    canvasFront.width = canvasFront.width;
    ctxb.rect(20,20,100,100);
    ctxb.stroke();
    shapeOpenSquare = true;
     shapeOpenRectangle = false;
    shapeOpenCircle = false;
    


}

shapes.rectangle.onclick = function() {

      canvasBack.width = canvasBack.width;
    canvasFront.width = canvasFront.width;
    ctxb.rect(20,20,150,100);
    ctxb.stroke();
     shapeOpenRectangle = true;
    shapeOpenSquare = false;
      shapeOpenCircle = false;
 

}


shapes.secondSizel.onclick = function() {

    
    if(shapeOpenSquare == true){
      canvasBack.width = canvasBack.width;
    canvasFront.width = canvasFront.width;
    ctxb.rect(20,20,150,150);
    ctxb.stroke();
        shapeOpenSquare = true;
        shapeOpenRectangle = false;
        
    }
    
    
          else if(shapeOpenRectangle == true){
      canvasBack.width = canvasBack.width;
    canvasFront.width = canvasFront.width;
    ctxb.rect(20,20,200,150);
    ctxb.stroke();
    shapeOpenSquare = false;
    shapeOpenRectangle = true;
    }
 

}


shapes.thirdSizel.onclick = function() {

    
    if(shapeOpenSquare == true){
      canvasBack.width = canvasBack.width;
    canvasFront.width = canvasFront.width;
    ctxb.rect(20,20,80,80);
    ctxb.stroke();
        shapeOpenSquare = true;
        shapeOpenRectangle = false;
        
    }
    
    
          else if(shapeOpenRectangle == true){
      canvasBack.width = canvasBack.width;
    canvasFront.width = canvasFront.width;
    ctxb.rect(20,20,120,90);
    ctxb.stroke();
    shapeOpenSquare = false;
    shapeOpenRectangle = true;
    }
 

}






window.onload = function(){
    canvasPosition = canvasBack.getBoundingClientRect();
}

canvasWidth.onchange = function() {
    
    canvasFront.width = canvasWidth.value;
    canvasBack.width = canvasWidth.value;
}

canvasHeight.onchange = function() {
    
    canvasFront.height = canvasHeight.value;
    canvasBack.height = canvasHeight.value;
}

canvasFront.onmousemove = function(e){
    mouseX = e.clientX - canvasPosition.left;
    mouseY = e.clientY - canvasPosition.top;
    mouseXl.innerHTML = mouseX;
    mouseYl.innerHTML = mouseY;
}
  

canvasClear.onclick = function(){
    canvasBack.width = canvasBack.width;
    canvasFront.width = canvasFront.width;
    
}


addAllHandlers(tools, "tool-active");
addAllHandlers(sizes, "size-active");
addAllHandlers(colors, "color-active");

function addAllHandlers(arr, className){
    
    for(var item in arr){
        
        arr[item].onmousedown = addHandler(arr[item], arr, className);
    }
}



function addHandler( element, arr, className){
    
    return function() {
        
        removeAllClasses(arr);
        element.setAttribute("class", className);
    } 
    
}

function removeAllClasses(arr){
    
    for(var item in arr){
        
        arr[item].removeAttribute("class");
    }
}

sizes.small.onclick = function(){
    ctxb.lineWidth = 1;
    eraserSize = 8;
    eraserCursor = "url('images/cursor/eraser_small.png'), auto";
}

sizes.middle.onclick = function(){
    ctxb.lineWidth = 5;
    eraserSize = 16;
    eraserCursor = "url('images/cursor/eraser_middle.png'), auto";
}

sizes.big.onclick = function(){
    ctxb.lineWidth = 15;
    eraserSize = 32;
    eraserCursor = "url('images/cursor/eraser_big.png'), auto";
}

var processing = false;
var operations = [];

operations['mousedown'] = function() {
    
    processing = true;
    ctxb.beginPath();
    
};

operations['mouseup'] = function() {
    
    processing = false;
    
};

canvasFront.addEventListener("mousedown", function(){ operations["mousedown"]();
});                                                     

canvasFront.addEventListener("mouseup", function(){ operations["mouseup"]();
});

canvasFront.addEventListener("mousemove", function(){ operations["mousemove"]();
});

tools.pencil.onclick = function(){
    
    canvasFront.style.cursor = "pointer";
    operations['mousemove'] = function() {
        
        if(processing){
            
            ctxb.lineTo(mouseX, mouseY);
            ctxb.stroke();
        };
    };
};

tools.eraser.onclick = function(){
    
   
    operations['mousemove'] = function() {
        canvasFront.style.cursor = eraserCursor;
        if(processing){
            
            ctxb.clearRect(mouseX, mouseY, eraserSize, eraserSize);
        };
    };   
};

color.onchange = function(e) {
    
    ctxb.strokeStyle = e.srcElement.value;
    
}




fileImg.onchange = function() {
    
    var file = fileImg.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        
        var dataUri = event.target.result;
            img = new Image();
        img.onload = function(){
            
            ctxf.strokeRect(startX, startY, img.width, img.height);
            ctxf.drawImage(img, startX, startY);
            
            operations['mousemove'] = function (){
                
                if(processing){
                    
                    canvasFront.width = canvasFront.width;
                    ctxf.strokeRect(mouseX, mouseY, imgWidth.value, imgHeight.value);
                    
                    ctxf.drawImage(img, mouseX, mouseY, imgWidth.value, imgHeight.value);
                };
            };
            
            operations['mouseup'] = function(){
                
                properties.style.display = 'none';
                canvasFront.width = canvasFront.width;
                processing = false;
                ctxb.drawImage(img, mouseX, mouseY, imgWidth.value, imgHeight.value);
                operations['mousemove'] = undefined;
                operations['mouseup'] = function(){
                    
                    processing = false;
                };
                
            };
        };
    
        img.src = dataUri;
        properties.style.display = 'block';
        imgWidth.value = img.width;
        imgHeight.value = img.height;
    
    };
    
    reader.readAsDataURL(file);
    
    
}


imgWidth.addEventListener("change", changeImgSize);
imgHeight.addEventListener("change", changeImgSize);
function changeImgSize(){
    
    canvasFront.width = canvasFront.width;
    ctxf.strokeRect(startX, startY, imgWidth.value, imgHeight.value);
    ctxf.drawImage(img, startX, startY, imgWidth.value, imgHeight.value);
}

invert.onclick = function () {
    
    var imageData = ctxf.getImageData(startX, startY, imgWidth.value, imgHeight.value);
    for(var i = 0; i< imageData.data.length; i+=4){
        
        for(var j = i; j<i + 3; j++){
            
            imageData.data[j] = 255 - imageData.data[j];
            
        }
    }
    ctxf.putImageData(imageData, startX, startY);
};



 