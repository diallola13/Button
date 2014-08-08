WAF.define('Button', ['waf-core/widget'], function(Widget) {
    "use strict";

    var Button = Widget.create('Button', {
        tagName: 'button',
        title: Widget.property({
            defaultValueCallback: function() {
                return this.node.innerHTML;
            }
        }),
        plainText: Widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        actionSource: Widget.property({ type: 'datasource' }),
        actionType: Widget.property({
            type: 'enum',
            values: [ 'create', 'simple', 'save', 'next',
                    'previous', 'last', 'first', 'remove' ],
            defaultValue: 'simple',
            bindable: false
        }),
        url: Widget.property({ type: 'string' }),
        urlTarget: Widget.property({
            type: 'enum',
            values: ['_blank', '_self'],
            bindable: false
        }),
        render: function() {
            if(this.plainText()) {
                this.node.textContent = this.title();
            } else {
                this.node.innerHTML = this.title();
            }
        },
        init: function() {
            this.render();
            this.title.onChange(this.render);
            this.plainText.onChange(this.render);

            this._handleClick = function() {
                this.fire('action');

                if(this.actionSource() && this.actionType() in this.actionSource()) {
                    this.actionSource()[this.actionType()]();
                }

                if(this.url()) {
                    if(this.urlTarget() === '_blank') {
                        window.open(this.url());
                    } else {
                        window.location = this.url();
                    }
                }
            }.bind(this);
            $(this.node).on('click', this._handleClick)
        }
    });

    Button.inherit(WAF.require('waf-behavior/focus'));


    return Button;
});
