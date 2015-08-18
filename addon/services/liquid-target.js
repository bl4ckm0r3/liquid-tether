import Ember from 'ember';

export default Ember.Service.extend({
  targets: Ember.A(),

  appendRange(context, targetName, nodes) {
    const targets = this.get('targets');
    let target;

    if (!(target = targets.findBy('name', targetName))) {
      target = {
        name: targetName,
        items: Ember.A()
      };

      targets.pushObject(target);
    }

    Ember.run.schedule('render', () => {
      target.items.pushObject({ context, nodes });
    });
  },

  removeRange(context, targetName) {
    const targets = this.get('targets');
    const target = targets.findBy('name', targetName);
    const itemToRemove = target.items.findBy('context', context);

    target.items.removeObject(itemToRemove);
  },

  removeTarget(target) {
    this.get('targets').removeObject(target);
  },

  addDefaultTarget() {
    console.log('addDefaultTarget has been deprecated');
  }
});
