    
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

    this.inputs = [],
    this.outputs = [],
    this.input = null,
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
    
        var inputs = midi.inputs.values(),
            outputs = midi.outputs.values();

        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            self.inputs.push(input.value);
        }

        for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
            self.outputs.push(output.value);
        }

        self.inputs = self.inputs.filter(function(item){
            return item.name !== '';
        });

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

    send: function (message) {
        this.output.send([177, 0, message]);
    },

    setInput: function (id) {
        var self = this;

        for (var i = this.inputs.length - 1; i >= 0; i--) {
            if (this.inputs[i].id = id){
                this.input = this.inputs[i];
            } 
        }
        this.input.onmidimessage = function(msg){

            self.callRecievers(msg);
        }
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

var Messenger = function Messenger (argument) {
    // dispaches messages from controls to the interface
};

var Control = function Control (argument) {};

var S = new Surface();  
