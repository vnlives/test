var imgList = [];
var tmpTemplateList = [];

function pageNumber(number) {
	
	if (number < 0) {
		return;
	}
	
	if (number > imgList.length) {
		return;
	}	
	
	if (number - 5 > 0) {
		var min = number - 5;
		var man = min + 10;
		printPageControl(min, max)
	} else {
		printPageControl(0, 10)
	}

	$j("#imageBox").empty();
	$j("#imageBox").append(imgList[number]).append(tmpTemplateList[number]);

	 $j("html, body").animate({ scrollTop: 0 }, "fast");
	 return false;	
	
}

function printPageControl(min, max) {

	$('padddingPage li').each(function(i)
	{
		$(this).attr("style", "");
	});	
	
	$('padddingPage li').each(function(i)
	{
		if (i >= min && i <= max)
		$(this).attr("style", "");
	});		
	
}

function loadPicasaAlbumtosimplebox01(userid, albumid, authkey, thumbsize, photosize, margin) {
  var ts = thumbsize || DEFAULT_THUMBSIZE;
  var ps = photosize || DEFAULT_PHOTOSIZE;
  var m = margin || DEFAULT_MARGIN;

	var img;
	var tmpTemplate;
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

		img = $('<img>').attr('src', thumb.url.replace("s144","s1600")).attr("id", "page" + i);
		imgList[i] = img;
		
		//var tmpContent = '<li><img src="' + thumb.url.replace("s144","s1600") + '" alt=""><div class="titleImage">' + i + '</div></li>'
		//$j("#slider2").append(tmpContent);		
		
		var n = i+1;
		var p = i-1;
		tmpTemplate = "<div class='transparent-btns_nav transparent-btns1_nav prev' onclick='pageNumber(" + p + ")'>Previous</div><div class='transparent-btns_nav transparent-btns1_nav next' onclick='pageNumber(" + n + ")'>Next</div>";			
		tmpTemplateList[i] = tmpTemplate;
		
		var tmpContent = '<li style="display: none;"><div class="titleImage" onclick="pageNumber(' + i + ')">' + i + '</div></li>'
		$j("#padddingPage").append(tmpContent);


      });
	  
	  pageNumber(0);
	  $j("#imageBox").append(imgList[0]).append(tmpTemplateList[0]);	  
	  
	  
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
