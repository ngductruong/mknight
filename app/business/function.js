/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 9/29/13
 * Time: 11:09 PM
 * To change this template use File | Settings | File Templates.
 */

define(['jquery', 'knockout', '../entity/downloadfile','../business/data','../business/api','../entity/file' ],
    function($, ko, DownloadFile, DataBO, Api, File) {

    var self = {   // this line is changed



        AddFile : function(FileArray, DownloadFileArray, CurrentContext, App, Video){

            // CurrentContext might be Dashboard, Upload...
            var sessionResult = ko.utils.arrayFirst(FileArray(), function(item){
                return item.FilePath() == CurrentContext.SelectedVideo().FilePath();
            });

            if(sessionResult)
            {
                // Check this result
                sessionResult.IsAddToDownload(true);

                var downloadFile = new DownloadFile();
                downloadFile.SessionResult(sessionResult);

                var file = new File();
                file.FileName(sessionResult.FileName());
                file.FilePath(sessionResult.FilePath());
                downloadFile.File(file);


                if(downloadFile)
                {
                    downloadFile.SelectDownloadVideoFunction = self.SelectDownloadVideo.bind(downloadFile, CurrentContext, DownloadFileArray, App);

                    if(DownloadFileArray().length == 0)
                    {
                        downloadFile.IsSelected(true);
                    }

                    // Select
                    var existingItem = ko.utils.arrayFirst(DownloadFileArray(), function(item){
                       return item.SessionResult().SharepointId() == downloadFile.SessionResult().SharepointId();
                    });
                    if(!existingItem){
                        console.log(ko.toJSON(downloadFile));

                        DownloadFileArray.push(downloadFile);
                    }
                }
            }
        },

        // COMMENT FUNCTIONS
        RemoveFile : function(FileArray, File){
            var searchFile = ko.utils.arrayFirst(FileArray(), function(item){
                return item.FilePath() == File.FilePath();
            });

            if(searchFile)
            {
                var confirmation = confirm('Bạn muốn xóa file này khỏi danh sách ?');
                if(confirmation == true)
                {
                    FileArray.remove(searchFile);
                }


            }
        },

        SelectFile : function(Upload, FileArray, File){

            console.log('SELECT');
            var searchFile = ko.utils.arrayFirst(FileArray(), function(item){
                return item.IsSelected() == true;
            });
            if(searchFile)
            {
                searchFile.IsSelected(false);
            }

            if(File)
            {
                File.IsSelected(true);

                Upload.CurrentFile(File);
                Upload.CurrentMetadata(File.Metadata());
            }
        },
        StartUpload : function(Upload, FileArray, HubServer)
        {

        },

        SelectVideo : function(Dashboard, AllVideos, App, Video){

            // Deselect all
            var selectedVideo = ko.utils.arrayFirst(AllVideos(), function(item){
                return item.IsSelected() == true;
            });

            if(selectedVideo)
            {
                if(selectedVideo.SessionResultId() == Video.SessionResultId()) return;
                else
                {
                    selectedVideo.IsSelected(false);
                }
            }

            if(Video)
            {
                Dashboard.SelectedVideo(Video);
                Dashboard.IsShowSharingPanel(false);

                Video.IsSelected(true);
                Video.IsNewFile(false);

                // Load metadata of video
                if(Video.IsUpdatedMetadata() == false)
                {
                    var promise = Api.GetMetadata(Video.SessionSendFileId())
                    promise.success(function(response) {
                        Video.Metadata(response);
                        Video.IsUpdatedMetadata(true);
                    });
                }

                $("video").parent(".flowplayer").flowplayer();
            }


        },

        SelectDownloadVideo : function(ViewModel, AllDownloadVideos, App, DownloadVideo){

            // Deselect all
            var searchVideo = ko.utils.arrayFirst(AllDownloadVideos(), function(item){
                return item.IsSelected() == true;
            });

            if(searchVideo)
            {
                searchVideo.IsSelected(false);

            }

            if(DownloadVideo)
            {
                DownloadVideo.ParentModel().SelectedVideo(DownloadVideo.SessionResult());
                DownloadVideo.IsSelected(true);

                if(DownloadVideo.SessionResult().IsUpdatedMetadata() == false)
                {
                    var promise = Api.GetMetadata(Video.SessionSendFileId())
                    promise.success(function(response) {
                        Video.Metadata(response);
                        Video.IsUpdatedMetadata(true);
                    });
                }

            }


        }



    };

    self.UpdateUserData = function (userId, ViewModel) {

        var promise = Api.GetUserData(userId);

        promise.success(function(response) {

            var user = DataBO.GetUserObject(response);

            console.log('-------- ////// FINISH GET USER DATA');
            console.log(response);

            // place unit
            var currentUnits =  ViewModel.CurrentUser().Units();

            // This operatior will clear all current user data
            // so to ensure we have remain unit, place unit to temporary location
            // then re-place into current user variable
            ViewModel.CurrentUser(user);
            ViewModel.CurrentUser().Units(currentUnits);

            console.log('---- // LOADING - COMPLETE STEP 0');

            ViewModel.CompleteStep(0);
        });
    };


    self.GetManageableUnits = function (userId, ViewModel) {

        var promise = Api.GetManageableUnits(userId);

        promise.success(function(response) {

            for(var i = 0; i < response.length; i++) {
                console.log(response[i]);
                var unit = DataBO.GetUnitObject(response[i]);
                ViewModel.CurrentUser().Units.push(unit);
            }

            console.log('---- // LOADING - COMPLETE STEP 1');
            ViewModel.CompleteStep(1);

        });


    };

    return self;


});