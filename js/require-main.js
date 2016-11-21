/**
 * Created by Alexey on 19.11.2016.
 */
requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: "vendors/jquery",
        "jquery-ui": "vendors/jquery-ui",
        underscore: "vendors/underscore",
        backbone: "vendors/backbone",
        'backbone.radio': "vendors/backbone.radio",
        localstorage: "vendors/backbone.localStorage",
        marionette: "vendors/backbone.marionette",

        /*Мои скрипты*/
        app: "app/app",                                     //Скрипт запуска приложения
        "appRouter": "app/marionette/app-router",           //Роутер приложения
        "models": "app/marionette/models/subject",         //Модель предмета
        "subjects": "app/marionette/collections/subjects",  //Коллекция предметов
        "requests": "app/marionette/requests/app-requests",  //Скрипт запросов для получения данных
        "appViews": "app/marionette/views/app-views",        //Скрипт с представления для приложения
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        marionette: {
            deps: ["backbone", 'backbone.radio'],
            exports: "Marionette"
        },
        "jquery-ui": ["jquery"],
        localstorage: ["backbone"]
    }
});

require(["app"], function (app) {
    new app().start();
});