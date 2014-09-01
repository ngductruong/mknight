define(['jquery','knockout','durandal/app'], function ($, ko, app) {

    return new function(){
        var self = this;

        self.CurrentUser = ko.observable(app.ViewModel.CurrentUser());

        self.ShowNotification = ko.observable(false);
        self.NotificationClass = ko.observable('none');
        self.NotificationClick = function(){
            if(self.NotificationClass() == 'none')
            {self.NotificationClass('block'); }
            else self.NotificationClass('none');
        }


        self.ShowInbox = ko.observable(false);
        self.InboxClass = ko.observable('none');
        self.InboxClick = function(){
            if(self.InboxClass() == 'none')
            {self.InboxClass('block'); }
            else self.InboxClass('none');
        }


        self.ShowTodoList = ko.observable(false);
        self.TodoListClass = ko.observable('none');
        self.TodoListClick = function(){
            if(self.TodoListClass() == 'none')
            {self.TodoListClass('block'); }
            else self.TodoListClass('none');
        }

        self.ShowUserProfile = ko.observable(false);
        self.UserProfileClass = ko.observable('none');
        self.UserProfileClick = function(){
            if(self.UserProfileClass() == 'none')
            {self.UserProfileClass('block'); }
            else self.UserProfileClass('none');
        }





        return self;
    };

});