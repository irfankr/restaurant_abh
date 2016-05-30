define("ember-g-map/templates/components/g-map-address-route", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 8,
                "column": 2
              }
            },
            "moduleName": "modules/ember-g-map/templates/components/g-map-address-route.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "routeContext", ["loc", [null, [7, 12], [7, 24]]]]], [], ["loc", [null, [7, 4], [7, 26]]]]],
          locals: ["routeContext"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "modules/ember-g-map/templates/components/g-map-address-route.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "g-map-route", [["get", "mapContext", ["loc", [null, [2, 17], [2, 27]]]]], ["zIndex", ["subexpr", "@mut", [["get", "zIndex", ["loc", [null, [2, 35], [2, 41]]]]], [], []], "strokeColor", ["subexpr", "@mut", [["get", "strokeColor", ["loc", [null, [3, 28], [3, 39]]]]], [], []], "strokeWeight", ["subexpr", "@mut", [["get", "strokeWeight", ["loc", [null, [3, 53], [3, 65]]]]], [], []], "strokeOpacity", ["subexpr", "@mut", [["get", "strokeOpacity", ["loc", [null, [3, 80], [3, 93]]]]], [], []], "originLat", ["subexpr", "@mut", [["get", "originLat", ["loc", [null, [4, 26], [4, 35]]]]], [], []], "originLng", ["subexpr", "@mut", [["get", "originLng", ["loc", [null, [4, 46], [4, 55]]]]], [], []], "destinationLat", ["subexpr", "@mut", [["get", "destinationLat", ["loc", [null, [5, 31], [5, 45]]]]], [], []], "destinationLng", ["subexpr", "@mut", [["get", "destinationLng", ["loc", [null, [5, 61], [5, 75]]]]], [], []]], 0, null, ["loc", [null, [2, 2], [8, 18]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "modules/ember-g-map/templates/components/g-map-address-route.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "g-map-route", [["get", "mapContext", ["loc", [null, [10, 16], [10, 26]]]]], ["zIndex", ["subexpr", "@mut", [["get", "zIndex", ["loc", [null, [10, 34], [10, 40]]]]], [], []], "strokeColor", ["subexpr", "@mut", [["get", "strokeColor", ["loc", [null, [11, 28], [11, 39]]]]], [], []], "strokeWeight", ["subexpr", "@mut", [["get", "strokeWeight", ["loc", [null, [11, 53], [11, 65]]]]], [], []], "strokeOpacity", ["subexpr", "@mut", [["get", "strokeOpacity", ["loc", [null, [11, 80], [11, 93]]]]], [], []], "originLat", ["subexpr", "@mut", [["get", "originLat", ["loc", [null, [12, 26], [12, 35]]]]], [], []], "originLng", ["subexpr", "@mut", [["get", "originLng", ["loc", [null, [12, 46], [12, 55]]]]], [], []], "destinationLat", ["subexpr", "@mut", [["get", "destinationLat", ["loc", [null, [13, 31], [13, 45]]]]], [], []], "destinationLng", ["subexpr", "@mut", [["get", "destinationLng", ["loc", [null, [13, 61], [13, 75]]]]], [], []]], ["loc", [null, [10, 2], [13, 77]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "modules/ember-g-map/templates/components/g-map-address-route.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [14, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});