/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 10/2/13
 * Time: 9:44 AM
 * To change this template use File | Settings | File Templates.
 */
// define me
define(function() {

    var self = {};

    self.DisplayConfiguration = {
        ItemPerPage : 15,
        ItemPerAdministratorPage : 25
    };

    self.ApiConfiguration =    {
        AuthorizationKey : "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be",
        BaseUri : "http://192.168.0.108:7071/",
        AllowAuthorization : false
    };

    self.TranscodeStatus =
    {
        Transcoding : "Transcoding",
        Finished : "Finished"
    };

    self.Configuration =
    {
        FolderXml : "\\AsperaFolder",
            HostAddressHN : "download.fts.vtv.vn",
        UserHN : "svcAspera",
        PasswordHN : "Vtv@123",
        RateHN : 150000
    };


    return self;
});