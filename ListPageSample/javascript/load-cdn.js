// First, specify the bootstrap CDN in the RequireJS config
requirejs.config({
    baseUrl: "js",
    paths: {
        // "jquery": ["//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min"],
        "bootstrap": ["//stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min"]
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"],
            exports: "$"
        }
    }
});

// Then, specify both jQuery and bootstrap as dependencies
define(["jquery", "bootstrap"], function ($) {

    if (typeof($.fn) !== 'undefined') {
        console.log("Loaded bootstrap");
        var bootstrap_ver = $.fn.tooltip.Constructor.VERSION;
        console.log(bootstrap_ver);  // => 4.1.1
    }

    function sampleHandler(api) {
        // our new field
        const FIELD_NAME = "My custom field";

        function formatCells(formatterApi) {
            formatterApi.fields.push({
                align: "center",
                columnName: FIELD_NAME,
                displayName: FIELD_NAME,
                fieldType: "fixedlengthtext",
                filterType: "relativity.fluidItemList.filters.fluid.PlaceHolder",
                filterWidgetMetaData: {
                    disableAdvancedMode: undefined,
                    field: undefined,
                    multiple: true,
                    operations: [
                        {
                            isDefault: true,
                            value: "parse to tokens"
                        }],
                    settings: {
                        multiple: {
                            buttonText: "Add condition",
                            enabled: false
                        }
                    }
                },
                filterable: true,
                formatOptions: {
                    dataLocation: FIELD_NAME,
                    isHtmlEnabled: false,
                    isLinked: false,
                    maxLength: 255,
                    urlLocation: "viewUrl"
                },
                hidden: false,
                initialWidth: 150,
                resizable: undefined,
                sortable: false,
                width: 150,
                wrapping: true
            });

            console.log(formatterApi.fields);

            formatterApi.setFormatter(FIELD_NAME, function (defaultValue, columnOptions, rowData, api) {
                return api.getCellData(defaultValue);
                });
        }


        function addColumn(overrideApi) {
            // set a custom data source factory function for item list
            overrideApi.setItemListDataSource(function (itemListDataSourceParams) {
                return {
                    //getData: {
                    //    method: function (queryPayload) {

                    //        // return a promise that contains the data from the query
                    //        var result = api.promise.defer();

                    //        //// create object manager prototype
                    //        //var ObjectManager = function(baseUrl) {
                    //        //    api.keplerProviderService.KeplerProxy.call(this, baseUrl);
                    //        //    var proxy = this;
                    //        //    this.queryObjects = function(payload, workspaceId) {
                    //        //        return api.keplerProviderService.callLRP(
                    //        //            proxy,
                    //        //            `/Relativity.Rest/API/Relativity.Objects/workspaces/${workspaceId}/objects`,
                    //        //            "query",
                    //        //            payload,
                    //        //            null,
                    //        //            null,
                    //        //            keplerVersion = 2
                    //        //        );
                    //        //    }
                    //        //}

                    //        //// initialize object manager service
                    //        //var objMgr = new ObjectManager("");

                    //        //// perform the query and get the results
                    //        //var data = objMgr.queryObjects(queryPayload, itemListDataSourceParams.workspaceId);
                    //        var workspaceId = itemListDataSourceParams.workspaceId;
                    //        console.info(queryPayload);
                    //        var requestUrl = `/Relativity.Rest/API/Relativity.Objects/workspaces/${workspaceId}/objects/query/`;

                    //        // get the payload
                    //        var payload = queryPayload["payload"];

                    //        $.ajax({
                    //            url: requestUrl,
                    //            type: 'POST',
                    //            data: JSON.stringify(payload),
                    //            beforeSend: function (request) {
                    //                request.setRequestHeader("X-CSRF-Header", window.top.GetCsrfTokenFromPage());
                    //                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    //            },
                    //            async: false,
                    //            success: function (response) {                                  
                    //                // get results
                    //                var results = response["Results"];
                                    
                    //                // modify the data
                    //                const FIELD_NAME = "My custom field";
                    //                results.forEach(function (result) {
                    //                    var fieldValPairs = result["Artifact"]["FieldValuePairs"];
                    //                    fieldValPairs.push({
                    //                        "Field": {
                    //                            "FieldType": "FixedLengthText",
                    //                            "ArtifactID": 0,
                    //                            "ViewFieldID": 0,
                    //                            "Guids": [],
                    //                            "Name": FIELD_NAME                                              
                    //                        },
                    //                        "Value": "FOO"
                    //                    });
                    //                });
                    //                result.resolve(response);

                    //                console.info(response);
                    //            }
                    //        });

                    //        return result.promise;
                    //    }
                    //},

                    inboundTransformer: {
                        method: function (data) {
                            //console.info("inbound:");
                            //console.info(data);

                            
                            //-----

                            var results = data["Results"];

                            // modify the data
                            results.forEach(function (result) {
                                var fieldValPairs = result["Artifact"]["FieldValuePairs"];
                                fieldValPairs.push({
                                    "Field": {
                                        "FieldType": "FixedLengthText",
                                        "ArtifactID": 0,
                                        "ViewFieldID": 0,
                                        "Guids": [],
                                        "Name": FIELD_NAME
                                    },
                                    "Value": "FOO"
                                });
                            });

                            // callback functions
                            var callbacks = itemListDataSourceParams.callbacks;
                            var dataMappingCallback = callbacks.dataMappingCallback;
                            var docReviewPrimingCallback = callbacks.docReviewPrimingCallback;
                            var refreshFILCallback = callbacks.refreshFILCallback;
                            var getGroupDefinitionFieldName = callbacks.getGroupDefinitionFieldName;

                            var result = api.inboundTranslationService.objectManager.translate(
                                itemListDataSourceParams.workspaceId,
                                itemListDataSourceParams.folderId,
                                data,
                                dataMappingCallback,
                                docReviewPrimingCallback,
                                refreshFILCallback,
                                getGroupDefinitionFieldName);

                            console.info(result);
                            return result;
                        }
                    },

                    //outboundTransformer: {
                    //    method: function (data) {
                    //        console.info(data);
                    //        return data;
                    //    }
                    //}
                };
            });
        }

        // "subscribe" to the events--that is, handle them
        return {
            // handle the dataSourceInit event, which occurs
            // once upon page load
            dataSourceInit: addColumn,

            cellFormattersInit: formatCells
        };
    }
    return sampleHandler;
});

