/**
 * Created by Alexey on 20.11.2016.
 */
define(["backbone"], function () {
    var subject = Backbone.Model.extend({
        defaults: {
            "id": undefined,
            "name": undefined,
            "lecturer": undefined
        }
    });
    var course = Backbone.Model.extend({
        defaults: {
            "course": undefined,
            "subjects": []
        }
    });
    return {
        subject: subject,
        course: course
    };
});