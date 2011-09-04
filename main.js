$(function(){
    mawaru.init();
    mawaru.r = 150;
    mawaru.setPos(200, 320);
    mawaru.draw(0);
    $('input#dir').change(function(e){
        var dir = e.target.value;
        mawaru.draw(dir);
    });
    var acc = {};
    window.addEventListener('devicemotion', function(e){
        acc.x = e.accelerationIncludingGravity.x;
        acc.y = e.accelerationIncludingGravity.y;
        acc.z = e.accelerationIncludingGravity.z;
    });
    setInterval(function(){
        var dir = Math.round(Math.atan(acc.x/acc.y)*180);
        mawaru.draw(dir*-1)
    }, 10);
});

var mawaru = {
    pos : {x : 100, y : 100},
    r : 100
};
mawaru.init = function(){
    this.imgs = $('div.mawaru span.mawaru img');
    $('div.mawaru span.mawaru').click(function(e){
        alert(e.currentTarget.id);
    });
    this.imgs.css('width', 50).css('height', 50).css('position', 'fixed');
};

mawaru.setPos = function(x, y){
    this.pos = {x : x, y : y};
};

mawaru.draw = function(dir){
    this.dir = dir;
    for(var i = 0; i < this.imgs.length; i++){
        var img = this.imgs[i];
        var t = dir*Math.PI/180 + Math.PI*2/this.imgs.length*i;
        img.style.pixelTop = Math.sin(t)*this.r + this.pos.y;
        img.style.pixelLeft = Math.cos(t)*this.r + this.pos.x;
    }
};