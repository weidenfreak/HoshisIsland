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
    isTimerRunning:false,
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

        if(core.lastPosition == null || core.lastPosition != null && core.lastPosition.latitude != position.coords.latitude && core.lastPosition.longitude != position.coords.longitude)
        {
            //core.stickyViewModel.location.latitude(position.coords.latitude);

            //core.stickyViewModel.location.longitude(position.coords.longitude);

            core.lastPosition = position.coords;

            core.isTimerRunning = true;

            setTimeout(function(){core.isTimerRunning = false},15000);
        }
    },
    pinSticky:function(){
        var json = ko.mapping.toJSON(core.stickyViewModel);
        $.ajax
        ({
            type: "POST",
            url: 'stickies',
            dataType: 'json',
            async: false,
            data: json,
            success: function () {
                
                console.log("Done!");
            },
            error: function(error){

                console.log(error.message);
            }
        });
    },
    stickyViewModel:{
        /*latitude:ko.observable(),
        longitude:ko.observable(),*/
        title:ko.observable()/*,
        note:ko.observable(),
        color:ko.observable(),
        radius:ko.observable()*/
    }
};

ko.applyBindings(core.stickyViewModel);

core.registerStartupFunction(function(){

    core.startWatchingTheLocation();

    $("#sticky-form").submit(function( event ) {

        event.preventDefault();

        core.pinSticky();
    });
});

/*
 JSON.parse(response.body)
 [{"id"=>8, "title"=>"MyString", "text"=>"Ladida", "created_at"=>"2014-11-08T18:15:49.495Z", "updated_at"=>"2014-11-08T18:15:49.495Z"}, {"id"=>9, "title"=>"MyString", "text"=>"Lorem Ipsum", "created_at"=>"2014-11-08T18:15:49.508Z", "updated_at"=>"2014-11-08T18:15:49.508Z"}]
 */