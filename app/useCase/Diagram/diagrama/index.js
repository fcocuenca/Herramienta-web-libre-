

var canvas = new fabric.Canvas('pizarra');

	var HideControls = {
            'tl':true,
            'tr':false,
            'bl':true,
            'br':true,
            'ml':true,
            'mt':true,
            'mr':true,
            'mb':true,
            'mtr':true
        };

	$("#actor").on("click", function(e) {
  			fabric.Image.fromURL('app-content/icons/actor.png', function (img) {
   							img.top = 60;
   							img.left = 30;
   							img.setControlsVisibility(HideControls);
    						canvas.add(img);

					});
	});

	$("#CU").on("click", function(e) {
  			fabric.Image.fromURL('app-content/icons/CU.png', function (img) {
   							img.top = 60;
   							img.left = 30;
    						canvas.add(img);
					});
	});

	$("#asoc").on("click", function(e) {
  			fabric.Image.fromURL('app-content/icons/asoc.png', function (img) {
   							img.top = 60;
   							img.left = 30;
    						canvas.add(img);
					});
	});

	$("#system").on("click", function(e) {
  			fabric.Image.fromURL('app-content/icons/system.png', function (img) {
   							img.top = 60;
   							img.left = 30;
    						canvas.add(img);
					});
	});
	$("#include").on("click", function(e) {
  			fabric.Image.fromURL('app-content/icons/include.png', function (img) {
   							img.top = 60;
   							img.left = 30;
    						canvas.add(img);
					});
	});

	$("#generalizacion").on("click", function(e) {
  			fabric.Image.fromURL('app-content/icons/generalizacion.png', function (img) {
   							img.top = 60;
   							img.left = 30;
    						canvas.add(img);
					});
	});

	$("#exclude").on("click", function(e) {
  			fabric.Image.fromURL('app-content/icons/exclude.png', function (img) {
   							img.top = 60;
   							img.left = 30;
    						canvas.add(img);
					});
	});
	$("#text").on("click", function(e) {
  			fabric.Image.fromURL('app-content/icons/text.png', function (img) {
   							img.top = 60;
   							img.left = 30;
    						canvas.add(img);
					});
	});

function addDeleteBtn(x, y){
    $(".deleteBtn").remove(); 
    var btnLeft = x-10;
    var btnTop = y-10;
    var deleteBtn = '<img src="app-content/delete.png" class="deleteBtn" style="position:absolute;top:'+btnTop+'px;left:'+btnLeft+'px;cursor:pointer;width:20px;height:20px;"/>';
    $(".canvas-container").append(deleteBtn);
}

canvas.on('object:selected',function(e){
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
});

canvas.on('mouse:down',function(e){
    if(!canvas.getActiveObject())
    {
        $(".deleteBtn").remove(); 
    }
});

canvas.on('object:modified',function(e){
    addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
});

canvas.on('object:scaling',function(e){
    $(".deleteBtn").remove(); 
});
canvas.on('object:moving',function(e){
    $(".deleteBtn").remove(); 
});
canvas.on('object:rotating',function(e){
    $(".deleteBtn").remove(); 
});

$(document).on('click',".deleteBtn",function(){
    if(canvas.getActiveObject())
    {
        canvas.remove(canvas.getActiveObject());
        $(".deleteBtn").remove();
    }
});