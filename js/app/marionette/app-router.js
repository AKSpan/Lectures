/**
 * Created by Alexey on 19.11.2016.
 */
define(["marionette",
    "requests",//для запуска рэквестов
    "subjects"//для создания коллекции
], function (Mn, requests, subjects, app) {
    var channel = Backbone.Radio.channel('db-requests');
    new requests();//Позволяет использовать request'ы
    var subs = new subjects();
    const Router = {};
    Router.RouterController = {
        showMainPage: function () {
            $.when(channel.request("get:full:data", subs.url)).done(function (data) {
                subs.reset(data);
                require(["appViews", "app"], function (appViews, app) {
                    var application = new app();
                    application.showView(new appViews.coursesCollView({collection: subs}));

                })
            });
        },
        showSubject: function (id) {
            $.when(channel.request("get:subject", id)).done(function (data) {
                require(["appViews", "app"], function (appViews, app) {
                    var application = new app();
                    application.showView(new appViews.subjectView({model: new Backbone.Model(data)}));
                })
            });
        },
        showCourse: function (id) {
            $.when(channel.request("get:course", id)).done(function (data) {
                require(["appViews", "app"], function (appViews, app) {
                    var application = new app();
                    application.showView(new appViews.subjectsCollView({model: new Backbone.Model(data)}));
                })
            });

        }
    };
    Router.ApplicationRouter = Mn.AppRouter.extend({
        controller: Router.RouterController,
        appRoutes: {
            "": "showMainPage",
            "subject/:id": "showSubject",
            "course/:id": "showCourse"
        }
    });
    return Router;
});