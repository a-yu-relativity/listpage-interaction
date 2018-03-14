/*
 * event names before v. 2.0.17.48 -> after
 * onPageChangeEvent(pageNavigationAPI) -> listPageChange(pageNavigationAPI)
 * onNewItemButtonCustomizeEvent(buttonAPI) -> newItemButtonInit(buttonAPI)
 * onCellFormattingEvent(cellFormattingAPI) -> cellFormattersInit(cellFormatterApi)
 * onDataSourceOverrideEvent(dataSourceAPI) -> dataSourceInit(dataSourceAPI)
 * onViewChangeEvent(viewChangeAPI) -> viewChange(viewChangeAPI)
 * onWidgetMenuCustomizeEvent(widgetMenuAPI) -> widgetMenuCreate(widgetMenuAPI)
*/

define(function () {
    function sampleHandler(api) {
        /*
         * Prints out the artifact ID of the current view
         */ 
        function handleViewChange(viewData) {
            var viewId = viewData.viewId;
            if (viewId !== null)
                console.log(`Current view ID: ${viewId}`);
        }


        /*
         * Gets the variable of a query string from URL
         */
        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
            console.log('Query variable %s not found', variable);
        }

        /*
         * Formats the query result data into a proper Response object
         * that the ListView can consume to render it properly on the front end.
         * @param data : should look something like this:
         *      CurrentStartIndex: 1
         *      IDWindow: [1034555, 1231251, 2346666]
         *      ObjectType: {DescriptorArtifactTypeID: 10, Guids: ...}
         *      ResultCount: 3
         *      Results: [{...}, {...}, {...}]
         *      Success: true
         *      TotalCount: 3
         */ 
        function formatResponse(data) {
            if (!data["Success"]) {
                return null;
            }

            var workspaceId = api.startupInfo.workspaceId;

            // can maybe hardcode to 1003663, but...
            var artifactId = parseInt(getQueryVariable("ArtifactID"));

            //// create the response object
            //var response = {};

            //// get the min/max indices and the total count
            //response["currentMinItemIndex"] = data["CurrentStartIndex"];
            //var currNumResults = data["ResultCount"];
            //response["currentMaxItemIndex"] = minItemIndex + currNumResults - 1;
            //response["grandTotalItems"] = data["TotalCount"];

            //// get the individual results
            //var resultArr = data["results"];

            //// and store them in the array
            //response["items"] = new Array(currNumResults);

            //// iterate through results and
            //// format the object instances (datarows)
            //for (var i = 0; i < currNumResults; i++) {
            //    var artifact = resultArr[i];
            //    if (artifact["Success"]) {
                    
            //        var fieldData = {};
            //        fieldData["Artifact ID"] = artifact["ArtifactID"];

            //        var obj = {}
            //        obj["fieldData"] = fieldData;
            //        response["items"].push(obj);
            //    }
            //}

            var response = api
                .inboundTranslationService
                .objectManager
                .translate(workspaceId, artifactId, data, null, null, null, null);

            return response;
        }

        /*
         * Gets the list of the currently filtered docs,
         * be it from a view or saved search
         */ 
        function getFilteredDocs(overrideApi) {
            console.log('Accessing currently filtered docs.');
            // set a custom data source factory function for item list
            overrideApi.setItemListDataSource(function (itemListDataSourceParams) {               
                return {

                    // the inbound transformer gets information about the query results
                    inboundTransformer: {
                        method: function (data) {
                            console.log("Data:");
                            console.log(data);
                            // for only the array of Artifact IDs, use
                            // data["IDWindow"]
                            var result = formatResponse(data);
                            return result;
                        }
                    }

                };
            });
        }

        // "subscribe" to the events--that is, handle them
        return {
            // handle the dataSourceInit event, which occurs
            // once upon page load
            dataSourceInit: getFilteredDocs,
            // handle the view change event, which occurs
            // every time the user changes the view
            viewChange: handleViewChange
        };
    }
    return sampleHandler;
});
