$(document).ready(function(){

  $( "#applybtn" ).click(function() {
    chrome.storage.sync.set({
      theWord: $("#theword").val(),
      theSlogan: $("#theSlogan").val(),
      kittens: $('#kittens-0').prop('checked'),
      isCustom: $('#isCustom').prop('checked'),
      customImage:  $("#customImage").val()
    }, function() {
      // Update status to let user know options were saved.
      $('#saved').fadeIn().delay(2000).fadeOut(500);
      chrome.tabs.reload();
    });
  });

  $( "#playPause" ).click(function() {
      chrome.storage.sync.get({paused: false},function(res){
        var state = !res.paused;
        chrome.storage.sync.set({paused: state},function(){
          window.close();
          chrome.tabs.reload();
        });
      });

  });

  $("#kittens-0").click(function(){
    if($(this).prop('checked')){
      $('#customGroup').show();
    }else{
      $('#customGroup').hide();
    }
  });

  $("#isCustom").click(function(){
    $('#customImage').prop('disabled', function(i, v) { return !v; });
  });

  chrome.storage.sync.get(function(items) {
    $('#theword').val(items.theWord);
    $('#theSlogan').val(items.theSlogan);
    $('#kittens-0').prop('checked', items.kittens);
    $('#isCustom').prop('checked', items.isCustom);
    $('#customImage').val(items.customImage);

    if(items.kittens){
      $('#customGroup').show();
    }

    if(items.isCustom){
      $('#customImage').prop('disabled', false);
    }

    if(!items.paused){
      $('#paused').hide();
      $('#playPauseText').text("Pause");
      $('#playPauseIcon').addClass('glyphicon-pause');
    }else{
      $('#paused').show();
    }
  });

  $("form").submit(function(e){
      e.preventDefault();
  });

});
