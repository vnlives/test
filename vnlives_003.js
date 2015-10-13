function mycallback(json) {
	var flag = 0;
	var length = json.feed.entry.length;
	var entry = json.feed.entry;
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
		
		
		var item00 = "<div class='item' style='margin:0px;overflow:hidden;'>";
		var item01 = "<div class='image'><img src='" + imageThumb + "' class='float' /></div>";
		
		var item02a = "<div class='title'>";
		var item02b = "<b>"
		var item02c = "<a href='" + postUrl + "'>" + postTitle + "</a>"
		var item02d = "</b>";
		var item02e = "</div>";
		
		var item03 = "<div class='text'>" + postContent + "</div>";
		var item04 = "</div>";
		var item05 = "<div style='clear: both;'></div>";
		
		var item = "";
		if (flag == 0) {
			 item = item00 + item01 + item02a + item02b + item02c + item02d + item02e + item03 + item04 + item05;
		} else {
			 item = item00 + item01 + item02a + item02b + item02c + item02d + item02e + item03 + item04 + item05;
		}
		
		flag++;
		document.write(item);
		
	}
}
