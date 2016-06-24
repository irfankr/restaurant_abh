import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('admin-restaurants-add-tabs', 'Integration | Component | admin restaurants add tabs', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{admin-restaurants-add-tabs}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#admin-restaurants-add-tabs}}
      template block text
    {{/admin-restaurants-add-tabs}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
