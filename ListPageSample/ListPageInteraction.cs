using System;
using System.Runtime.InteropServices;
using kCura.EventHandler;

namespace ListPageSample
{
    [kCura.EventHandler.CustomAttributes.Description("Sample Document object ListPage Event Handler")]
    [Guid("B6ABE979-BD53-4AE2-9966-4DF5E87FB25F")]
    public class ListPageInteraction : ListPageInteractionEventHandler
    {
        public override Response PopulateScriptBlocks()
        {
            Response response = new Response
            {
                Success = true,
                Message = String.Empty
            };

            string script = ScriptResource.script;

            string block = $"<script type=\"text/javascript\"> {script} </script>";
            RegisterStartupScriptBlock(new ScriptBlock()
            {
                Key = "script.js",
                Script = block
            });

            return response;
        }

        //public override string[] ScriptFileNames => new[] { "script.js" };
    }
}
