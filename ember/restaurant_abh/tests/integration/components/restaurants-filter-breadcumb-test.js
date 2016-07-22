import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('restaurants-filter-breadcumb', 'Integration | Component | restaurants filter breadcumb', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{restaurants-filter-breadcumb}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#restaurants-filter-breadcumb}}
      template block text
    {{/restaurants-filter-breadcumb}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
