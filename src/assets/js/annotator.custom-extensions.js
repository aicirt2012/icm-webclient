var annotatorCustomExtensions = {};

/**
 * function:: initAnnotator()
 *
 * Used to initialize the annotator framework with the custom extensions included
 *
 * Use as an extension module::
 *     app.include(annotatorCustomExtensions.parentwindow);
 */
annotatorCustomExtensions.initAnnotator = function () {
  var app = new annotator.App();
  app.include(annotator.ui.main);
  app.include(annotatorCustomExtensions.parentwindow);
  app.start()
    .then(function () {
      app.annotations.load({});
    });
};

/**
 * function:: parentwindow()
 *
 * A storage component that can be used to communicate details of the annotation
 * to the parent window (when Annotator is run in e.g. an iFrame).
 *
 * Use as an extension module::
 *     app.include(annotatorCustomExtensions.parentwindow);
 */
annotatorCustomExtensions.parentwindow = function () {
  function trace(action, annotation) {
    var copyAnno = JSON.parse(JSON.stringify(annotation));
    console.debug("annotator.storage.parentwindow: " + action, copyAnno);
  }

  var annotations = [];

  return {
    create: function (annotation) {
      // annotation.id = id();
      trace('create (not yet implemented)', annotation);
      return annotation;
    },

    update: function (annotation) {
      trace('update (not yet implemented)', annotation);
      return annotation;
    },

    'delete': function (annotation) {
      trace('destroy (not yet implemented)', annotation);
      return annotation;
    },

    query: function (queryObj) {
      trace('query', queryObj);
      var result = {
        meta: {total: annotations.length},
        results: annotations
      };
      trace("query result", result);
      return result;
    },

    configure: function (registry) {
      registry.registerUtility(this, 'storage');
    }
  };
};
