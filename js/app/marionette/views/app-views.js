/**
 * Created by Alexey on 20.11.2016.
 */
define(["marionette", "models"], function (Mn, models) {
    /**
     * Отображение одного предмета
     */
    var subjectView = Mn.View.extend({
        className:'subject-view',
        model: models.subject,
        tagName: 'a',
        template: _.template("<%= name %>"),
        attributes: function () {
            return {
                href: '#subject/' + this.model.get('id'),
                name: this.model.get('name'),
                lecturer: this.model.get('lecturer')
            };
        },
        onRender: function () {
            this.$el.append('</br>')
        }
    });
    /**
     * Вью для пустых данных
     * @type {void|*}
     */
    var emptySubjectView = Mn.View.extend({
        className:'empty-subject-view',
        tagName: 'h1',
        template: _.template("Nothing to show!")
    });
    /**
     * Вью для отображения курса и всех предметов
     * @type {void|*}
     */
    var subjectsCollView = Mn.CollectionView.extend({
        className:'subjects-coll-view',
        childView: subjectView,
        course: undefined,
        initialize: function (options) {
            this.course = options.model.get('course');
            this.collection = new Backbone.Collection(options.model.get('subjects'));
        },
        onRender: function () {
            this.$el.prepend('<h3><a href="#course/' + this.course + '">' + this.course + ' курс</a></h3>');
        }
    });
    /**
     * Вью для отображения всех курсов
     * @type {void|*}
     */
    var coursesCollView = Mn.CollectionView.extend({
        className:'courses-list-view',
        emptyView: emptySubjectView,
        childView: subjectsCollView
    });
    /**
     *
     */
    var mainPage = Mn.View.extend({
        template: _.template('#main-block')
    });
    return {
        subjectView: subjectView,
        emptySubjectView: emptySubjectView,
        subjectsCollView: subjectsCollView,
        coursesCollView: coursesCollView,
        mainPage: mainPage,
    };
});