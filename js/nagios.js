$(function(){
  chrome.storage.local.get(["munin_groups", "munin_url"], function(result){
    var munin_url = result.munin_url;
    var munin_groups = result.munin_groups;
    console.log(munin_groups);

    var access_url = new URL(location.href);
    var params = {};
    $.each(access_url.search.substr(1).split('&'), function(){
      var kv = this.split('=');
      params[kv[0]] = kv[1];
    });

    var munin_url_obj = new URL(munin_url);
    munin_url_obj.pathname = '/munin-cgi/munin-cgi-graph';
    var graph_base_url = munin_url_obj.toString();

    if(("host" in params) && params["host"] !== "all"){
      var host_top = munin_url + '/' +munin_groups[params["host"]] + '/' + params["host"] + '/index.html';
      var graph_path = graph_base_url + '/' + munin_groups[params["host"]] + '/' + params["host"];

      $("body").append('<a href="' + host_top + '"><h2>munin</h2></a>');
      var table = $('<table>');
      var tr1 = $('<tr>')
        .append('<td><img src="'+graph_path+'/cpu-day.png"></td>')
        .append('<td><img src="'+graph_path+'/memory-day.png"></td>');
      var tr2 = $('<tr>')
        .append('<td><img src="'+graph_path+'/load-day.png"></td>')
        .append('<td><img src="'+graph_path+'/diskstats_iops-day.png"></td>');
      table.append(tr1).append(tr2);
      $("body").append(table);
    }else if(params["hostgroup"] === "all" && params["style"] === "hostdetail"){
      $('table.status td.statusHOSTUP[align="left"] a[href^=extinfo]').each(function(){
        var host = $(this).text();
        $(this).after(' / <a href="'+munin_url+'/'+munin_groups[host]+'/'+host+'/index.html">munin</a>');
      });
    }
  });
});
