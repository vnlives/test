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

function loadPicasaAlbum(userid, albumid, authkey, thumbsize, photosize, margin) {
  var ts = thumbsize || DEFAULT_THUMBSIZE;
  var ps = photosize || DEFAULT_PHOTOSIZE;
  var m = margin || DEFAULT_MARGIN;

  // Originally based on code from http://www.bloggingtips.com/2009/03/23/picasa-widgets-and-plugins-for-your-blog/
  //http://picasaweb.google.com/data/feed/api/user/116713954427649694032/albumid/6159844651286029089?alt=rss&kind=photo&authkey=Gv1sRgCLzgtd7AvcHRew&hl=en_US
  $j = jQuery.noConflict();
  $j(document).ready(function(){
  $j.getJSON("http://picasaweb.google.com/data/feed/api/user/" + userid + "/album/" + albumid + "?authkey=" + authkey + "&kind=photo&alt=json-in-script&callback=?",

    function(data, status) {
//      $j("#picasaTitle").text(data.feed.title.$t);
//      $j("#picasaSubtitle").text(data.feed.subtitle.$t);

	  //document.write(data.feed.title.$t);
	  var numPage = data.feed.entry.length;
	  var radomNumber = Math.floor((Math.random() * numPage) + 1)-1;
	  //console.log("radomNumber: " + radomNumber);
	  $j('#numPage'+albumid).html("<b>Picture:</b> " + numPage);

      $j.each(data.feed.entry, function(i, pic) {
		
		//if (i == radomNumber) {
		if (i == 0) {
			var thumb = pic.media$group.media$thumbnail[ts];
			var photo = pic.media$group.media$content[0];
			var desc = pic.media$group.media$description.$t;
			var pad = computePadding(thumb.width, thumb.height);		
		
			$j("<img/>").attr("src", thumb.url.replace("s144","s240"))
						.attr("alt", desc)
						.attr("style", "clear: left; float: left; margin-bottom: 1em; margin-right: 1em;")
						.appendTo("#"+albumid)
						.wrap("<a href=\"" + imgScaledUrl(photo.url, ps) + "\" title=\"" + desc + "\" />");
			return false;
		}

      });
      	  
    });
  });
}