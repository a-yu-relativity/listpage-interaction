define(function ()
{
    function sampleHandler(api)
    {
        // Function that gets called when view/browser changed. Gets data object that has viewId, viewLabel and browser
        function viewChange(data)
        {
            //var viewId = data.viewId;
            //var browser = data.browser;
            // if (viewId === 1061130) {
            //     // do something
            //     console.log("Switched to extracted text view!")
            // }
            console.log("something happened.");
        }

        return {
            // Subscribe to the "viewChange" event
            viewChange: viewChange
        }
    }
    return sampleHandler;
});
