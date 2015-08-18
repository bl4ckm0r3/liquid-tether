this.transition(
  this.hasClass('hello-world'),
  this.use('tether', ['to-up', {
    duration: 1500,
    easing: 'easeInOutQuint'
  }])
);
