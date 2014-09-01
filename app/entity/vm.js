define(['durandal/app','knockout'], function(app, ko) {
    // try to use new
    return function() {
        var self = this;

        // Current context of viewmodel
        self.CurrentContext = ko.observable();
        self.CurrentViewModel = ko.observable();
        self.CurrentSearchString = ko.observable();

        self.ConnectionId = ko.observable();

        // Current Logged user
        self.CurrentUser = ko.observable(null);

        self.Units = ko.observableArray();
        self.SystemUnits = ko.observableArray();
        self.UploadUnits = ko.observableArray();
        // unit of user who is chosen in upload form
        self.DefaultUnitOfUser = ko.observable();

        //All user in system
        self.AllUser = ko.observableArray();

        self.DirectoryArray = ko.observableArray();
        self.AddDirectory = function(directory){
            self.DirectoryArray().push(directory);
        }

        self.UnitArray = ko.observableArray();
        self.AddUnit = function(unit)
        {
            self.UnitArray().push(unit);
        }

        // Loading steps that need to make
        self.LoadingSteps = ko.observableArray([]);
        self.LoadedSteps = ko.observableArray([]);
        self.CompleteStep = function(stepIndex) {
            var step = self.LoadingSteps()[stepIndex];
            if(step)
            {
                step.Finish();

                var existingStep = ko.utils.arrayFirst(self.LoadedSteps(), function(item){
                    return item.StepName() == step.StepName();
                });

                if(!existingStep) self.LoadedSteps.push(step);
            }

        }
        self.LoadingState = ko.computed(function(){

            if(self.LoadedSteps().length >= 0)
            {
                var firstIncompletedStep = null;
                for(var i = self.LoadingSteps().length - 1; i >= 0; i--)
                {
                    var item = self.LoadingSteps()[i];
                    if(item.IsFinish()) firstIncompletedStep = item;
                    break;
                }

                if(firstIncompletedStep)
                {
                    return firstIncompletedStep.StepName();
                }
                else
                {
                    if(self.LoadingSteps().length > 0)
                    {
                        firstIncompletedStep = self.LoadingSteps()[0];
                        return firstIncompletedStep.StepName();
                    }
                    else
                    { return "Xử lý dữ liệu";}

                }

            }


        });
        self.LoadingIndicator = ko.observable(4);
        self.LoadingPercentage = ko.computed(function(){
            var totalValue = 1000;
            var completedValue = 400;
            if(self.LoadedSteps().length > 0)
            {
                ko.utils.arrayForEach(self.LoadedSteps(), function(item){
                    if(item) completedValue += item.Value();
                });
            }

            console.log('LOADING | ' +completedValue +'/' + totalValue);

            return ((completedValue/totalValue)*100).toFixed(0) + '%';
        });
        self.LoadingMonitorAction = ko.computed(function(){
            if(self.LoadedSteps().length > 0 && self.LoadedSteps().length == self.LoadingSteps().length)
            {
                console.log('---------------FINISH LOADING---------------------');
                // app.setRoot('viewmodels/shell', 'fade');
            }
        });

        self.Session = ko.observable();

        // Added 26 Dec - TruongND
        // Array for storing new files
        self.NewSessionResultIncomingArray = ko.observableArray();
        self.NewSessionResultOutgoingArray = ko.observableArray();
        self.NewSessionResultSharingArray = ko.observableArray();

        // Array for storing data files
        self.SessionResultDashboardArray = ko.observableArray();
        self.SessionResultIncomingArray = ko.observableArray();
        self.SessionResultOutgoingArray = ko.observableArray();

        // UPLOAD FILES DATA
        self.PreTransferFileArray = ko.observableArray();
        self.TransferingFileArray = ko.observableArray();

        // Update 22 Dec - TruongND
        // Download file array for download files
        self.DownloadFileArray = ko.observableArray();

        // Set start date to calculate loading time
        self.StartDate = ko.observable(new Date());

        // Write date function
        self.WriteDate = function(date){
            var currentdate = date;

            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
            return datetime;
        };

        // Write operation time
        self.WriteOperationTime = function(functionName){

            var date1 = new Date();

            var diff = Math.abs(date1 - self.StartDate());
            console.log('------------OPERATION TIME FOR : ' + functionName + '-------------------');
            console.log("Start at : " + self.WriteDate(self.StartDate()));
            console.log("Time span : " + diff + " ms");
            console.log('---------------------------------------------');
        };

        return self;
    };
});