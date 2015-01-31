$(function(){
  var groups = {};
  $("ul.groupview > li").each(function(){
    var group = $(this).find("span.domain a").text();
    $(this).find("ul li span.host a").each(function(i, a){
      var host = $(a).text();
      groups[host] = group;
    });
  });
  console.log(groups);

  chrome.storage.local.set({"munin_groups": groups, "munin_url": location.href});
});
