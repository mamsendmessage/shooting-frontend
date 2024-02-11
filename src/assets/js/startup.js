(function(window) {
    "use strict";

    $.exists = function(selector) {
        return $(selector).length > 0;
    };

    // All Funtions




})(window);


/*--------Loader----*/

window.onload = function() {
    var loadTime =
        window.performance.timing.domContentLoadedEventEnd -
        window.performance.timing.navigationStart;
    if (typeof loadTime == "number") {
        setTimeout(function() {
            $("body").addClass("loaded");
        }, loadTime);
    } else {
        setTimeout(function() {
            $("body").addClass("loaded");
        }, 1);
    }
};





/*--------search-----*/


$(document).ready(function() {
    $(".search__input").focus(function() {
        $(".search-result").toggleClass("show");
    });

    // When clicking anywhere outside the .search__input
    $(document).mousedown(function(e) {
        if (!$(e.target).closest(".search__input").length) {
            $(".search-result").removeClass("show");
        }
    });
});







$(document).ready(function() {
    var maxHeight = 0;

    $(".eqh").each(function() {
        if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });

    $(".eqh").height(maxHeight);
});




$(document).ready(function() {
    $(".btnExpandIcon").click(function() {

        $(this).parents(".towBOX").toggleClass("expands");
        return false;
    });
});


$(".scroll-all").slimScroll({
    height: "100%",
});







$(".scrolluser").slimScroll({
    height: "500px",
});




 







 










 





 






 

 


 


 

function showDialogWithPassingParams() {
    
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
       
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
}

 


 
