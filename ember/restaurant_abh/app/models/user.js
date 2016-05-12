import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  id: attr(),
  email: attr(),
  password: attr(),
  firstName: attr(),
  lastName: attr(),
  role: attr()
});
