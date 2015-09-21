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

      first_name = $('form #first_name').val()
      last_name = $('form #last_name').val()
      address = $('form #address').val()
      city = $('form #city').val()
      state = $('form #state').val()
      zip = $('form #zip').val()

      type = $(this).attr('method');
      url = $(this).attr('action')

      $(".errors").empty()

      $.ajax({
          type: type,
          url: url,
          data: valuesToSubmit,
          dataType: "JSON"
      }).success(function(json){
          location.reload();
          console.log("success", json);
      }).fail(function( response, other, other2){
          errors = JSON.parse(response.responseText)

          $('form #first_name').val(first_name)
          if (errors.first_name){
            $('#first_name_div').append("<p class='errors'>"+errors.first_name+"</p>")
          }

          $('form #last_name').val(last_name)
          if (errors.last_name){
            $('#last_name_div').append("<p class='errors'>"+errors.last_name+"</p>")
          }

          $('form #address').val(address)
          if (errors.address){
            $('#address_div').append("<p class='errors'>"+errors.address+"</p>")
          }

          $('form #city').val(city)
          if (errors.city){
            $('#city_div').append("<p class='errors'>"+errors.city+"</p>")
          }

          $('form #state').val(state)
          if (errors.state){
            $('#state_div').append("<p class='errors'>"+errors.state+"</p>")
          }

          $('form #zip').val(zip)
          if (errors.zip){
            $('#zip_div').append("<p class='errors'>"+errors.zip+"</p>")
          }

          $('#myModal').modal('show');

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
    $('form').attr('method', 'POST')
    // $('form').attr('action','voters')

  })

});
