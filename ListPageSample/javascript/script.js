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
        // just prints out the ID of the current view
        function handleViewChange(viewData) {
            var viewId = viewData.viewId;
            console.log(`Current view ID: ${viewId}`);
        }


        /*
         * Gets the document data we need
         */ 
        function getDocIds(data) {
            console.log(data["items"]);
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

                    //getData: {
                    //    method: function (payload){
                    //        console.log(payload)
                    //    }
                    //},

                    // the inbound transformer gets information about the query results
                    inboundTransformer: {
                        method: function (data) {
                            console.log("Data:");
                            console.log(data["items"]);
                            return data;
                        }
                    },

                    outboundTransformer: {
                        method: function (data) {
                            console.log(data)
                            return data;
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
