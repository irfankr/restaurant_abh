export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 2,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 100
          }
        },
        "moduleName": "restaurant-abh/templates/components/restaurant-item.hbs"
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
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","restaurantlist.restaurantName",["loc",[null,[2,67],[2,100]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 4,
            "column": 2
          },
          "end": {
            "line": 4,
            "column": 99
          }
        },
        "moduleName": "restaurant-abh/templates/components/restaurant-item.hbs"
      },
      isEmpty: true,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child2 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 6,
            "column": 4
          },
          "end": {
            "line": 6,
            "column": 69
          }
        },
        "moduleName": "restaurant-abh/templates/components/restaurant-item.hbs"
      },
      isEmpty: true,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "multiple-nodes",
          "wrong-type"
        ]
      },
      "revision": "Ember@2.5.1",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 10,
          "column": 78
        }
      },
      "moduleName": "restaurant-abh/templates/components/restaurant-item.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("img");
      dom.setAttribute(el1,"class","restaurant_thumb");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","restaurant_marks");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("span");
      dom.setAttribute(el2,"class","price_range");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","restaurant_food");
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("a");
      dom.setAttribute(el1,"class","restaurant_reserve");
      dom.setAttribute(el1,"href","#");
      var el2 = dom.createTextNode("Reserve now");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(fragment, [4]);
      var element2 = dom.childAt(fragment, [8]);
      var morphs = new Array(6);
      morphs[0] = dom.createAttrMorph(element0, 'src');
      morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
      morphs[2] = dom.createMorphAt(element1,1,1);
      morphs[3] = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
      morphs[4] = dom.createMorphAt(dom.childAt(fragment, [6]),0,0);
      morphs[5] = dom.createElementMorph(element2);
      return morphs;
    },
    statements: [
      ["attribute","src",["concat",["assets/images/restaurants/thumbnails/",["get","restaurantlist.imageFileName",["loc",[null,[1,74],[1,102]]]],".jpg"]]],
      ["block","link-to",["restaurant",["get","restaurantlist.id",["loc",[null,[2,24],[2,41]]]]],["class","restaurant_name"],0,null,["loc",[null,[2,0],[2,112]]]],
      ["block","restaurant-star",[],["max",5,"value",["subexpr","@mut",[["get","restaurantlist.mark",["loc",[null,[4,33],[4,52]]]]],[],[]],"votes",["subexpr","@mut",[["get","restaurantlist.votes",["loc",[null,[4,59],[4,79]]]]],[],[]],"voteAllowed",false],1,null,["loc",[null,[4,2],[4,119]]]],
      ["block","restaurant-price-range",[],["max",5,"value",["subexpr","@mut",[["get","restaurantlist.priceRange",["loc",[null,[6,42],[6,67]]]]],[],[]]],2,null,["loc",[null,[6,4],[6,96]]]],
      ["content","restaurantlist.foodType",["loc",[null,[9,29],[9,56]]]],
      ["element","action",["reservenow"],[],["loc",[null,[10,3],[10,26]]]]
    ],
    locals: [],
    templates: [child0, child1, child2]
  };
}()));