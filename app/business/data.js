/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 9/30/13
 * Time: 1:56 PM
 * To change this template use File | Settings | File Templates.
 */

define(['knockout','../entity/directory','../entity/unit','../entity/asperaserver','../entity/user','../entity/sessionresult','../entity/metadata','../business/function','../business/utils'],
    function(ko, Directory, Unit, AsperaServer, User, SessionResult, Metadata, FunctionBO, UtilsBO) {

    var self = {

        GetDirectoryObject : function(directoryData){
            var directory =  new Directory();

            if(!UtilsBO.IsNullOrEmpty(directoryData))
            {
                // Specify Observable
                directory.DirectoryId(directoryData.DirectoryId);
                directory.DirectoryName(directoryData.Name);
                directory.DirectoryPath(directoryData.DirectoryPath);
            }
            return directory;
        },

        GetUnitObject : function(unitData){
            var unit =  new Unit();

            if(!UtilsBO.IsNullOrEmpty(unitData))
            {
                // Specify Observable
                unit.SharepointId(unitData.SharepointId);
                unit.ParentUnitId(unitData.ParentUnitId);
                unit.UnitId(unitData.UnitId);
                unit.Name(unitData.Name);
                unit.Level(unitData.Level);
                unit.RoleInUnit(unitData.RoleInUnit);
                unit.AsperaServerId(unitData.AsperaServerId);
                unit.DefaultDirectoryId(unitData.DefaultDirectoryId);

                // Aspera Server
                var asperaServer = self.GetAsperaServerObject(unitData.AsperaServer);
                unit.AsperaServer(asperaServer);

                // Default Directory
                var defaultDirectory = self.GetDirectoryObject(unitData.DefaultDirectory);
                unit.DefaultDirectory(defaultDirectory);
            }
            return unit;
        },

        GetAsperaServerObject : function(asperaserverData){
            var asperaServer =  new AsperaServer();
            if(!UtilsBO.IsNullOrEmpty(asperaserverData))
            {
                // Specify Observable
                asperaServer.AsperaServerId(asperaserverData.UnitId);
                asperaServer.HostName(asperaserverData.HostName);
                asperaServer.HostAddress(asperaserverData.HostAddress);
                asperaServer.UserName(asperaserverData.UserName);
                asperaServer.Password(asperaserverData.Password);
                asperaServer.TcpPort(asperaserverData.TcpPort);
                asperaServer.UdpPort(asperaserverData.UdpPort);
                asperaServer.TargetRateKbps(asperaserverData.TargetRateKbps);
                asperaServer.MinimumRateKbps(asperaserverData.MinimumRateKbps);
                asperaServer.SourceRootFolder(asperaserverData.SourceRootFolder);
                asperaServer.DestinationRootFolder(asperaserverData.DestinationRootFolder);
                asperaServer.ContentProtectionPassphrase(asperaserverData.ContentProtectionPassphrase);
            }
            return asperaServer;
        },

        GetUserObject : function(userData){
            var user = new User();

            if(!UtilsBO.IsNullOrEmpty(userData))
            {
                user.UserId(userData.UserId);
                user.UserName(userData.UserName);
                user.UserAvatar(userData.UserAvatar);
                user.DAM_Role(userData.DAM_Role);
                user.Tel(userData.Tel);
                user.Email(userData.Email);
                user.Note(userData.Note);
                user.CreatedDate(userData.CreatedDate);
                user.ModifiedDate(userData.ModifiedDate);
                user.ModOfUnit(userData.ModOfUnit)
            }

            return user;
        },

        GetSessionResultObject : function(sessionResultData, Dashboard,  AllVideos, App)
        {
            var sessionResult = self.GetSessionResultObjectWithoutBinding(sessionResultData, App);
            sessionResult.SelectVideoFunction = FunctionBO.SelectVideo.bind(sessionResult, Dashboard, AllVideos, App);
            sessionResult.AddToDownloadFunction = FunctionBO.AddFile.bind(Dashboard, AllVideos,  App.ViewModel.DownloadFileArray);
            return sessionResult;
        },

        GetSessionResultObjectWithoutBinding : function(sessionResultData, App)
        {
            var sessionResult = new SessionResult();
            if(!UtilsBO.IsNullOrEmpty(sessionResultData))
            {
                var currentUserLookupValue = App.ViewModel.CurrentUser().SharepointId() + ";#" + App.ViewModel.CurrentUser().UserId();
                sessionResult.SessionId(sessionResultData.SessionId);
                sessionResult.SessionResultId(sessionResultData.SessionResultId);
                sessionResult.SessionSendFileId(sessionResultData.SessionSendFileId);
                sessionResult.SessionReceiveFileId(sessionResultData.SessionReceiveFileId);
                sessionResult.ToUserId(sessionResultData.ToUserId);
                sessionResult.FromUserId(sessionResultData.FromUserId);
                sessionResult.FileTitle(sessionResultData.DisplayTitle);
                sessionResult.FileName(sessionResultData.DisplayFileName);
                sessionResult.FilePath(sessionResultData.DisplayUrl);
                sessionResult.FileSource(sessionResultData.DisplaySourceName);

                // sessionResult.Thumbnail(sessionResultData.DisplayThumbnail);

                sessionResult.Thumbnail('assets/img/transfer/logo_aspera_notext.png');

                sessionResult.CreatedDate(sessionResultData.CreatedDate);
                sessionResult.ModifiedDate(sessionResultData.ModifiedDate);
                sessionResult.SharepointId(sessionResultData.SharepointId);
                sessionResult.DisplayDate(sessionResultData.DisplayDate);
                sessionResult.DisplaySummary(sessionResultData.DisplaySummary);
                sessionResult.DisplayDownloadLink(sessionResultData.DisplayDownloadLink);
                sessionResult.DisplayFromUser(sessionResultData.DisplayFromUser);
                sessionResult.DisplayToUser(sessionResultData.DisplayToUser);
                sessionResult.DisplayFromUserUnitId(sessionResultData.DisplayFromUserUnitId);
                sessionResult.DisplayToUserUnitId(sessionResultData.DisplayToUserUnitId);
                sessionResult.Status(sessionResultData.Status);
                sessionResult.DownloadCount(sessionResultData.DownloadCount);
                sessionResult.IsMediaFile(sessionResultData.IsMediaFile);
                sessionResult.IsShared(sessionResultData.IsShared);

                // Get file size
                if(!UtilsBO.IsNullOrEmpty(sessionResultData.SessionSendFile))
                {
                    if(!UtilsBO.IsNullOrEmpty(sessionResultData.SessionSendFile.FileSize))
                    {
                        sessionResult.FileSize(sessionResultData.SessionSendFile.FileSize);
                    }

                }

                // Get receiver unit
                if(!UtilsBO.IsNullOrEmpty(sessionResultData.ToUserUnit))
                {
                    var unit = self.GetUnitObject(sessionResultData.ToUserUnit);
                    if(unit)
                    {
                        sessionResult.ToUserUnit(unit);
                    }
                }

                // Get shared by user
                if (sessionResultData.IsShared)
                {
                    if(!UtilsBO.IsNullOrEmpty(sessionResultData.SharedByUser))
                    {
                        var shareByUser = self.GetUserObject(sessionResultData.SharedByUser);
                        if(shareByUser)
                        {
                            sessionResult.SharedByUser(shareByUser);
                        }
                    }
                }

                // Check if file is allowed to preview
                var unitIsAllowPreview = sessionResultData.IsAllowPreview;
                // Unit is restricted to preview, just the sender and users in unit

                var isUnitOfUser = ko.utils.arrayFirst(App.ViewModel.CurrentUser().Units(), function(item){
                    return item.UnitId() == sessionResultData.ToUserUnit.UnitId;
                });

                if(!unitIsAllowPreview)
                {
                    // If sender, allow preview
                    if(currentUserLookupValue == sessionResult.FromUserId()){ sessionResult.IsAllowPreview(true); }
                    else
                    {


                        if(isUnitOfUser)
                        {
                            sessionResult.IsAllowPreview(true);
                        }
                        else
                        {
                            sessionResult.IsAllowPreview(false);
                        }

                        if(sessionResult.IsShared())
                        {
                            sessionResult.IsAllowPreview(true);
                        }
                    }
                }
                // Unit is allowed to preview, all can preview
                else
                {
                    sessionResult.IsAllowPreview(true);
                }

                // Check if file is mediafile or not, mediafile -> has highres and low res
                if(sessionResult.IsMediaFile() == true)
                {
                    sessionResult.HasLowRes(true);
                }
                else
                {
                    sessionResult.HasLowRes(false);
                    sessionResult.Thumbnail("assets/img/transfer/file.png");
                    sessionResult.DisplayDownloadLink("#");
                }

                // if user is sender, or receiver then user can download highres & sharing
                if(sessionResult.FromUserId() == currentUserLookupValue || (isUnitOfUser))
                {
                    sessionResult.HasHighRes(true);
                    //sessionResult.IsAllowSharing(true);
                }
                else
                {
                    sessionResult.HasHighRes(false);
                    //sessionResult.IsAllowSharing(false);
                }

                // If this user is sender or this user is receiver or this user is shared
                if(sessionResult.IsShared())
                {
                    var fromUserId = sessionResult.FromUserId().split("#")[1];
                    var toUserId = sessionResult.ToUserId().split("#")[1];
                    var currentUser = App.ViewModel.CurrentUser().UserId();

                    //if(sessionResult.FromUserId() == currentUserLookupValue || (isUnitOfUser) || sessionResult.ToUserId() == currentUserLookupValue)
                    if(sessionResult.FromUserId() == currentUserLookupValue || fromUserId == currentUser || (isUnitOfUser) || sessionResult.ToUserId() == currentUserLookupValue || toUserId == currentUser)
                    {
                        sessionResult.HasHighRes(true);
                        if(sessionResult.IsMediaFile())
                        {
                            sessionResult.HasLowRes(true);
                            sessionResult.DisplayDownloadLink(sessionResultData.DisplayDownloadLink);
                        }

                    }

                }


            }
            return sessionResult;
        },

        GetMetadataObject : function(metadataData)
        {
            var metadata = new Metadata();
            if(!UtilsBO.IsNullOrEmpty(metadataData))
            {
                metadata.Title(metadataData.Title);
                metadata.Author(metadataData.Author);
                metadata.Director(metadataData.Director);
                metadata.ScriptWriter(metadataData.ScriptWriter);
                metadata.Audio(metadataData.Audio);
                metadata.Light(metadataData.Light);
                metadata.Camera(metadataData.Camera);
                metadata.Cast(metadataData.Cast);
                metadata.Publisher(metadataData.Publisher);
                metadata.Summary(metadataData.Summary);
                metadata.DisplayDate(metadataData.DisplayDate);
                // console.log(metadataData.DisplayDate);

                metadata.Episode(metadataData.Episode);
                metadata.Format(metadataData.Format);
                metadata.FileCode(metadataData.FileCode);
                metadata.FileName(metadataData.FileName);
                metadata.FileCreator(metadataData.FileCreator);
                metadata.Duration(metadataData.Duration);
                metadata.ApprovedBy(metadataData.ApprovedBy);
                metadata.Rating(metadataData.Rating);
                metadata.PublicationHistory(metadataData.PublicationHistory);
                metadata.Bulletin(metadataData.Bulletin);
                metadata.Copyright(metadataData.Copyright);
                metadata.Language(metadataData.Language);
                metadata.Keyword(metadataData.Keyword);
                metadata.Type(metadataData.Type);
                metadata.TapeCode(metadataData.TapeCode);
                metadata.Award(metadataData.Award);


            }
            return metadata;
        }

    };

    return self;


});