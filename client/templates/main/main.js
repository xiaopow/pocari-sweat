
// Track if this is the first time the list template is rendered
var firstRender = true;
var listRenderHold = LaunchScreen.hold();
listFadeInHold = null;

Template.main.onRendered(function() {
  if (firstRender) {
    // Released in app-body.js
    listFadeInHold = LaunchScreen.hold();

    // Handle for launch screen defined in app-body.js
    listRenderHold.release();

    firstRender = false;
  }

  this.find('.js-title-nav')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        this.remove();
      });
    }
  };
});

Template.main.helpers({
  weatherReady: function() {
    return true
  }
});

Template.main.events({
  // 'click .js-cancel': function() {
  //   Session.set(EDITING_KEY, false);
  // },
  
  // 'keydown input[type=text]': function(event) {
  //   // ESC
  //   if (27 === event.which) {
  //     event.preventDefault();
  //     $(event.target).blur();
  //   }
  // },
  
  // 'blur input[type=text]': function(event, template) {
  //   // if we are still editing (we haven't just clicked the cancel button)
  //   if (Session.get(EDITING_KEY))
  //     saveList(this, template);
  // },

  // 'submit .js-edit-form': function(event, template) {
  //   event.preventDefault();
  //   saveList(this, template);
  // },
  
  // // handle mousedown otherwise the blur handler above will swallow the click
  // // on iOS, we still require the click event so handle both
  // 'mousedown .js-cancel, click .js-cancel': function(event) {
  //   event.preventDefault();
  //   Session.set(EDITING_KEY, false);
  // },

  // 'change .list-edit': function(event, template) {
  //   if ($(event.target).val() === 'edit') {
  //     editList(this, template);
  //   } else if ($(event.target).val() === 'delete') {
  //     deleteList(this, template);
  //   } else {
  //     toggleListPrivacy(this, template);
  //   }

  //   event.target.selectedIndex = 0;
  // },
  
  // 'click .js-edit-list': function(event, template) {
  //   editList(this, template);
  // },
  
  // 'click .js-toggle-list-privacy': function(event, template) {
  //   toggleListPrivacy(this, template);
  // },
  
  // 'click .js-delete-list': function(event, template) {
  //   deleteList(this, template);
  // },
  
  // 'click .js-todo-add': function(event, template) {
  //   template.$('.js-todo-new input').focus();
  // },

  // 'submit .js-todo-new': function(event) {
  //   event.preventDefault();

  //   var $input = $(event.target).find('[type=text]');
  //   if (! $input.val())
  //     return;
    
  //   Todos.insert({
  //     listId: this._id,
  //     text: $input.val(),
  //     checked: false,
  //     createdAt: new Date()
  //   });
  //   Lists.update(this._id, {$inc: {incompleteCount: 1}});
  //   $input.val('');
  // }
});
