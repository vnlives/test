// Indexes to standard thumbnails returned by Picasa API
var THUMB_SMALL  = 0;
var THUMB_MEDIUM = 1;
var THUMB_LARGE  = 2;

// Sizes for photographs to be displayed by slimbox
var PHOTO_SMALL  = 640;
var PHOTO_MEDIUM = 800;
var PHOTO_LARGE  = 1024;

var DEFAULT_MARGIN    = 5;
var DEFAULT_THUMBSIZE = THUMB_MEDIUM;
var DEFAULT_PHOTOSIZE = PHOTO_MEDIUM;

// Compute horizontal and vertical padding needed to make the image "square" so
// landscape and portrait images align nicely on a grid
function computePadding(width, height) {
  var hspace = 0;
  var vspace = 0;

  if (width > height) {
    vspace = (width - height) / 2;
  } else if (height > width) {
    hspace = (height - width) / 2;
  }

  return {"hspace": hspace, "vspace": vspace};
}

// Adjust margin style, using padding computed from image dimensions
// hspace and vspace specify padding to make the area filled by the image seem "square"
// margin is the padding to be placed on all sides of the image
function imgMarginStyle(hspace, vspace, margin) {
  var hmargin = margin + hspace;
  var vmargin = margin + vspace;
  return "margin: " + vmargin + "px " + hmargin + "px " + vmargin + "px " + hmargin + "px;";
}

// Generate url for photo scaled to specified size
function imgScaledUrl(url, size) {
  var split = url.lastIndexOf("/");
  return url.substring(0, split) + "/s" + size + url.substring(split);
}

function loadPicasaAlbumtosimplebox(userid, albumid, authkey, thumbsize, photosize, margin) {
  var ts = thumbsize || DEFAULT_THUMBSIZE;
  var ps = photosize || DEFAULT_PHOTOSIZE;
  var m = margin || DEFAULT_MARGIN;

  // Originally based on code from http://www.bloggingtips.com/2009/03/23/picasa-widgets-and-plugins-for-your-blog/
  $j = jQuery.noConflict();
  $j(document).ready(function(){
  $j.getJSON("http://picasaweb.google.com/data/feed/api/user/" + userid + "/album/" + albumid + "?authkey=" + authkey + "&kind=photo&alt=json-in-script&callback=?",

    function(data, status) {
      $j("#picasaTitle").text(data.feed.title.$t);
      $j("#picasaSubtitle").text(data.feed.subtitle.$t);

      $j.each(data.feed.entry, function(i, pic) {
        var thumb = pic.media$group.media$thumbnail[ts];
        var photo = pic.media$group.media$content[0];
        var desc = pic.media$group.media$description.$t;
        var pad = computePadding(thumb.width, thumb.height);

		var tmpContent = '<li><img src="' + thumb.url.replace("s144","s1600") + '" alt=""><div class="titleImage">' + i + '</div></li>'
		$j("#slider2").append(tmpContent);

      });

      // Slideshow 2
      $j("#slider2").responsiveSlides({
        auto: false,
        pager: false,
        nav: true,
        speed: 0,
        maxwidth: 1600,
        namespace: "transparent-btns"
      });	  

  $j("a[href='#top']").click(function() {
     $j("html, body").animate({ scrollTop: 0 }, "fast");
     return false;
  });  	  
	  
	 
    });

  });
  

  
}
