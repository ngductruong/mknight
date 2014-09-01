/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 10/1/13
 * Time: 10:30 AM
 * To change this template use File | Settings | File Templates.
 */


define(['knockout'], function(ko) {
    return function(){

        var self = this;

        // Step name
        self.StepName = ko.observable();

        // Check whether this step is finish or not
        self.IsFinish = ko.observable(false);

        // Get the value
        self.Value = ko.observable();

        // Finish function of this entity
        self.Finish = function()
        {
            self.IsFinish(true);
        }


        return self;
    };
});