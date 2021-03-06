const options = {
  duration: 1000,
  easing: 'easeInOutQuart'
};

export default function() {
  this.transition(
    this.hasClass('liquid-tether'),
    this.use('tether', ['fade-up', options])
  );

  this.transition(
    this.hasClass('ui-modal'),
    this.toValue((toValue) => {
      return toValue.index === 0;
    }),
    this.use('tether', ['to-left', options], ['fade', options]),
    this.reverse('tether', ['to-right', options], ['fade', options]),
    this.debug()
  );

  this.transition(
    this.hasClass('ui-modal'),
    this.toValue((toValue, fromValue) => {
      return toValue.index > fromValue.index;
    }),
    this.use('tether', ['fly-to', options]),
    this.reverse('tether', ['fly-to', options])
  );


}
