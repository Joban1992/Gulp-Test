(function () {
    'use strict';

    angular.module('app',[])
      .factory('CoreHierarchy', ['$http', '$sce', 'ServerConfig', 'LoaderService',function CoreHierarchyFactory($http, $sce, ServerConfig, LoaderService) {
         // console.log(ServerConfig)
          var apiPath = ServerConfig.serverConfig;
          //var serverpath = apiPath.serverPath;
          var serverpath = apiPath.localPath;
          var baselJSONData = {},
              markedUpData,
              scope;
          return {

              // Function call to make a call to the Data API or Web API for getting data call
              getData: function () {
                  LoaderService.showLoader();
                  var promise = $http.get(serverpath + 'CoreHierarchy')
                                    .success(function (data) {
                                        LoaderService.hideLoader();
                                        return data.data;
                                    }).error(function (data) {
                                        LoaderService.hideLoader();

                                    });

                  return promise;
              },
              putData: function (data, url) {
                  LoaderService.showLoader();
                  var promise = $http.put(serverpath + url, data)
                             .success(function (response) {
                                 LoaderService.hideLoader();
                             })
                             .error(function (response) {
                                 LoaderService.hideLoader();
                                 return {
                                     "status": "data get request failed",
                                     "code": "404"
                                 };
                             });
                  return promise;
              },
              postData: function (data, url) {
                  LoaderService.showLoader();
                  var promise = $http.post(serverpath + url, data)
                                 .success(function (data) {
                                     LoaderService.hideLoader();
                                     return data.data;
                                 }).error(function (data) {
                                     LoaderService.hideLoader();
                                     return {
                                         "status": "data get request failed",
                                         "code": "404"
                                     };
                                 });

                  return promise;

              },
              getRegion: function () {
                  LoaderService.showLoader();
                  var promise = $http.get(serverpath + 'region')
                                    .success(function (data) {
                                        LoaderService.hideLoader();
                                        return data.data;
                                    }).error(function (data) {
                                        LoaderService.hideLoader();
                                        return {
                                            "status": "data get request failed",
                                            "code": "404"
                                        };
                                    });

                  return promise;
              },
              getReportType: function (id) {
                  LoaderService.showLoader();
                  var promise = $http.get(serverpath + '/reportType/region/' + id)
                                    .success(function (data) {
                                        LoaderService.hideLoader();
                                        return data.data;
                                    }).error(function (data) {
                                        LoaderService.hideLoader();
                                        return {
                                            "status": "data get request failed",
                                            "code": "404"
                                        };
                                    });

                  return promise;
              },
              getPortfolio: function (id) {
                  LoaderService.showLoader();
                  var promise = $http.get(serverpath + 'portfolio/reportType/' + id)
                                    .success(function (data) {
                                        LoaderService.hideLoader();
                                        return data.data;
                                    }).error(function (data) {
                                        LoaderService.hideLoader();
                                        return {
                                            "status": "data get request failed",
                                            "code": "404"
                                        };
                                    });

                  return promise;
              },
              getComponent: function () {
                  LoaderService.showLoader();
                  var promise = $http.get(serverpath + 'CoreHierarchy')
                                    .success(function (data) {
                                        LoaderService.hideLoader();
                                        return data.data;
                                    }).error(function (data) {
                                        LoaderService.hideLoader();
                                        return {
                                            "status": "data get request failed",
                                            "code": "404"
                                        };
                                    });

                  return promise;
              }

          };
      }]);
})();
