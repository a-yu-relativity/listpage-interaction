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
         * Prints out the artifact ID of the current view (optional)
         */ 
        function handleViewChange(viewData) {
            var viewId = viewData.viewId;
            if (viewId !== null)
                console.log(`Current view ID: ${viewId}`);
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

                    inboundTransformer: {
                        method: function (data) {
                            console.log(data);
                            // to get the list of artifact ids:
                            var artifactIds = data["IDWindow"];
                            return api.inboundTranslationService.objectManager.translate(
                                itemListDataSourceParams.workspaceId,
                                itemListDataSourceParams.folderId,
                                data,
                                itemListDataSourceParams.callbacks.dataMappingCallback,
                                itemListDataSourceParams.callbacks.docReviewPrimingCallback,
                                itemListDataSourceParams.callbacks.refreshFILCallback,
                                itemListDataSourceParams.callbacks.getGroupDefinitionFieldName);
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
