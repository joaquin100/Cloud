$(document).ready(function() {
  $("#version").html("v0.14");
  
  $("#searchbutton").click( function (e) {
    displayModal();
  });
  
  $("#searchfield").keydown( function (e) {
    if(e.keyCode == 13) {
      displayModal();
    }	
  });

function displayModal() {
    $(  "#myModal").modal('show');
    $("#status").html("Searching...");
    $("#dialogtitle").html("Search for: "+$("#searchfield").val());
    $("#previous").hide();
    $("#next").hide();
    $.getJSON('/search/' + $("#searchfield").val() , function(data) {
      renderQueryResults(data);
    });

}

let imagesToLoad = []
let currentImageIndex = 0;


  
  $("#next").click( function(e) {
    currentImageIndex++;
    let max_images_to_render = imagesToLoad.length - (currentImageIndex*4);
    let i;
    for(i = 0; i < max_images_to_render; i++) {
      $(`#img${i}`).attr("src", imagesToLoad[i + (currentImageIndex*4)]);
      $(`#img${i}`).show(); 
    }

    for(; i <= 3; i++) {
      $(`#img${i}`).hide();
    }
    $("#previous").show();
    if(max_images_to_render < 4) $(this).hide();


  });
  
  $("#previous").click( function(e) {
    currentImageIndex--;
    for(let i = 0; i < 4; i++) {
      $(`#img${i}`).attr("src", imagesToLoad[i + (currentImageIndex*4)]);
      $(`#img${i}`).show();
    }
    $("#next").show();
    if(currentImageIndex == 0) $(this).hide();
  
  });

  function renderQueryResults(data) {
    let imagesToRender = [];
    if (data.error != undefined) {
      $("#status").html("Error: "+data.error);
    } 
    else {

      $("#status").html(""+data.num_results+" result(s)");

      let max_images_to_render = data.num_results;
      if(max_images_to_render > 4) max_images_to_render = 4;

      let i;
      for(i=0; i<max_images_to_render; i++){
        console.log(data);
        imagesToRender = data.results;
        $(`#img${i}`).attr("src", imagesToRender[i]);
      }

      for(; i <= 3; i++) {
        $(`#img${i}`).hide();
      }

      console.log("i",i);
      
      if(data.num_results > 4) {
        $("#next").show();
      }

      $("#next").show();
      $("#previous").show();
      
     }
   }
});
