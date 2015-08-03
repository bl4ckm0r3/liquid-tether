import Ember from 'ember';
import layout from '../templates/components/liquid-target';

const { computed, inject } = Ember;
const { service } = inject;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['liquid-target'],

  liquidTargetService: service('liquidTarget'),

  currentItem: computed('items.lastObject', function() {
    const index = this.get('items.length');
    const { context, nodes } = this.get('items.lastObject') || { context: null, nodes: null };

    return { context, nodes, index };
  }),

  actions: {
    cleanup() {
      if (this.get('items.length') === 0) {
        this.sendAction('on-cleanup', this.get('target'));
      }
    }
  }
});
