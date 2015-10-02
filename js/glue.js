    function UI(Surface){
    var self = this;
    this.$outputSel = $('#output');
    this.$surfaceSel = $('#surfaces');
    this.$logger = $('#logger');
    this.surfaceList = [];
    this.surface = Surface;
    this.surfaceWrapper = $('#surfaceWrapper');
    self.init();
}

UI.prototype = {

    init: function(){
        this.surface.registerReciever(this.postTologger, this);
        this.surface.registerReciever(this.surface.send, this);
        this.bindEvents();
    },

    buildOutputSelects: function () {

        var outs = this.surface.outputs;

        for (var i = outs.length - 1; i >= 0; i--) {
            $('<option>')
                .attr('value', outs[i].id)
                .text(outs[i].name)
                .appendTo(this.$outputSel);
        };
    },

    buildSurfaceSelects: function () {
        var self = this;        
        
        $.ajax({
            url: 'surfaces/surfaces.json',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(d) {
            var surfaces = d.surfaces;
            self.surfaceList = d.surfaces;
            
            for (var i = surfaces.length - 1; i >= 0; i--) {
                console.log(surfaces[i]);
                $('<option>')
                    .attr('value', surfaces[i].template)
                    .attr('data-theme', surfaces[i].css)
                    .text(surfaces[i].title)
                    .appendTo(self.$surfaceSel);
            };
        })
        .fail(function(d) {
            console.error("error", d);
        });
        
    },

    bindEvents: function(){

        var self = this;

        this.$outputSel.on('change', function(){
            var sel = $(this);
            self.$curOut.html(sel.html());
            self.surface.setOutput(sel.val());
        });

        this.$surfaceSel.on('change', function(){
            var sel = $(this);
            self.loadTemplate(sel.val(), sel.find('option:selected').html());
            self.loadTheme(sel.find('option:selected').data('theme'));
        });

        if(self.surface.outputs.length !== 0){
            self.surface.setOutput(self.surface.outputs[0].id);
        } else {
            $('#controls').empty().append('<div class="outputError"><strong>No Midi output device!</strong> Connect one and refresh this page</div>');
        }

        this.buildOutputSelects();
        this.buildSurfaceSelects();

        $(document).on('sendMidiMessage', function (e) {
            self.surface.callRecievers(e.originalEvent.detail)
            console.log(e.originalEvent.detail);
        });
    },

    loadTheme: function (file) {
        console.log(file);
        $('.themestyles').attr('disabled', 'disabled');
        $('head').append('<link class="themestyles" rel="stylesheet" href="surfaces/' + file + '" type="text/css" />');
    },

    loadTemplate: function (file, name) {
        console.log(file,this);
        this.surfaceWrapper.empty();
        this.surfaceWrapper.load('surfaces/'+file);
        $('#surfaceTitle').html(name);
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
