// mixpanel Tracking code for docs.near.org
  (function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,
    0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="get_distinct_id disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
    for(h=0;h<l.length;h++)c(e,l[h]);var f="set set_once union unset remove delete".split(" ");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
    MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);

    mixpanel.init("df164f13212cbb0dfdae991da60e87f2", {batch_requests: true})
    // super event property
    mixpanel.register({'timestamp': new Date().toString(), '$referrer': document.referrer});

window.addEventListener("load", function(){

  //user profile setting
  let id = mixpanel.get_distinct_id();
  mixpanel.identify(id);
  mixpanel.people.set_once({'first_touch_source': document.referrer, 'date_of_first_touch': new Date().toString()});
  
  // track and get duration for all pages
  mixpanel.track('Viewed Page', {'page': window.location.pathname});
  mixpanel.time_event('Viewed Page');

  // track links
  mixpanel.track_links("a", "Link Click", {'page': window.location.pathname});

  // track copied code
  const copyCode = () => {
    mixpanel.track("Copied code", {'page': window.location.pathname})
    mixpanel.people.increment("copy_code")
  }

  let copyButtons = document.querySelectorAll("button")
  for(let i=0;i<copyButtons.length;i++){
    copyButtons[i].onclick = copyCode;
  }
  
  // search box
  let input = document.querySelector('button.DocSearch');
  let time = 0
  input.addEventListener('input', function (event) {
    clearTimeout(time);
     time = setTimeout(function() {
       trackSearch(event)
    }, 1000);
  });
  function trackSearch(event){
    let value = event.target.value;
    if(value !== ""){
      mixpanel.people.increment('search')
      mixpanel.track("Search the docs", {'content': value})
    }
  }

  // UTM
  function getQueryParam(url, param) {
    // Expects a raw URL
    param = param.replace(/[[]/, "\[").replace(/[]]/, "\]");
    let regexS = "[\?&]" + param + "=([^&#]*)"
    let regex = new RegExp( regexS )
    let results = regex.exec(url)
    if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
      return '';
    } 
    return decodeURIComponent(results[1]).replace(/\W/gi, ' ');
  }

  function campaignParams() {
    var campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' ')
        , kw = ''
        , params = {}
        , first_params = {};
    var index;
    for (index = 0; index < campaign_keywords.length; ++index) {
      kw = getQueryParam(document.URL, campaign_keywords[index]);
      if (kw.length) {
        params[campaign_keywords[index] + ' [last touch]'] = kw;
      }
    }
    for (index = 0; index < campaign_keywords.length; ++index) {
      kw = getQueryParam(document.URL, campaign_keywords[index]);
      if (kw.length) {
        first_params[campaign_keywords[index] + ' [first touch]'] = kw;
      }
    }
    mixpanel.people.set(params);
    mixpanel.people.set_once(first_params);
    mixpanel.register(params);
  }

  campaignParams()
});
