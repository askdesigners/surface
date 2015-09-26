    
function Surface(){
    // The whole collection of controls with all metadata about the control surface
    // synth
    // author
    // etc
    // bootstraps the whole app
    // loads theme
    // loads actual template
    // initializes the other objects based on the theme

    var self = this;

    this.outputs = [],
    this.output = null,
    this.hasDevices = false,
    this.recievers = [];

    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({
            sysex: false
        }).then(onMIDIWorks, onMIDIFailure);
    } else {
        console.warn("No MIDI support in your browser. Use Chrome instead!");    
    }

    function onMIDIFailure(e) {
        console.error("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
        return false;
    }

    function onMIDIWorks(midi) {
        // filters out unnamed midi devices and adds them to a useful array
        var outputs = midi.outputs.values();

        for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
            self.outputs.push(output.value);
        }

        self.outputs = self.outputs.filter(function(item){
            return item.name !== '';
        });

        self.hasDevices = true;

        self.init();

    }
};

Surface.prototype = {
    constructor: Surface,

    init: function(){
        new UI(this);
    },

    send: function (m) {
        this.surface.output.send([177, m.cc, m.val]);
    },

    setOutput: function (id) {
        for (var i = this.outputs.length - 1; i >= 0; i--) {
            if (this.outputs[i].id = id){
                this.output = this.outputs[i];
            } 
        }
    },

    registerReciever: function(recieverFunc, context) {
        this.recievers.push({func: recieverFunc, context: context});
    },

    callRecievers: function(msg){
        var self = this;
        if(msg){
            for (var i = this.recievers.length - 1; i >= 0; i--) {
                this.recievers[i].func.call(this.recievers[i].context, msg);
            }
        }
    }
};

var S = new Surface();  
