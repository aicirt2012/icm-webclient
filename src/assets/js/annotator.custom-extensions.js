var annotatorCustomExtensions = {};

annotatorCustomExtensions.annotations = [];
annotatorCustomExtensions.currentSelection = undefined;

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
  annotatorCustomExtensions.injectCustomElements();
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
      // trace('create (not yet implemented)', annotation);
      return annotation;
    },

    update: function (annotation) {
      // trace('update (not yet implemented)', annotation);
      return annotation;
    },

    'delete': function (annotation) {
      // trace('destroy (not yet implemented)', annotation);
      return annotation;
    },

    query: function (queryObj) {
      // trace('query', queryObj);
      return {
        meta: {total: annotatorCustomExtensions.annotations.length},
        results: annotatorCustomExtensions.annotations
      };
      // trace("query result", result);
      // return result;
    },

    configure: function (registry) {
      registry.registerUtility(this, 'storage');
    }
  };
};

annotatorCustomExtensions.injectCustomElements = function () {
  // update add dialogue
  var adderContainers = document.getElementsByClassName("annotator-adder");
  for (var index = 0; index < adderContainers.length; index++) {
    var adderContainer = adderContainers[index];
    clearContainer(adderContainer);
    adderContainer.classList.add("annotator-custom-reset");
    var customContainer = getCustomContainer();
    customContainer.appendChild(getButtonPersonNetwork());
    customContainer.appendChild(getButtonTranslation());
    customContainer.appendChild(getButtonWikipedia());
    adderContainer.appendChild(customContainer);
  }
  // update view dialogue
  var viewerContainers = document.getElementsByClassName("annotator-viewer");
  for (index = 0; index < viewerContainers.length; index++) {
    var viewerContainer = viewerContainers[index];
    viewerContainer.classList.add("annotator-custom-reset");
  }

  function clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function getCustomContainer() {
    var customContainer = document.createElement("div");
    customContainer.classList.add('annotator-custom-container');
    customContainer.classList.add('annotator-widget');
    return customContainer;
  }

  function getButtonPersonNetwork() {
    return getButton("Contacts", "OnLookupPersonClick", "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAARtJREFUSMftk01KA0EQhV+HQQ1CjiAhgpfID+Qq4hH0Blm7C94gM7fRTZZR1AQiBnRpsvBzUyNDYyd2RxcG36amqZr3VdfUSP9KFdAFCmAGLIEpkAOdbY0z4Ir1GgJZKqBq/g6cAofAmZ0/ISnmPa/Tay9/4+XbsYDCM3gGGpZrAAsvP4oFzL6Y9xi4tOhrusnTeYClpL2InlbOuf11BTXvvKg8v0g6l9SSdGDxQtJroP5bI8rt6nOgFag5Bp6sLo8FdOzFN6AbqOlZPn6LzGBYgQyAE6BucWB/NUARbW6ArAIJqVznO6CZCmoDI+ARWNkK5+VYzHw7yIYGjoCJQe5DS/H3IbVU41LOuQdJfUm3P969d5Pmr3zs3dcHwEH0ByGVtfIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDEtMTNUMjA6NDY6NDYrMDA6MDABhXqOAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAxLTEzVDIwOjQ2OjQ2KzAwOjAwcNjCMgAAACh0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vdG1wL21hZ2ljay0zYkcyazJvbJorxAgAAAAASUVORK5CYII=");
  }

  function getButtonTranslation() {
    return getButton("Translate", "OnLookupTranslationClick", "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAVZJREFUSMfdlCFPw1AUhe9bUgEkhJCs/Apgih9BEIUAZgqDnpsiVGFImASLADvD/xhBEgSW4YAF2Mg+zCm8NF23diEQrmnvPeede9/pezX794Gi7PrKTw/okimnEnHO/doOCgWwAPSAe2Ci4YruYN/MZs3s3Dk3LDtlCDwBj8CiV59X7QUIp7XiQKfz1KudqXY0lbjE5oBbYAjsAJt6vwNmUty2GreLNlnRB32WZa/AWopTBfpq0AeqRZsc8x0nGXhDWE/PRhHxdeDNa/AORClOR9ienp1JxTc88UOg6dmwJU5NtRvl18pr48S3PV9jrx6rdqW85dvi2dXKE98FBsnkGXhTnADoirskLNRgXSDIEl8GPtKTZ/AqQER+RKMWx3niHq89pkGxO5EST87+Q9oKz7qvO1Hmd103s8DMLpxzAx9Qfim8XnYHydlfHYEnx3eyO/Hn4xMooBHrsMkgAQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMi0yMVQwMjo0MjowMiswMDowMDfIWrMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTItMjFUMDI6NDI6MDIrMDA6MDBGleIPAAAAKHRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy90bXAvbWFnaWNrLXl0bzhoajQ0y9KhnAAAAABJRU5ErkJggg==");
  }

  function getButtonWikipedia() {
    return getButton("Wikipedia", "OnLookupWikipediaClick", "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAXBJREFUSMft08+LzlEUx/FzpxkLjZqhJpEy+0GzsbBnwU52FuxslMU0KWkWNsokPYkUpRTlL5gUhYWaZCXGHyBTY8xs/AjTvCycxe1Gz2PYqOdTZ/F9n/s9537O+X4j+urrnwm3sZKxhOsYxgyeJ3+CSRzDU7zHNYzgMhYzLv2uyZSfetzwcXzHzYp1cLI5dwenujl5hDXsbvg9fMEYRvEMpcpvwQI2dWtwMF3MNnwf1nEhx3a8yZ/B+V52UfAKqxhucg+xjHkMVnwALzHW1htoQSlFRHQiYiQiTjTp2YjYFhELpZS1ih+JiBellKWuDvJGm/EBb5o5788xfcTWxtlkT8Wrly7mLg5XbA7nkp9NNtF+db022IlveJDPh3ADQ3ibMYRbOPrHDbLo/bzt3vzJdiWfSX46xzi40QYHstBrdCq+HV/T4fSGilfF5vEZOxp+F5/qZf9KvVi7EhF7SinvGn41IpZLKSt/5aCv/18/ABubqIpQmAHGAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTEyLTIxVDAyOjQxOjQxKzAwOjAwaV311wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMi0yMVQwMjo0MTo0MSswMDowMBgATWsAAAAodEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL3RtcC9tYWdpY2stSm91dTNTdk7iTmMqAAAAAElFTkSuQmCC");
  }

  function getButton(label, eventName, iconBase64) {
    // build the container
    var customButton = document.createElement("a");
    customButton.classList.add("annotator-custom-action");
    customButton.setAttribute("onclick", "document.dispatchEvent(new CustomEvent(\"" + eventName + "\",{\"detail\":annotatorCustomExtensions.currentSelection.quote}));");
    // add the icon
    var buttonIcon = document.createElement("img");
    buttonIcon.classList.add("annotator-custom-icon");
    buttonIcon.setAttribute("src", "data:image/png;base64, " + iconBase64);
    customButton.appendChild(buttonIcon);
    // add the label
    var buttonLabel = document.createElement("span");
    buttonLabel.appendChild(document.createTextNode(label));
    customButton.appendChild(buttonLabel);
    return customButton;
  }

};
