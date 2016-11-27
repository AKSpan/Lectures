/**
 * Created by Alexey on 19.11.2016.
 */
define([
    "marionette",
    "appRouter","appViews"
], function (Mn, Router, appViews) {
    /**
     * Главная вью - подобие layoutView
     */
    var mainPage = new appViews.mainPage();
    return {
        Application: Mn.Application.extend({
            region: 'body',
            onStart: function () {
                new Router.ApplicationRouter();
                Backbone.history.start();
                this.showView(mainPage)

            }
        }),
        MainView: mainPage
    };
});