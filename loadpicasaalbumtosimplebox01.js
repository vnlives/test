var imgList = [];

function pageNumber(number) {
	$j("#imageBox").empty();
	$j("#imageBox").append(imgList[number]);	

}

function loadPicasaAlbumtosimplebox01(userid, albumid, authkey, thumbsize, photosize, margin) {
  var ts = thumbsize || DEFAULT_THUMBSIZE;
  var ps = photosize || DEFAULT_PHOTOSIZE;
  var m = margin || DEFAULT_MARGIN;

	var img;
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

		img = $('<img>').attr('src', thumb.url.replace("s144","s1600")).attr("id", "top");
		imgList[i] = img;
		
		//var tmpContent = '<li><img src="' + thumb.url.replace("s144","s1600") + '" alt=""><div class="titleImage">' + i + '</div></li>'
		//$j("#slider2").append(tmpContent);		
		
		
		
		var tmpContent = '<li><a href="#top" alt=""><div class="titleImage" onclick="pageNumber(' + i + ')">' + i + '</div></a></li>'
		$j("#padddingPage").append(tmpContent);


      });
	  
	  $j("#imageBox").append(imgList[0]);	

      /* Slideshow 2
      $j("#slider2").responsiveSlides({
        auto: false,
        pager: false,
        nav: true,
        speed: 0,
        maxwidth: 1600,
        namespace: "transparent-btns"
      });	  */

	  $j("a[href='#top']").click(function() {
		 $j("html, body").animate({ scrollTop: 0 }, "fast");
		 return false;
	  });  	  
	  
	 
    });

  });
  

  
}
