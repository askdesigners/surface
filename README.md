# Build web based midi controllers with markup

## [Check out a demo](http://ctrlblx.tellmesomethingnice.com/)

*This is an early alpha to gather feedback.*

___

# Welcome to Control Blocks!  
I'm building a platform that will let people (you) build midi controllers in the browser using simple html-like markup. Custom elements are used to build controllers. My original motivation was to address the fact that all the software synth editors out there are hopelessly tied to old and dying OS platforms (sound diver), or are hopelessly shitty (midiquest). The web lives forever.

___

## Custom Elements
Here's a preliminary list of elements. 

**Knobs**

```
<big-knob label="Cutoff" cc="74"/>
<mid-knob label="Resonance" cc="75"/>
<micro-knob label="EG1" cc="76"/>
```

**Sliders**

```
<big-slider label="Cutoff" cc="80"/>
<mid-slider label="Resonance" cc="81"/>
<micro-slider label="EG1" cc="82"/>
```

**Buttons**

```
<big-button label="EG 2 / Gate" cc="86"/>
<mid-button label="Sync" cc="87"/>
<micro-button label="Voice 1" cc="88"/>
```

**Components**

```
<btn-group label="Type" cc="90" buttons="LPF24 LPF12 BPF12 HPF12" button-vals="0 43 85 127"/>
<lfo-box label="LFO 1" wave-cc="87" rate-cc="27" waves="Saw Square Triangle S/H" wave-vals="0 43 85 127"/>
<adsr-env label="EG1" adsr-cc="23 24 25 26"/>
```

---

## This is a very basic proof-of-concept. See the road map at the bottom for some ideas I have so far.

## NOTE: All CC messages get sent to channel 2 right now. I'm working on getting the channels working properly. :p

---

# Get started

1.  Select your midi device in the upper right
2.  Load a controller from the upper left
3.  Test that you are able to get a midi signal out of the page

---

# Feature Roadmap

## If I can manage to carve out some time for this it would allow me to expand the concept considerably. Here are some ideas I have so far.

**Patches**

*   Patch saving and sharing
*   Patch rating + commenting
*   Patch morphing
*   Patch library, allowing you to save patches made by others

**Controllers**

*   Users will be able to make their own controllers using simple html-style markup
*   Users who don't want to code their own can put out a bounty for others to build a controller
*   Support for nrpn controller mappings
*   Possible support for sysex (we'll see about this one)

**Offline**

*   An offline app which can sync with the cloud to update and download new contrllers and patches, but also function without an internet connection

**Collaboration**  
_Hardware synths are awesome, and have large numbers of users. However they are essentially stuck in the 80s technologically. I want to add some collaborative features on top of these machines._

*   Realtime control of remote synths
*   Patch colaboration (multiple users editing one synth patch remotely)
*   Realtime streaming of midi data to remote synths (think about renting out your synth hourly over the internet)


---

# If you're having issues

## Make sure you are using Chrome, Firefox, Opera, Safari, or an IE newer than version 10\. If you're still having issues, try installing the ["Jazz Plugin"](http://jazz-soft.net/download/Jazz-Plugin/), which should get midi working. IF you still need some help, hit the "send me a message" button below.