// Then, specify both jQuery and bootstrap as dependencies
define(function () {  
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
                console.info(rowData);
                return api.getCellData(defaultValue);
                });
        }


        function addColumn(overrideApi) {
            // set a custom data source factory function for item list
            overrideApi.setItemListDataSource(function (itemListDataSourceParams) {
                return {
                    inboundTransformer: {
                        method: function (data) {
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

                    // outboundTransformer: {
                    //    method: function (data) {
                    //        console.info(data);
                    //        return data;
                    //    }
                    // }
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

