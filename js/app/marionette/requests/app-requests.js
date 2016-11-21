/**
 * Created by Alexey on 20.11.2016.
 */
define(["marionette"], function (Mn) {
    return Mn.Object.extend({
        channelName: "db-requests",
        radioRequests: {
            "get:full:data": "getFullData",
            "get:subject": "getSubject",
            "get:course": "geCourse"
        },
        getFullData: function (url) {
            var deffer = $.Deferred();
            $.getJSON(url, function (data) {
                deffer.resolve(data);
            });
            return deffer.promise();
        },
        getSubject: function (id) {
            var deffer = $.Deferred();
            $.getJSON("js/json/subject" + id + ".json", function (data) {
                deffer.resolve(data);
            });
            return deffer.promise();
        },
        geCourse: function (id) {
            var deffer = $.Deferred();
            $.getJSON("js/json/course" + id + ".json", function (data) {
                deffer.resolve(data);
            });
            return deffer.promise();

        }
    });
});