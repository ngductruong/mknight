define(["jquery","knockout","durandal/app"],function(e,t,r){return new function(){var e=this;return e.CurrentUser=t.observable(r.ViewModel.CurrentUser()),e.ShowNotification=t.observable(!1),e.NotificationClass=t.observable("none"),e.NotificationClick=function(){"none"==e.NotificationClass()?e.NotificationClass("block"):e.NotificationClass("none")},e.ShowInbox=t.observable(!1),e.InboxClass=t.observable("none"),e.InboxClick=function(){"none"==e.InboxClass()?e.InboxClass("block"):e.InboxClass("none")},e.ShowTodoList=t.observable(!1),e.TodoListClass=t.observable("none"),e.TodoListClick=function(){"none"==e.TodoListClass()?e.TodoListClass("block"):e.TodoListClass("none")},e.ShowUserProfile=t.observable(!1),e.UserProfileClass=t.observable("none"),e.UserProfileClick=function(){"none"==e.UserProfileClass()?e.UserProfileClass("block"):e.UserProfileClass("none")},e}});