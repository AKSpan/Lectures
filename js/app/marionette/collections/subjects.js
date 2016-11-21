/**
 * Created by Alexey on 20.11.2016.
 */
define(["models"], function (subject) {
    return Backbone.Collection.extend({
        url: "js/json/mainpage.json",
        model: subject.course
    });
});