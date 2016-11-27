/**
 * Created by Alexey on 20.11.2016.
 */
define(["marionette", "models",
    "tpl!/Lectures/templates/add-subject.tpl",
    "tpl!/Lectures/templates/main.tpl"], function (Mn, models,
                                                   addSubjTpl,
                                                   mainPageTpl) {

    var mainPage = Mn.View.extend({
        template: mainPageTpl,
        ui: {
            addNew: "#add-new-data"
        },
        events: {
            "click @ui.addNew": "addNew"
        },
        addNew: function () {
            location.href = "#add-new"
        },
        regions: {
            mainBlock: "#main-block"
        }
    });
    /**
     * Отображение одного предмета
     */
    var subjectView = Mn.View.extend({
        className: 'subject-view',
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
        className: 'empty-subject-view',
        tagName: 'h1',
        template: _.template("Nothing to show!")
    });
    /**
     * Вью для отображения курса и всех предметов
     * @type {void|*}
     */
    var subjectsCollView = Mn.CollectionView.extend({
        className: 'subjects-coll-view',
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
        className: 'courses-list-view',
        emptyView: emptySubjectView,
        childView: subjectsCollView
    });

    /**
     * Страница с добавленим файлов
     */
    var addNew = Mn.View.extend({
        template: addSubjTpl,
        choosenFiles:null,
        ui: {
            sendDataBtn: "#js-send-new-data",
            chooseFilesBtn: '#js-choose-files'
        },
        events:{
            "click @ui.sendDataBtn":"sendFiles",
            "change @ui.chooseFilesBtn":"chooseFiles"
        },
        sendFiles:function () {
            console.log('send')
            console.log( this.choosenFiles)
            console.log( this.choosenFiles.length)
            var formData = new FormData();
            //for each entry, add to formdata to later access via $_FILES["file" + i]
            for (var i = 0, len = this.choosenFiles.length; i < len; i++) {
                formData.append("file" + i, this.choosenFiles[i]);
            }

            //send formdata to server-side
            $.ajax({
                url: "file-upload.php", // our php file
                type: 'post',
                data: formData,
                dataType: 'html', // we return html from our php file
                async: true,
                processData: false,  // tell jQuery not to process the data
                contentType: false,   // tell jQuery not to set contentType
                success : function(data) {
                   // $('#upload-result').append('<div class="alert alert-success"><p>File(s) uploaded successfully!</p><br />');
                    //$('#upload-result .alert').append(data);
                },
                error : function(request) {
                    console.log(request.responseText);
                }
            });

        },
        chooseFiles:function () {
            this.choosenFiles = this.ui.chooseFilesBtn.prop("files");1
        }
    });
    return {
        subjectView: subjectView,
        emptySubjectView: emptySubjectView,
        subjectsCollView: subjectsCollView,
        coursesCollView: coursesCollView,
        addNew: addNew,
        mainPage: mainPage
    };
});