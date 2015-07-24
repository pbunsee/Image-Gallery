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
   console.log("chirp!");
   var divID = 'pic-' + this.source_id;
   console.log(divID);
   $hotspot = '<div id="' + divID + '"></div>';
   console.log("hotspot is : " +$hotspot);
   selector = "#"+divID;
   console.log(selector);
   console.log($(selector));
   $('#wrapper').append($hotspot);
   $(selector).css('background-image', 'url(' + this.source_url + ')');
  }
}

function Chirrup(locationShot) {
  this.source_url = locationShot.source_link;
  this.source_id = locationShot.id;
  this.cheese = function(){
    $outerChirp = $('<div id="wrapper2"></div>');
    $chirp = $('<div class="chirp"></div>');
    $chirp.css('background-image', 'url(' + this.source_url + ')');
    $('body').append($outerChirp);
    $outerChirp.append($chirp);
  }
}

$(document).ready(function() {
  console.log( "ready!" );
  gallery = new Gallery(source_images);
  gallery.render();
  gallery.chirpy();
});

