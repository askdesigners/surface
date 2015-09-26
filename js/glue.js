function UI(Surface){
    var self = this;
    this.$outputSel = $('#output'),
    this.$logger = $('#logger'),
    this.surface = Surface;
    self.init();
}

UI.prototype = {

    init: function(){
        this.surface.registerReciever(this.postTologger, this);
        this.surface.registerReciever(this.surface.send, this);
        this.bindEvents();
    },

    buildSelects: function () {

        var outs = this.surface.outputs;

        for (var i = outs.length - 1; i >= 0; i--) {
            $('<option>')
                .attr('value', outs[i].id)
                .text(outs[i].name)
                .appendTo(this.$outputSel);
        };
    },

    bindEvents: function(){

        var self = this;

        this.$outputSel.on('change', function(){
            var sel = $(this);
            self.$curOut.html(sel.html());
            self.surface.setOutput(sel.val());
        });

        self.surface.setOutput(self.surface.outputs[0].id);

        this.buildSelects();

        $(document).on('sendMidiMessage', function (e) {
            self.surface.callRecievers(e.originalEvent.detail)
            // console.log(e.originalEvent.detail);
        });
    },

    postTologger: function(event){

        // var self = this,
        //     data = event.data,
        //     cmd = data[0] >> 4,
        //     channel = data[0] & 0xf,
        //     type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
        //     note = data[1],
        //     velocity = data[2],
        //     message = '';
        // with pressure and tilt off
        // note off: 128, cmd: 8 
        // note on: 144, cmd: 9
        // pressure / tilt on
        // pressure: 176, cmd 11: 
        // bend: 224, cmd: 14

        // switch (type) {
        //     case 144: // noteOn message 
        //         console.log('note on', note);
        //         message = 'note on: ' + note;
        //         break;
        //     case 128: // noteOff message 
        //         console.log('note off', note);
        //         message = 'note off: ' + note;
        //         break;
        //     case 176: // noteOff message 
        //         console.log('cc', velocity);
        //         message = 'cc: ' + velocity;
        //         break;
        // }

        // console.log('data', data, 'cmd', cmd, 'channel', channel, 'type', type, 'note', note, 'velocity', velocity);
        // console.log(event);
        // var self = this;

        // var msgStr = Array.prototype.slice.call(message.data).join(' - ');

        // self.$logger.prepend('<p>' + message + '</p>');

    }
};
