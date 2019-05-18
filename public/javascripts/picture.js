function clickme(){
    start();
document.getElementById('mydiv').style.display="block";
document.getElementById('mydiv2').style.display="block";
document.getElementById('camera').style.display="none";
}

function start(){
    var canvas=document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    var VideoUrl = window.URL || window.webkitURL;

    navigator.getMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia||
                         navigator.mozGetUserMedia||
                         navigator.msGetUserMedia;
    navigator.getMedia({
        video:true,
        audio:false
    },function(stream){
     // video.src = VideoUrl.createObjectURL(stream);
      video.srcObject = stream;
      video.play();
    },function(error){

    });
  
    /*video.addEventListener('play',function(){
        draw(this,context,400,300);
    },false);
  
    function draw(video ,context,width,height){
        context.drawImage(video,0,0,width,height);
        setTimeout(draw,10,video,context,width,height);
    }  */
      

}
function download(){
    var download = document.getElementById("download");
    var image = document.getElementById("canvas").toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);

}

function takeit(){
    document.getElementById("countdown").innerHTML = "4";
    var seconds = document.getElementById("countdown").textContent;
    var countdown = setInterval(function() {
        seconds--;
        document.getElementById("countdown").textContent = 'Photo pris dans '+seconds;
        if(seconds==0){
            document.getElementById("countdown").textContent = 'Photo pris avec succes '; 
            takeit2()
        }
   
        if (seconds <= 0) clearInterval(countdown);
    }, 1000);
   
}

function takeit2(){
    console.log('ok');
    var canvas=document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    context.drawImage(video,0,0,400,300);
    var img = document.getElementById('monimage');
    img.src = canvas.toDataURL(); 

}

function applyFilter(){

    var canvas=document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var img = document.getElementById('monimage');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img,0,0,400,300);
  

    var filterControls = document.querySelectorAll('input[type=range]');
    var computeFilters = '';
    filterControls.forEach(function(item,index){
        computeFilters += item.getAttribute('data-filter')+'(' + item.value + item.getAttribute('data-scale')+ ') ';
    });
    console.log(computeFilters);

    context.filter = computeFilters;
    context.drawImage(canvas,0,0);
};
function modifier(){
    var canvas=document.getElementById('canvas').style.width = document.getElementById('width').value;
    var canvas=document.getElementById('canvas').style.height = document.getElementById('height').value;
} 


 