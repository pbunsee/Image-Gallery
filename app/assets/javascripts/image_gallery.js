function Gallery(someImageList) {
  console.log("someImageList is: " + someImageList);
  this.destinations = _.map(someImageList, function(d){ console.log("aha"); 
                                                        return new Destination(d); 
                                                      });
  this.chirrups = _.map(someImageList, function(d){ console.log("aha"); 
                                                        return new Chirrup(d); 
                                                      });

  console.log("this is " + this);
  console.log("this.destinations is " + this.destinations);
  this.render = function(){
    _.each(this.destinations, function(o){
      o.render();
    });
  }

  this.chirpy = function(){
    _.each(this.chirrups, function(o){
      o.cheese();
    });
  }

}

function Destination(locationShot) {
  this.source_url = locationShot.source_link;
  this.source_id = locationShot.id;

  this.render = function(){
   console.log("pic!");
   var divID = 'pic-' + this.source_id;
   console.log(divID);
   $hotspot = '<div id="' + divID + '" class="pic" draggable="true"></div>';
   selector = "#"+divID;
   console.log(selector);
   console.log($(selector));
   $('#wrapper').append($hotspot);
   $(selector).css('background-image', 'url(' + this.source_url + ')');
   //$(selector).css('draggable', 'true');
   console.log("hotspot is : " +$hotspot);
   console.log("is hotspot draggable : " +$(selector).css('draggable'));
   console.log("hotspot background-image is : " +$(selector).css('background-image'));
  }
}

function Chirrup(locationShot) {
  this.source_url = locationShot.source_link;
  this.source_id = locationShot.id;
  $outerChirp = $('<div id="wrapper2"></div>');
  this.cheese = function(){
    $chirp = $('<div id="chirp-' + this.source_id + '" class="chirp" draggable="true"></div>');
    $chirp.css('background-image', 'url(' + this.source_url + ')');
    //$chirp.css('draggable', 'true');
    $('body').append($outerChirp);
    //$('.chirp').draggable();
    //console.log("is chirp draggable: " + $('.chirp').css('draggable'));
    $outerChirp.append($chirp);
  }
}

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e){
       e.preventDefault();
       var data = e.dataTransfer.getData("text");
       e.target.appendChild(document.getElementById(data));
}

$(document).ready(function() {
  console.log( "ready!" );
  gallery = new Gallery(source_images);
  gallery.render();
  gallery.chirpy();

  $('.chirp') 
    .bind('dragstart', function(evt) { 
	console.log('in dragstart ' + evt.target.id); 
        //thingy = evt.target.id;
        //console.log("thingy: " + thingy); 
        //thingy2 = $('#' + thingy); 
        //console.log("thingy2: " + thingy2); 
        //console.dir(thingy2); 
        //itembg1 = $(thingy2).css('background-image');
        //console.log("itembg1: " + itembg1); 
        evt.originalEvent.dataTransfer.setData('text', evt.target.id); 
        //evt.dataTransfer.setData('text', evt.target.id); 
        $('h2').fadeIn('fast'); 
    }) 
    .hover( 
        function () { $('div', this).fadeIn(); },  
        function () { $('div', this).fadeOut(); } 
    );

  $('#sandbox') 
    .bind('dragover', function(evt) { 
	                //console.log('in dragover'); 
                        evt.preventDefault(); 
                      }) 
    .bind('dragenter', function(evt) { 
	                 //console.log('in dragenter'); 
                         evt.preventDefault(); 
                       }) 
    .bind('drop', function(evt) { 
                    $("h2").fadeOut('fast'); 
                    //var id = evt.dataTransfer.getData('text'), 
                    var id = evt.originalEvent.dataTransfer.getData('text'); 
                    item = $('#' + id); 
                    item.appendTo($('#sandbox'));
                  })

  $('#sandbox').bind('dragleave', function (evt) { 
	                            console.log('dragleave'); 
                                  }); 
 
  $('.chirp') 
	.bind('dragend', function (evt) { 
		           console.log('dragend'); 
	                 }) 
	.bind('dragstart', function (evt) { 
		             //console.log('dragstart'); 
	                   }) 
	.bind('drag', function (evt) { 
		        console.log('drag'); 
	              });
});

