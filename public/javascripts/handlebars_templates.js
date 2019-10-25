this["JST"] = this["JST"] || {};

this["JST"]["album"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#\" class=\"album_link\"><img src=\""
    + alias4(((helper = (helper = helpers.cover || (depth0 != null ? depth0.cover : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cover","hash":{},"data":data}) : helper)))
    + "\" /><h2>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2><h3>"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</h3></a>";
},"useData":true});

this["JST"]["error"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"error_message\"><h1>Oops!</h1><h2>That Album Doesn't Exist</h2></div>";
},"useData":true});

this["JST"]["index"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul></ul>";
},"useData":true});

this["JST"]["track"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<dl><dt><a href=\"#\" class=\"track\" data-stream=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></dt><dd>"
    + alias4(((helper = (helper = helpers.length || (depth0 != null ? depth0.length : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"length","hash":{},"data":data}) : helper)))
    + "</dd></dl><div class=\"play_icon\" data-stream=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\"></div>";
},"useData":true});

this["JST"]["tracks"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h2><a href=\""
    + container.escapeExpression(((helper = (helper = helpers.videoLink || (depth0 != null ? depth0.videoLink : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"videoLink","hash":{},"data":data}) : helper)))
    + "\" id=\"videoLink\" target=\"_blank\">Video Link!!!</a></h2>";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<a href="
    + alias2(alias1((depth0 != null ? depth0.link : depth0), depth0))
    + " target=\"_blank\">"
    + alias2(alias1((depth0 != null ? depth0.genre : depth0), depth0))
    + "</a> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col1\"><div class=\"col1-inner\"><h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1><h2>by <a href=\"\" class=\"back_to_home\"><strong>"
    + alias4(((helper = (helper = helpers.artist || (depth0 != null ? depth0.artist : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"artist","hash":{},"data":data}) : helper)))
    + "</strong></a></h2><div class=\"download\"><h3><a href=\""
    + alias4(((helper = (helper = helpers.downloadURL || (depth0 != null ? depth0.downloadURL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"downloadURL","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Digital Album</a></h3><h2><a href=\""
    + alias4(((helper = (helper = helpers.downloadURL || (depth0 != null ? depth0.downloadURL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"downloadURL","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Free Download</a></h2>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.videoLink : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div><ul id=\"tracks_list\"></ul><ul id=\"album_info\"><li><h3>released "
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</h3></li><li><h3>tags: "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.tags : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</h3></li><li><h3><strong>&copy;</strong> All Rights Reserved</h3></li></ul></div></div><!----><div class=\"col2\"><img src=\""
    + alias4(((helper = (helper = helpers.cover || (depth0 != null ? depth0.cover : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cover","hash":{},"data":data}) : helper)))
    + "\" class=\"featured_album_cover\"/><label for=\"share\"><img src=\"/images/share.png\"></img><h2>Share</h2></label><input type=\"checkbox\" name=\"share\" id=\"share\" hidden/><div id=\"share_dropdown\"><div id=\"share_arrow_border\"></div><div id=\"share_arrow\"></div><ul id=\"social_media_logos\"><li><a href=\"https://www.facebook.com/\" target=\"_blank\"><img src=\"/images/icon_facebook.png\"></img><a/></li><li><a href=\"https://twitter.com/\" target=\"_blank\"><img src=\"/images/icon_twitter.png\"></img></a></li><li><a href=\"https://www.instagram.com/\" target=\"_blank\"><img src=\"/images/icon_instagram.png\"></img></a></li><li><a href=\"https://www.google.com/\" target=\"_blank\"><img src=\"/images/icon_google.png\"></img></a></li></ul><label>Email<input type=\"text\" value=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" /></label></div></div>";
},"useData":true});
