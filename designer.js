(function(Button) {
    "use strict";
    Button.setWidth(92);
    Button.setHeight(22);

    Button.addStates('hover', 'active', 'focus', 'disabled');
    Button.addEvent('action');

    var showUrl = function() {
        if(this.url() || this.url.boundDatasource()) {
            this.urlTarget.show();
        } else {
            this.urlTarget.hide();
        }
    };

    var showAction = function() {
        if(this.actionSource.boundDatasource() && this.actionSource.boundDatasource().datasourceName) {
            this.actionType.show();
        } else {
            this.actionType.hide();
        }
    };

    Button.doAfter('init', function() {
        showUrl.call(this);
        this.url.onChange(showUrl);
        this.subscribe('datasourceBindingChange', 'url', showUrl, this);

        showAction.call(this);
        this.actionSource.onChange(showAction);

        // disable click
        $(this.node).off('click', this._handleClick);
    });
});
