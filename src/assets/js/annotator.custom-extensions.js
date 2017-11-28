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
        meta: {total: 1},
        results: [
          {
            "quote": "Google",
            "text": "test_injection",
            "ranges": [
              {
                "end": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[2]/td[1]",
                "endOffset": 64,
                "start": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[2]/td[1]",
                "startOffset": 58
              },
              {
                "end": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[2]/td[1]",
                "endOffset": 234,
                "start": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[2]/td[1]",
                "startOffset": 228
              },
              {
                "end": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[3]/td[1]",
                "endOffset": 10,
                "start": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[3]/td[1]",
                "startOffset": 4
              },
              {
                "end": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[5]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/a[1]",
                "endOffset": 6,
                "start": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[5]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/a[1]",
                "startOffset": 0
              },
              {
                "end": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[7]/td[1]/table[1]/tbody[1]/tr[3]/td[1]/div[1]",
                "endOffset": 13,
                "start": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[7]/td[1]/table[1]/tbody[1]/tr[3]/td[1]/div[1]",
                "startOffset": 7
              },
              {
                "end": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[7]/td[1]/table[1]/tbody[1]/tr[1]/td[1]",
                "endOffset": 107,
                "start": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[7]/td[1]/table[1]/tbody[1]/tr[1]/td[1]",
                "startOffset": 101
              }
            ]
          }
        ]
      };
      trace("query result", result);
      return result;
    },

    configure: function (registry) {
      registry.registerUtility(this, 'storage');
    }
  };
};
