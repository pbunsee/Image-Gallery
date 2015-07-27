function Gallery(someImageList) {

  this.destinations = _.map(someImageList, function(d){ return new Destination(d); });
  this.chirrups = _.map(someImageList, function(d){ return new Chirrup(d); });

  this.render = function(){
    _.each(this.destinations, function(o){
      o.render();
    });
  }

  this.chirpy = function(){
    _.each(this.chirrups, function(o){
      o.birdy();
    });
  }

}

function Destination(locationShot) {
  this.render = function(){
   var divID = 'pic-' + locationShot.id;
   console.log(divID);
   $hotspot = '<div id="' + divID + '" class="pic" draggable="true"></div>';
   selector = "#"+divID;
   console.log(selector);
   console.dir($(selector));
   $('#wrapper').append($hotspot);
   $(selector).css('background-image', 'url(' + locationShot.source_link + ')');
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
  this.birdy = function(){
    $chirp = $('<div id="chirp-' + locationShot.id + '" class="chirp" draggable="true"></div>');
    $chirp.css('background-image', 'url(' + locationShot.source_link  + ')');
    $chirp.appendTo($outerChirp);
    $('body').append($outerChirp);
  }
}

function bindTarget(el) {
  $(el) 
    .bind('dragover', function(evt) { 
                        evt.preventDefault(); 
                      }) 
    .bind('dragenter', function(evt) { 
                         evt.preventDefault(); 
                       }) 
    .bind('drop', function(evt) { 
                    var id = evt.originalEvent.dataTransfer.getData('text'); 
                    item = $('#' + id); 
                    console.dir($(el));
                    if (el == '#other-sandbox') { 
                      getBG = item.css('background-image');
                      $(el).css('background-image',getBG);
                    }
                    else {
                      item.appendTo($(el));
                    }
                  })
    .bind('dragleave', function (evt) { 
                         console.log('dragleave'); 
                       }); 
}

function bindSource(el) {
  $(el) 
    .bind('dragstart', function(evt) { 
	console.log('in dragstart ' + evt.target.id); 
        evt.originalEvent.dataTransfer.setData('text', evt.target.id); 
        //evt.dataTransfer.setData('text', evt.target.id); 
    }) 
    .bind('dragend', function (evt) { 
		       console.log('dragend'); 
	             }) 
    .bind('dragstart', function (evt) { 
          	         //console.log('dragstart'); 
	               }) 
    .bind('drag', function (evt) { 
         	    console.log('drag'); 
	          });
}

$(document).ready(function() {
  console.log( "ready!" );
  gallery = new Gallery(source_images);
  gallery.render();
  gallery.chirpy();
  $('#wrapper2').prepend('<p>This is the #wrapper2 div!</p>'); 
  $('#wrapper2').prepend('<p>These images can be dragged from here!</p>'); 

  bindSource('.chirp');
  bindTarget('#sandbox');
  bindTarget('#other-sandbox');
  bindTarget('#wrapper2');
});

