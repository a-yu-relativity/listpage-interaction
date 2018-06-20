define(function() {
    function sampleHandler(api) {
      function showMyModal() {
        var id = api.modalService.createModal({
          title: "My awesome modal",
          template: "<span>Some text</span>",
          buttons: [{name: "OK", eventName: "awesome_modal_ok_click"}],
          init: function(scope) {
            scope.$on("awesome_modal_ok_click", function() {
              // Close modal on the OK button click.
              api.modalService.hideModal(id);
            });
          }
        });
            //  api.modalService.showModal(id);
      }
      // Show this modal in 2 seconds.
      setTimeout(showMyModal, 2000);
      return {};
    }
    return sampleHandler;
  });