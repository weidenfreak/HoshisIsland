// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require twitter/bootstrap
//= require_tree .

/**
 * Created by rojan on 08/11/14.
 */
var core = {
    watcherID:null,
    lastPosition:null,
    intervalID:null,
    createSticky:function(){

    },
    appendSticky:function(sticky){

    },
    removeSticky:function(id){

    },
    startWatchingTheLocation:function(){

        core.watcherID = navigator.geolocation.watchPosition(core.locationChangeHandler);
    },
    stopWatchingTheLocation:function(){

        if(core.watcherID != null)
        {
            navigator.geolocation.clearWatch(core.watcherID);
        }
    },
    registerStartupFunction:function(startupFunction){

        $(document).ready(startupFunction);
    },
    isBrowserCompatible:function(){

        return Modernizr.cssanimations && Modernizr.geolocation && Modernizr.csstransitions;
    },
    locationChangeHandler:function(position){

        core.stickyViewModel.latitude(position.coords.latitude);

        core.stickyViewModel.longitude(position.coords.longitude);
    },
    timelyUpdateFunction:function() {

        core.getStickies();
    },
    pinSticky:function(){
        var json = JSON.stringify({sticky:ko.mapping.toJS(core.stickyViewModel)});
        $.ajax
        ({
            headers: {
                Accept : "application/json",
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/stickies",
            data: json,
            success: function () {
                
                console.log("Done!");
            },
            error: function(error){

                console.log(error);
            }
        });
    },
    getStickies:function()
    {
        $.ajax
        ({
            headers: {
                Accept : "application/json",
                "Content-Type": "application/json"
            },
            type: "GET",
            url: "/stickies",
            data: {latitude:core.stickyViewModel.latitude(),longitude:core.stickyViewModel.longitude()},
            success: function (stickiesArray) {

                core.updateStickies(stickiesArray)
            },
            error: function(error){

                console.log(error);
            }
        });
    },
    stickyViewModel:{
        latitude:ko.observable(),
        longitude:ko.observable(),
        title:ko.observable(),
        note:ko.observable(),
        pattern:ko.observable(),
        radius:ko.observable()
    },
    updateStickies:function(stickiesArray){

        //core.appendSticky(x)
        //core.removeSticky(x)
        console.log(stickiesArray);
    }
};

ko.applyBindings(core.stickyViewModel);

core.registerStartupFunction(function(){

    core.startWatchingTheLocation();

    $("#sticky-form").submit(function( event ) {

        event.preventDefault();

        core.pinSticky();
    });

    $("[id^='option']").parent().on("click", function(){

        var className = $(this).children("[id^='option']").attr("name");

        core.stickyViewModel.pattern(className);

        $(".modal-content").css("background-image","url('/images/" + className + ".png')");
    });

    core.stickyViewModel.pattern("1");

    $(this).children("[id='option1']").attr("checked","checked");

    $("[id='option1']").parent().addClass("active");

    $(".modal-content").css("background-image","url('/images/1.png')");

    core.intervalID = setInterval(core.timelyUpdateFunction,15000);
});