/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 9/29/13
 * Time: 11:09 PM
 * To change this template use File | Settings | File Templates.
 */

// This function export an static object

define(['jquery', 'knockout', '../business/data','../business/constants' ],
    function($, ko, Data, Constants) {

        var self = {};

        self.AuthorizationKey = Constants.ApiConfiguration.AuthorizationKey;
        self.BaseUri = Constants.ApiConfiguration.BaseUri;
        self.AllowAuthorization = Constants.ApiConfiguration.AllowAuthorization;

        /*
         * Get data sent from user
         *
         */
        self.GetAllData = function (hourAgo, count) {
            var promise =
                $.ajax ({
                    url: self.BaseUri + "api/sessionresult/all/" +
                        "?count=" + count +
                        "&hourAgo=" + hourAgo,
                    dataType : "json",
                    type: "GET"
                    // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
                });
            return promise;
        };
        self.GetAllDataAfter = function (afterSessionResultId, hourAgo, count) {
            var promise =
                $.ajax ({
                    url: self.BaseUri + "api/sessionresult/all/" +
                        "?count=" + count +
                        "&afterSessionResultId=" + afterSessionResultId +
                        "&hourAgo=" + hourAgo,
                    dataType : "json",
                    type: "GET"
                    // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
                })
            return promise;
        };
        self.GetAllDataBefore = function (beforeSessionResultId, hourAgo, count) {
            var promise =
                $.ajax ({
                    url: self.BaseUri + "api/sessionresult/all/" +
                        "?count=" + count +
                        "&beforeSessionResultId=" + beforeSessionResultId +
                        "&hourAgo=" + hourAgo,
                    dataType : "json",
                    type: "GET"
                    // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
                })

            return promise;
        };

        /*
        * Get data sent from user
        *
        */
        self.GetLatestDataFromUser = function (userId, hourAgo, count) {
            var promise =
            $.ajax ({
                url: self.BaseUri + "api/sessionresult/fromuser/" + userId +
                    "?count=" + count +
                    "&hourAgo=" + hourAgo,
                dataType : "json",
                type: "GET"
                // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
            });
            return promise;
        };
        self.GetDataFromUserAfter = function (afterSessionResultId, userId, hourAgo, count) {
            var promise =
                $.ajax ({
                    url: self.BaseUri + "api/sessionresult/fromuser/" + userId +
                        "?count=" + count +
                        "&afterSessionResultId=" + afterSessionResultId +
                        "&hourAgo=" + hourAgo,
                    dataType : "json",
                    type: "GET"
                    // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
                })
            return promise;
        };
        self.GetDataFromUserBefore = function (beforeSessionResultId, userId, hourAgo, count) {
            var promise =
                $.ajax ({
                    url: self.BaseUri + "api/sessionresult/fromuser/" + userId +
                        "?count=" + count +
                        "&beforeSessionResultId=" + beforeSessionResultId +
                        "&hourAgo=" + hourAgo,
                    dataType : "json",
                    type: "GET"
                    // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
                })

            return promise;
        };


        /*
        * Get data sent to unit
        */
        self.GetLatestDataToUnit = function(unitId, hourAgo, count) {
            var promise =
                $.ajax ({
                    url: self.BaseUri + "api/sessionresult/tounit/" + unitId +  "?count=" + count + "&hourAgo=" + hourAgo,
                    dataType : "json",
                    type: "GET"
                    // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
                });
            return promise;
        };
        self.GetDataToUnitBefore = function(beforeSessionResultId, unitId, hourAgo, count) {


            var promise =
            $.ajax ({
                url: self.BaseUri + "api/sessionresult/tounit/" + unitId +
                    "?count=" + count +
                    "&beforeSessionResultId=" + beforeSessionResultId +
                    "&hourAgo=" + hourAgo,
                dataType : "json",
                type: "GET"
                // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
            });
            return promise;


        };
        self.GetDataToUnitAfter = function(afterSessionResultId, unitId, hourAgo, count) {
            var promise =
            $.ajax ({
                url: self.BaseUri + "api/sessionresult/tounit/" + unitId +
                    "?count=" + count +
                    "&afterSessionResultId=" + afterSessionResultId +
                    "&hourAgo=" + hourAgo,
                dataType : "json",
                type: "GET"
                // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
            });
            return promise;
        };

        /*
        * Get metadata of session file
        *
        */
        self.GetMetadata = function(sessionFileId) {
            var promise =
                $.ajax ({
                    url: self.BaseUri + "api/metadata/get/" + sessionFileId,
                    dataType : "json",
                    type: "GET"
                    // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
                });
            return promise;
        };
        self.GetUserData = function(userId) {
            var config =
            {
                url: self.BaseUri + "api/user/get/" + userId,
                dataType : "json",
                type: "GET"
                // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
            };

            if(self.AllowAuthorization) {
                config.beforeSend = function(xhr) {xhr.setRequestHeader('Authorization', self.AuthorizationKey)};
            }

            var promise =  $.ajax(config);
            return promise;
        };

        self.GetUnitDetail = function(unitId) {
            var config =
            {
                url: self.BaseUri + "api/unit/detail/" + unitId,
                dataType : "json",
                type: "GET"
                // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
            };

            if(self.AllowAuthorization) {
                config.beforeSend = function(xhr) {xhr.setRequestHeader('Authorization', self.AuthorizationKey)};
            }

            var promise =  $.ajax(config);
            return promise;
        };

        self.GetManageableUnits = function (userId) {
            var promise =
                $.ajax ({
                    url: Constants.ApiConfiguration.BaseUri + "api/unit/manage/" + userId,
                    dataType : "json",
                    type: "GET"
                    // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
                });
            return promise;
        };



    return self;


}
);