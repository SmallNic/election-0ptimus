// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function(){

  $('form').on("submit", function(event) {
      event.preventDefault();
      var valuesToSubmit = $(this).serialize();
      console.log("valuesToSubmit =", valuesToSubmit)
      type = $(this).attr('method');
      console.log("action", $(this).attr('action'))
      console.log("method", type)
      $.ajax({
          type: type,
          url: $(this).attr('action'), //sumbits it to the given url of the form
          data: valuesToSubmit,
          dataType: "JSON" // you want a difference between normal and ajax-calls, and json is standard
      }).success(function(json){
          // $('#myModal').modal('hide');
          location.reload();
          console.log("success", json);
      }).fail(function(){

          console.log("failure")
      });
  });

  $('.edit').on("click", function(event) {
      event.preventDefault();
      var voter_id = $(this).attr("id")
      $('form').attr('method','put')
      $('form').attr('action','voters/'+voter_id)

      $.ajax({
          type: "GET",
          url: '/voters/'+voter_id,
          dataType: "JSON"
      }).success(function(response){
          $('#myModal').modal('show');
          $('form #first_name').val(response.first_name)
          $('form #last_name').val(response.last_name)
          $('form #address').val(response.address)
          $('form #city').val(response.city)
          $('form #state').val(response.state)
          $('form #zip').val(response.zip)
          console.log("success");
      }).fail(function(){
          console.log("failure")
      });
  });

  $('#new-voter').on('click', function(){
    $('form').attr('method', 'post')
    $('form').attr('action','voters')

  })

});
