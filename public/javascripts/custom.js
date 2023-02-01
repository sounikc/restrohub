// $(".card-body").on("click", function(){
//     getUser($(this).attr('data-id'))
// })
$(".adddishbtn").on("click", function(){
var datastring = $("#adddishform").serialize();
$.ajax({
  type: "POST",
  url: "/dishes",
  data: datastring,
  success: function(res) {
    $('#msg').text(`${res.item} Sucessfully Added!`)
    $('.addmsgdiv').css('display','inline-block');
    console.log(typeof(res));
    console.log(`${res.item} Sucessfully Added!`);
  }
});
})

$(".updatedishbtn").on("click", function(){
  var datastring = $("#updatedishform").serialize();
  $.ajax({
    type: "PUT",
    url: "/dishes/"+$('#did').val(),
    data: datastring,
    success: function(res) {
      $('#msg').text(`${res.item} Sucessfully Updated!`)
      $('.addmsgdiv').css('display','inline-block');
      console.log(typeof(res));
      console.log(`${res.item} Sucessfully Updated!`);
    }
  });
  })

$(".delete-action").on("click", function(){
  var id = $(this).attr('data-id');
  $.ajax({
    type: "DELETE",
    url: "/dishes/"+id,
    success: function(res) {
      $('#msg').text(`${res.item} Sucessfully Deleted!`)
      $('.addmsgdiv').css('display','inline-block');
      console.log(typeof(res));
      console.log(`${res.item} Sucessfully Deleted!`);
    }
  });
})

async function getUser(cid) {
  try {
    const response = await axios.get('http://127.0.0.1:3000/dishes/?cid='+cid);
    console.log(response.data);
  } catch (error) {
    if (error.response) { // get response with a status code not in range 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) { // no response
      console.log(error.request);
      // instance of XMLHttpRequest in the browser
      // instance ofhttp.ClientRequest in node.js
    } else { // Something wrong in setting up the request
      console.log('Error', error.message);
    }
  }
}

$("#reg-btn").on("click", function(){
  var datastring = $("#registration").serialize();
  console.log(datastring)
  $.ajax({
    type: "POST",
    url: "/users/register",
    data: datastring,
    success: function(res, status, xhr) { 
      console.log(res);
      // localStorage.setItem("restro-auth-token", xhr.getResponseHeader("x-jwt-auth-token"));
    },
    error: function(res) {
      console.log("Error in API call");
    }
  });
  })

  $("#login-btn").on("click", function(){
    var datastring = $("#login").serialize();
    console.log(datastring)
    $.ajax({
      type: "POST",
      url: "/users/login",
      data: datastring,
      success: function(res, status, xhr) { 
        if(res._id){
          window.location.href = "http://localhost:3000/";
        }
      },
      error: function(res) {
        $('#msg').text(`${res.responseText}`)
        $('.alert-danger').css('display','inline-block');
      }
    });
    })