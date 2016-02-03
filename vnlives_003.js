function mycallback(json) {
	var flag = 0;
	var length = json.feed.entry.length;
	var entry = json.feed.entry;
	
	document.write("<div class='row-fluid'>");
	
	for (var i = 0; i < json.feed.entry.length; i++) {
		for (var j = 0; j < json.feed.entry[i].link.length; j++) {
			if (json.feed.entry[i].link[j].rel == 'alternate') {
				var postUrl = json.feed.entry[i].link[j].href;
				break;
			}
		}

		var postTitle = json.feed.entry[i].title.$t;
		var postAuthor = json.feed.entry[i].author[0].name.$t;
		var postSummary = json.feed.entry[i].summary.$t;
		var entryShort = postSummary.substring(0, 170);
		var entryEnd = entryShort.lastIndexOf(" ");
		var postContent = entryShort.substring(0, entryEnd) + '...';
		var imageThumb = "";

		//if (json.feed.entry[i].media$thumbnail.url == "" || json.feed.entry[i].media$thumbnail.url == null) {
		if ("media$thumbnail" in entry[i]) {
			imageThumb = json.feed.entry[i].media$thumbnail.url;		
		} else {
			//imageThumb = "http://4.bp.blogspot.com/-h2-LerYoaPw/VBBWTEPqyjI/AAAAAAAANBc/jN0359Jn8bI/s72-c/VNLIVES-LOGO.jpg";
			imageThumb = "http://2.bp.blogspot.com/-ex3V86fj4dQ/UrCQQa4cLsI/AAAAAAAAFdA/j2FCTmGOrog/s72-c/no-thumbnail.png";			
			
		}
				
		var item = "";
		if (flag == 0) {
			
			var item01 = "<div class='col-md-6' style='padding-right:0px;'><div class='item well'>"
				var item02 = "<img src='" + imageThumb.replace("/s72-c/","/s300/") + "' class='' style='width:100%;height:auto;' /><br />";
				var item03 = "<a href='" + postUrl + "'>" + postTitle + "</a><br />"
				var item04 = "<div class='text'>" + postContent + "</div><br />";
			var item05 = "</div></div>";			
			
			 item = item01 + item02 + item03 + item04 + item05;
			 
		} else if (flag == 1) {
			
			var item01 = "<div class='col-md-6'><div class='row-fluid'><div class='span12 item'>"
				var item02 = "<div class='clearfix'><img class='pull-left' src='" + imageThumb + "' style='margin-right: 5px;' />";
				var item03 = "<a href='" + postUrl + "'>" + postTitle + "</a></div>"
			var item05 = "</div></div>";				
			
			item = item01 + item02 + item03 + item05;
		} else {
			var item01 = "<div class='row-fluid'><div class='span12 item'>"
				var item02 = "<div class='clearfix'><img class='pull-left' src='" + imageThumb + "' />";
				var item03 = "<a href='" + postUrl + "'>" + postTitle + "</a></div>"
			var item05 = "</div></div>";				
			
			item = item01 + item02 + item03 + item05;			
			
		}
		
		document.write(item);
		flag++;
		
	}
	
	document.write("</div></div>");
	
	
	
}
