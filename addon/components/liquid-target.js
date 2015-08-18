import Ember from 'ember';
import layout from '../templates/components/liquid-target';

const { computed, inject, get } = Ember;
const { service } = inject;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['liquid-target'],
  classNameBindings: ['currentContextClass'],

  didInsertElement() {
    this.updateContextClass();
  },

  liquidTargetService: service('liquidTarget'),

  currentItem: computed('items.lastObject', function() {
    const index = this.get('items.length');
    const { context, nodes } = this.get('items.lastObject') || { context: null, nodes: null };

    return { context, nodes, index };
  }),

  currentContextClass: computed('currentItem', {
    get() {
      const currentItem = this.get('currentItem');
      let contextClass;

      if (!this._lastContextClass) {
        // If it's a fresh target, bootstrap the currentItem's context class.
        contextClass = get(currentItem, 'context.class');
        this._lastContextClass = contextClass;
      } else {
        // If it's not a fresh target, use the old class until it's manually set
        // by updateContextClass()
        contextClass = this._lastContextClass;
      }

      return contextClass;
    },

    set(key, value) {
      this._lastContextClass = value;
      return value;
    }
  }),

  updateContextClass() {
    this.set('currentContextClass', this.get('currentItem.context.class'));
  },

  cleanup() {
    if (this.get('items.length') === 0) {
      this.sendAction('on-cleanup', this.get('target'));
    }
  },

  actions: {
    didAnimateTransition() {
      this.updateContextClass();
      this.cleanup();
    }
  }
});
