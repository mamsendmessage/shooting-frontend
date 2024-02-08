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




 



 





/*------------chart------*/




/*------------1harts--------*/



Highcharts.chart('box1chart', {

    colors: ['#78BBDD', '#23429B', '#E8673A'],

    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Games Type',
        align: 'center',
        verticalAlign: 'middle',
        y: 70
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: false,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },

 

    exporting: {
        enabled: false
    },


    series: [{
        type: 'pie',
        name: 'Games Type',
        innerSize: '50%',
        data: [
            ['Normal', 70],
            ['Special sessions', 13],
            ['Competition', 17],
             
        ]
    }]
});











/*------------2harts--------*/

 
 
Highcharts.chart('box2chart', {
    chart: {
        type: 'column',
        inverted: true,
        polar: true
    },
    title: {
        text: ''
    },
    tooltip: {
        outside: true
    },
    pane: {
        size: '85%',
        innerSize: '20%',
        endAngle: 270
    },
    xAxis: {
        tickInterval: 1,
        labels: {
            align: 'right',
            useHTML: true,
            allowOverlap: true,
            step: 1,
            y: 3,
            style: {
                fontSize: '0px'
            }
        },
        lineWidth: 0,
        categories: [

        ]
    },
    yAxis: {
        crosshair: {
            enabled: true,
            color: '#000'
        },
        lineWidth: 0,
        tickInterval: 50,
        reversedStacks: false,
        endOnTick: true,
        showLastLabel: false
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            borderWidth: 0,
            pointPadding: 0,
            groupPadding: 0.20
        }
    },
    legend: { enabled: true },

    exporting: {
        enabled: false
    },




    series: [{
         
        data: [
           
            { y: 225, color: '#E8673A' },
            { y: 300, color: '#23429B' },
            { y: 363, color: '#78BBDD ' },
           
            
        ]
        
    }]


});

 
 

/*------------3harts--------*/

Highcharts.chart('box3chart', {

    colors: ['#78BBDD'],

    title: {
        text: '',
        enabled: false
    },

    xAxis: {
        tickInterval: 1,
        type: 'logarithmic',
        accessibility: {
            rangeDescription: 'Range: 1 to 10'
        }
    },

    yAxis: {
        type: 'logarithmic',
        minorTickInterval: 0.1,
        accessibility: {
            rangeDescription: 'Range: 0.1 to 1000'
        }
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br />',
        pointFormat: 'x = {point.x}, y = {point.y}'
    },

 
    exporting: {
        enabled: false
    },


    series: [{
        data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
        pointStart: 1
    }]
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

 


 
