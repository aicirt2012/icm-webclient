var annotatorCustomExtensions = {};

annotatorCustomExtensions._framework = undefined;
annotatorCustomExtensions.annotations = [];
annotatorCustomExtensions.annotationStore = [];
annotatorCustomExtensions.displayAnnotations = false;
annotatorCustomExtensions.currentSelection = undefined;

document.addEventListener('onSetDisplayAnnotations', function (event) {
  annotatorCustomExtensions.setDisplayAnnotations(event.detail);
}, false);

/**
 * function:: setAnnotations(annotation[])
 *
 * Used to set the annotations that the framework can then display
 *
 * Use as a function::
 *     annotatorCustomExtensions.setAnnotations(annotations);
 */
annotatorCustomExtensions.setAnnotations = function (annotations) {
  annotatorCustomExtensions.annotationStore = annotations;
  annotatorCustomExtensions.setDisplayAnnotations(annotatorCustomExtensions.displayAnnotations);
};

/**
 * function:: setDisplayAnnotations(boolean)
 *
 * Used to control the display of the annotations in the store
 *
 * Use as a function::
 *     annotatorCustomExtensions.setDisplayAnnotations(true);   // to show
 *     annotatorCustomExtensions.setDisplayAnnotations(false);  // to hide
 */
annotatorCustomExtensions.setDisplayAnnotations = function (isDisplayed) {
  annotatorCustomExtensions.displayAnnotations = isDisplayed;
  if (annotatorCustomExtensions.displayAnnotations) {
    annotatorCustomExtensions.annotations = annotatorCustomExtensions.annotationStore;
  } else {
    annotatorCustomExtensions.annotations = [];
  }
  if (annotatorCustomExtensions._framework) {
    annotatorCustomExtensions.destroyAnnotator();
    annotatorCustomExtensions.initAnnotator();
  }
};

/**
 * function:: initAnnotator()
 *
 * Used to initialize the annotator framework with all custom extensions included
 *
 * Use as a function::
 *     annotatorCustomExtensions.initAnnotator();
 */
annotatorCustomExtensions.initAnnotator = function () {
  if (!annotatorCustomExtensions._framework) {
    var app = new annotator.App();
    app.include(annotator.ui.main);
    app.include(annotatorCustomExtensions.parentwindow);
    app.start()
      .then(function () {
        app.annotations.load({});
      });
    annotatorCustomExtensions.injectCustomElements();
    annotatorCustomExtensions._framework = app;
  }
};

/**
 * function:: destroyAnnotator()
 *
 * Used to destroy the annotator framework
 *
 * Use as a function::
 *     annotatorCustomExtensions.destroyAnnotator();
 */
annotatorCustomExtensions.destroyAnnotator = function () {
  if (annotatorCustomExtensions._framework) {
    annotatorCustomExtensions._framework.destroy();
    annotatorCustomExtensions._framework = undefined;
  }
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
    customContainer.appendChild(getVerticalSeparator());
    customContainer.appendChild(getButtonWikipedia());
    customContainer.appendChild(getVerticalSeparator());
    customContainer.appendChild(getButtonTranslation());
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
    return getButton("Find contacts", "OnLookupPersonClick", "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAg0lEQVQ4Ed3BQQqCQBiG4e80MripfXSP8C51JVHc1AXqHkntwhhdqbyuhGHK/mXg80irREpFR0uJk42UN7MGJwsVoUIWOkJeFlpCXhZKQrksOBpmLxLZcBR4PDmJ/o8tJy7U9PTcOXNkoyXsufHNlZ0+kTGyZOCgGE9+eSiGQTEMWpEJ/bgWSos9mooAAAAASUVORK5CYII=");
  }

  function getButtonTranslation() {
    return getButton("Find translations", "OnLookupTranslationClick", "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAABDUlEQVQ4Eb3BMU6TYQAG4FcjDCYwGBoGz2DAhcErmEgHCXHyCDYMzF9cnIhojOdovIj1ACbGiQCTGgN/v/jw02ClUAouPE9y67TyP7Qym2vkIlVVVVVVVVVVjeUmPHDkuzu5Kdt4nVk8dGTPQloWHfhtObPZwbu0fMSbXMeCb/546hm+up8RffQznScaP/x0bC0jOho0OpnOB6fe5owefqGXaTw3dOrYekYM8BKDXGbDEEVBo5tYxefEF6xmkk1DlLQUfErs4lViC7s5zwsVJWcUG+bsaywllg3tm8tfHqkoOcddXZO6+UdRcoG+Sf3MoqOx515GzDvU6ORqetjJmPfo5WoGWMmYxxjkFpwACdQ/wc48fzIAAAAASUVORK5CYII=");
  }

  function getButtonWikipedia() {
    return getButton("Search Wikipedia", "OnLookupWikipediaClick", "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAXBJREFUSMft08+LzlEUx/FzpxkLjZqhJpEy+0GzsbBnwU52FuxslMU0KWkWNsokPYkUpRTlL5gUhYWaZCXGHyBTY8xs/AjTvCycxe1Gz2PYqOdTZ/F9n/s9537O+X4j+urrnwm3sZKxhOsYxgyeJ3+CSRzDU7zHNYzgMhYzLv2uyZSfetzwcXzHzYp1cLI5dwenujl5hDXsbvg9fMEYRvEMpcpvwQI2dWtwMF3MNnwf1nEhx3a8yZ/B+V52UfAKqxhucg+xjHkMVnwALzHW1htoQSlFRHQiYiQiTjTp2YjYFhELpZS1ih+JiBellKWuDvJGm/EBb5o5788xfcTWxtlkT8Wrly7mLg5XbA7nkp9NNtF+db022IlveJDPh3ADQ3ibMYRbOPrHDbLo/bzt3vzJdiWfSX46xzi40QYHstBrdCq+HV/T4fSGilfF5vEZOxp+F5/qZf9KvVi7EhF7SinvGn41IpZLKSt/5aCv/18/ABubqIpQmAHGAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAyLTA1VDIzOjUzOjA1KzAwOjAwWSsyrQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMi0wNVQyMzo1MzowNSswMDowMCh2ihEAAAAodEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL3RtcC9tYWdpY2stRGpFWUdRWHH/D1yjAAAAAElFTkSuQmCC");
  }

  function getButton(label, eventName, iconBase64) {
    // build the container
    var customButton = document.createElement("a");
    customButton.classList.add("annotator-custom-action");
    customButton.setAttribute("onclick", "document.dispatchEvent(new CustomEvent(\"" + eventName + "\",{\"detail\":annotatorCustomExtensions.currentSelection.quote}));");
    customButton.setAttribute("title", label);
    // add the icon
    var buttonIcon = document.createElement("img");
    buttonIcon.classList.add("annotator-custom-icon");
    buttonIcon.setAttribute("src", "data:image/png;base64, " + iconBase64);
    customButton.appendChild(buttonIcon);
    return customButton;
  }

  function getVerticalSeparator() {
    var textContainer = document.createElement("span");
    textContainer.appendChild(document.createTextNode("|"));
    return textContainer;
  }

};
