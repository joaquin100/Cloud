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

  var imagesToRender = []
  var currentImageIndex = 0;
  
  $("#next").click( function(e) {
    currentImageIndex++;
    let max_images_to_render = imagesToRender.length - (currentImageIndex*2);
    let i;
    for(i = 0; i < max_images_to_render; i++) {
      $(`#img${i}`).attr("src", imagesToRender[i + (currentImageIndex*2)]);
      $(`#img${i}`).show(); 
    }

    for(; i < 2; i++) {
      $(`#img${i}`).hide();
    }

    console.log("i",i);

    $("#previous").show();
    if(i <= 2) $(this).hide();


  });
  
  $("#previous").click( function(e) {
    currentImageIndex--;
    for(let i = 0; i < 2; i++) {
      $(`#img${i}`).attr("src", imagesToRender[i + (currentImageIndex*2)]);
      $(`#img${i}`).show();
    }
    $("#next").show();
    if(currentImageIndex == 0) $(this).hide();
  
  });

  function renderQueryResults(data) {
    
    if (data.error != undefined) {
      $("#status").html("Error: "+data.error);
    } 
    else {
      currentImageIndex = 0;
      imagesToRender = [];
      let images = document.getElementsByTagName("img");

      //Limpiando de imágenes anteriores
      for(let i=0; i < images.length; i++){
        //console.log("limpiando imagen");
        images[i].removeAttribute("src");
      }

      imagesToRender = data.results;
      console.log("images to render array", imagesToRender);

      $("#status").html(""+data.num_results+" result(s)");

      let max_images_to_render = data.num_results;
      if(max_images_to_render > 2) max_images_to_render = 2;


      for(let i=0; i<max_images_to_render; i++){
        console.log(imagesToRender[i]);
        $(`#img${i}`).attr("src", imagesToRender[i]);
      }

      console.log("data.num_results:",data.num_results);
      
      if(data.num_results > 2) {
        $("#next").show();
        //currentImageIndex = 2;
      }
      
     }
   }
});
