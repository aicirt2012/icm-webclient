/**
 * function:: parentwindow()
 *
 * A storage component that can be used to communicate details of the annotation
 * to the parent window when Annotator is rin in e.g. an iFrame.
 *
 * Use as an extension module::
 *
 *     app.include(annotator.storage.parentwindow);
 *
 */
exports.parentwindow = function () {
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
      return {
        meta: {total: 1},
        results: [
          {
            "quote": "Google",
            "text": "test_injection",
            "ranges": [
              {
                "end": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[2]/td[1]",
                "endOffset": 89,
                "start": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[2]/td[1]",
                "startOffset": 83
              },
              {
                "end": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[2]/td[1]",
                "endOffset": 499,
                "start": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[2]/td[1]",
                "startOffset": 493
              },
              {
                "end": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[3]/td[1]",
                "endOffset": 35,
                "start": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[4]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]/tr[3]/td[1]",
                "startOffset": 29
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
                "endOffset": 125,
                "start": "/table[1]/tbody[1]/tr[2]/td[2]/table[1]/tbody[1]/tr[7]/td[1]/table[1]/tbody[1]/tr[1]/td[1]",
                "startOffset": 119
              }
            ]
          }
        ]
      };
    },

    configure: function (registry) {
      registry.registerUtility(this, 'storage');
    }
  };
};
