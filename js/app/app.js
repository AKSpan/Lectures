/**
 * Created by Alexey on 19.11.2016.
 */
define([
    "marionette",
    "appRouter"
], function (Mn, Router) {
    return Mn.Application.extend({
        region: '#main-block',
        onStart: function () {
            new Router.ApplicationRouter();
            Backbone.history.start();

        }
    });
});