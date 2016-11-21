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

        /*��� �������*/
        app: "app/app",                                     //������ ������� ����������
        "appRouter": "app/marionette/app-router",           //������ ����������
        "models": "app/marionette/models/subject",         //������ ��������
        "subjects": "app/marionette/collections/subjects",  //��������� ���������
        "requests": "app/marionette/requests/app-requests",  //������ �������� ��� ��������� ������
        "appViews": "app/marionette/views/app-views",        //������ � ������������� ��� ����������
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