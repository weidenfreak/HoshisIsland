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
    currentStickiesArray:null,
    createSticky:function(title, timestamp,style,stickyID){

        var sticky = $('<div />');

        sticky.append($('<h1 />').text(title)).append($('<p />').text(text)).append($('<p />').text(timestamp)).addClass("col-md-12 " + style).attr('id', 'sticky' + stickyID);

        if (isRead) {

            sticky.addClass(isRead);
        }
    },
    appendSticky:function(sticky){

        console.log("Add: " + sticky.id);
    },
    removeSticky:function(id){

        console.log("Remove: " + id);
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
                
                alert("Your sticky has been pined!");

                $(".modal").data("bs.modal").hide()
            },
            error: function(error){

                alert("Some problem happened while pinning your sticky!");
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

                alert("Some problem happened while finding the stickies!");
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

        //Enumerable.From(stickiesArray).ForEach(function(c){console.log(c.latitude + " - " + c.longitude)});

        var addingStickies = null;

        var removingStickies = null;

        if(core.currentStickiesArray == null)
        {
            addingStickies = stickiesArray;
        }
        else
        {
            var enumerable = Enumerable.From(stickiesArray);

            var oldEnumerable = Enumerable.From(core.currentStickiesArray);

            addingStickies = enumerable.Where(function(i){return oldEnumerable.Count(function(x){return x.id == i.id;}) == 0}).Reverse().ToArray();

            removingStickies = oldEnumerable.Where(function(i){return enumerable.Count(function(x){return x.id == i.id;}) == 0}).Select(function(y){return y.id;}).ToArray();
        }

        core.currentStickiesArray = stickiesArray;

        if(removingStickies != null) {

            for (var a = 0; a < removingStickies.length; a++) {

                core.removeSticky(removingStickies[b]);
            }
        }

        if(addingStickies != null) {

            for (var b = 0; b < addingStickies.length; b++) {

                core.appendSticky(addingStickies[b]);
            }
        }
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

    core.timelyUpdateFunction();

    core.intervalID = setInterval(core.timelyUpdateFunction,15000);
});