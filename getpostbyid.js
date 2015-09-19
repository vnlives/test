function mycallback(json) {
	var flag = 0;
	//var length = json.entry.length;
	//var entry = json.entry;
	var postTitle = json.entry.title.$t;
	var postTitleArr = postTitle.split("]");
	var postTitleLanguage = postTitleArr[0].replace("[","");
	var postTitleAuthor = postTitleArr[1].replace("[","");
	
	var postUrl = json.entry.link.href;
	for (var j = 0; j < json.entry.link.length; j++) {
		if (json.entry.link[j].rel == 'alternate') {
			postUrl = json.entry.link[j].href;
			break;
		}
	}
	
	
	var postAuthor = json.entry.author[0].name.$t;
	var postSummary = json.entry.summary.$t;
	//var imageThumb = json.entry.media$thumbnail.url;
	//var postContent = json.entry.content.$t;
	var postSummary = json.entry.summary.$t;
	var postContent = postSummary.split("]")[0].replace("[","");

	//http://elivsing.blogspot.com/search/label/Author%3A%20Freehand%20Tamashii
	//<img style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" alt="012" src="http://lh3.googleusercontent.com/-h8AY51iUSwk/VXwqYJqlBTI/AAAAAAAAEi8/uYK-OPFXXGk/s240/0012.jpg">
	
	var picasaInfor;
	if (postSummary.indexOf(" loadPicasaAlbum(") != -1) {
		picasaInfor = postSummary.substring(postSummary.indexOf(" loadPicasaAlbum("), postSummary.indexOf(");", postSummary.indexOf(" loadPicasaAlbum("))).replace(/"|\s/g,"");
		picasaInfor = picasaInfor.replace("loadPicasaAlbum(","").split(",");
	} else if (postSummary.indexOf(" loadPicasaAlbum01(") != -1) {
		picasaInfor = postSummary.substring(postSummary.indexOf(" loadPicasaAlbum01("), postSummary.indexOf(");", postSummary.indexOf(" loadPicasaAlbum01("))).replace(/"|\s/g,"");
		picasaInfor = picasaInfor.replace("loadPicasaAlbum01(","").split(",");	
	}
	else {
		picasaInfor = postSummary.substring(postSummary.indexOf(" loadPicasaAlbumtosimplebox("), postSummary.indexOf(");", postSummary.indexOf(" loadPicasaAlbumtosimplebox("))).replace(/"|\s/g,"");
		picasaInfor = picasaInfor.replace("loadPicasaAlbumtosimplebox(","").split(",");
	
	}	
	console.log("picasaInfor: " + picasaInfor);	
	
	var searchLabel = "http://elivsing.blogspot.com/search/label/";
	var item = '<div id="' + picasaInfor[1] + '" class="separator" style="clear: both; text-align: center;">' 
				+ '</div>'
				+ '<b>Author:</b> '
				+ '<a href="' + searchLabel + 'Author: ' + postTitleAuthor + '" target="_blank">' + postTitleAuthor + '</a><br />' 
				+ '<b>Language:</b> ' 
				+ '<a href="' + searchLabel + 'Language: ' + postTitleLanguage + '" target="_blank">'
				+ postTitleLanguage + '</a><br />' 
				+ '<div id="numPage' + picasaInfor[1] + '"></div>'
				+ '<b>Read:</b> <a href="javascript:void(0);" onclick="openLink(\'' + postUrl + '\')" target="_blank">Online</a><br />'
				+ '<b>Download:</b><br />'
				+ ' <a href="' + postContent + '" target="_blank">MediaFire</a>';
				
	//document.write(postTitle + " -- " + postUrl + " --- " + postSummary);
	document.write(item);
	//$('#contentPost').html(item);
	

	

	
	loadPicasaAlbum(picasaInfor[0], picasaInfor[1], picasaInfor[2]); 
	
}