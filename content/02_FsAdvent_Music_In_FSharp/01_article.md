
First of all, I'm happy to be part of this year's [F# Advent Calendar](https://sergeytihon.com/tag/fsadvent/), organized by [Sergey Tihon](https://twitter.com/sergey_tihon). Thank you Sergey for bringing the community together and doing all the organizational work. And thanks to all the other contributors for their great articles - the ones I read (not all, but many) are all worth reading.

I've been doing some work in the digital signal processing domain, coming from C#, but then moved to F# because I missed ways of abstracting certain aspects that are hard to achieve using an object oriented language, and I hope to attract one or another person to have a look at F# and see what it can do.


## Mission Goal

The basis of this article is my [contribution](http://schlenkr.binarygears.de/01_fsharp_dsp/01_Introduction.html) for the [Applied F# challenge 2019](http://foundation.fsharp.org/applied_fsharp_challenge). Here, I discuss how functions that are based on a local state can be composed in a convenient and pure way. This technique that I call **Local State Computation** (in contrast to the state monad, that works on a _global_ state) is useful in digital signal processing

In this article, we will try to achieve several things (in mixed order):

1. **Base Principle:** A quick TL;DR; / sum up of my **F# DSP** post to understand the local state computation.
2. **Synthesis:** We are going to model a [Monophone AM Synthesizer](https://de.wikipedia.org/wiki/Synthesizer) using this technique.
3. **Composition:** We look at a way of describing note patterns so that we can actually compose a tiny melody.
4. **Audio Out:** We finally use this to generate sound that you can hear.


## Setup / GitHub Repo

I set up a [Github Repo](https://github.com/ronaldschlenker/compost) where you can find the sources that are the basis of this article. The Readme.md describes the setup. It is all based on **F# Interactive**, so that you can play around if you want to.

**Important**

Please keep in mind that the source code provided here and on GitHub is only a proof of concept and it is only in a raw draft state. It's not production ready and there are a lot of things to do (concept work as well as code quality).

So, let's get our hands on...


## "Local State" Computations

One significant thing of signal processing and generation is this: The processing is based on past state. This means that we cannot just compose functions that know nothing about their previous evaluations - that might be the case for simple transformations. But if you look at a filter, you will quickly realize that it deals with a frequency spectrum. And frequency is something that spans over time - a single point is not enough. Now you could say that a filter gets a list of values as input, and not only a single value, so there's no need for "remembering" anything. That's true, but there exist filter designs that feed back their past output values - and that's state.

Have a look at this picture:

![Low pass filter](./lowPass.png)

This flow describes a simple low pass filter that depends on it's past output value. When it comes to using this low pass filter, we don't see that aspect: It simply looks like a function in a transformation pipeline:

![Low pass in use](./useLowPass.png)

### How to deal with local state?

Imperative languages solve this problem by mutation and references to these mutable values. OOP then encapsulates the data to ensure consistency (local state). But the user of all that has to deal with instances, which means: Describing a signal flow is made up of

1. Creating instances and holding them (in a variable).
2. Parametrize and "wire" the inputs / outputs of these instances to have an actual flow of values.

The first point is annoying - at least to me, because it makes playing around difficult. Compared to composing pure functions, it's more complicated. Function composition itself is very convenient - it's just functions combined in different ways: values get piped through a computation; that's it, and that's what we want to have, from a principle point of view.

### Past state with functions

In my [post](http://schlenkr.binarygears.de/01_fsharp_dsp/01_Introduction.html), I describe in detail how pure, but stateful functions have to look like, and how the composition wotks in detail. Here, I will only show how you can write and use those functions.

**Example:**

```fsharp
// Have a look at: ./src/0_localStateDemo.fsx

// a simple block that toggles ongoing from true to false with each evaluation
let invertGenerator seed =
    fun s r ->
        let v = not s
        { value = v; state = v }
    |> liftSeed seed
    |> Block
```

In this sample, we want to generate a sequence of alterning `true` `false` values. Of course this can be achieved in a lot of ways without using local state, but I use this sample to give you an idea of how it works.

If we look at the `invertGenerator` function, we can see how a stateful function has to look like:

* There is a lambda that has 2 parameters:
    * A state `s`: This is the last state that gets fed into.
    * A reader `r`: This is currently of no use, but gets useful when dealing with functions in a special context (that comes later).
    * It computes, and finally outputs a value and a new state. This new state will be fed into itself by in the next evaluation cycle.
* We have a seed value: An value that is the initial state that gets passed into the function. Here, the seed value is parametrizable, but it can also be a constant. The inner function is "lifted" with the seed.
* We name that whole thing `Block`.
* The whole `invertGenerator` function can be seen as a constructor for a `Block` function that can be parametrized.

**Evaluation:**

We can use this `block` to evaluate it n times - and get a sequence of n values. If you want to know how exactly this is done, have a look at the repo in the `Eval` module.

```fsharp
// Have a look at: ./src/0_localStateDemo.fsx

let invertGenerator seed =
    fun s r ->
        let v = not s
        { value = v; state = v }
    |> liftSeed seed
    |> Block

Core.Eval.Test.evalN (invertGenerator false) 10
// val it : bool list =
//     [true; false; true; false; true; false; true; false; true; false]
```

**Composition:**

Of course, we usually want to chain several blocks together. Here is our goal: We want to generate n values and transform their output. When the n values are done, we want to "mute" the channel:

```fsharp
// Have a look at: ./src/0_localStateDemo.fsx

let invertGenerator seed =
    fun s r ->
        let v = not s
        { value = v; state = v }
    |> liftSeed seed
    |> Block

let countEffect =
    fun s r ->
        { value = s; state = s + 1 }
    |> liftSeed 0
    |> Block

// goal: count n values, then mute.
let countUntil n =
    blockBase {
        let! value = invertGenerator false
        let! count = countEffect
        let output =
            if count < n then
                match value with
                | true -> "Oh Yeah!"
                | false -> "Oh no."
            else
                "That's it."
        return output
    }
    
Core.Eval.Test.evalN (countUntil 5) 10
// val it : string list =
//     ["Oh Yeah!"; "Oh no."; "Oh Yeah!"; "Oh no."; "Oh Yeah!"; "That's it.";
//      "That's it."; "That's it."; "That's it."; "That's it."]
```


Now we have everything we need to build our first synthesizer!

## Synthesis

Let's begin with a very simple tone generator: A sine wave. Now that it comes to audio signals, we have to understand what that is here:

* A (mono) signal is a sequence of floats (stereo will not be covered here, but it is a sequence of float tuples).
* There is a sample rate, often 44100Hz, which means: To play 1 second of "music", we need to generate 44100 float values.
* All that is then sent to the buffer of the sound card of your machine.

So, we need a generator that outputs floats. Here it is:

```fsharp
// Have a look at: ./src/lib/blocks.fsx - Osc module

let sin (frq: float) =
    let f angle (env: Env) =
        let newAngle = (angle + Const.pi2 * frq / (float env.sampleRate)) % Const.pi2
        { value = Math.Sin newAngle
          state = newAngle }

    f
    |> liftSeed 0.0
    |> Block

```

I won't go in the mathematical details, but let's look at the way it works from a principle point of view:

The first thing we can see here is that the state differs completely from the output value - that's an interesting fact, and just a side node: We cannot model oscillatory solely based on a "point in time" when we want them to be "modulated", which means: Changing the frequency over time. It leads to terrible cracks and other artifacts which you usually don't want to hear. This technique here in contrast gives us the possibility to "smoothly" modulate the frequency.

Then, have a look at the 2nd parameter: I told you before that there is a "reader" state that can be useful in the domain context. Here it is: We have `Env` data that gets passed into out stateful function, and it looks like this:

```fsharp
type Env =
    { samplePos: int
      sampleRate: int }

let toSeconds env = (double env.samplePos) / (double env.sampleRate)
```

So simple: `Env` gives us the sample rate and the current "song position" counted in samples. This information is important for certain audio synth and effect calculations, as we can see here.


## Audio playback

Let's "hear" our synth: There's a **windows-only** implementation in the file `./src/lib/playback.fsx`. It uses [CS Core Audio](https://github.com/filoe/cscore). I had started another implementation using a [Node audio server](https://github.com/ronaldschlenker/FluX/tree/master/src), but I had no time to integrate it for the FsAdvent - sorry for that.

Anyway: In the 55 LoC is all you need to play our sinus tone:

```fsharp
// Have a look at: ./src/1_playSimpleSinus.fsx

#load "./lib/playback.fsx"

open Microsoft.FSharp.Data.UnitSystems.SI.UnitSymbols

open Core
open Blocks
open Playback

// 1 - play a simple sin wave for 2.5 seconds
block {
    let! x = Osc.sin 2000.0
    return x * 0.5 
}
|> playSync 2.5<s>

```

We will use the `playSync` function to evaluate a `generator block` and send it's output to the soundcard for some seconds.


## Voice

So until here, we can generate an audio signal with a certain frequency. But if you think of a piano, there's more:

1. When hitting a key, the amplitude changes over time: At the beginning, there's an attack phase which is loud, and then a sustain phase (it's more complex, but let's keep it like that). You can hit and release a key, and after release, you can decide (with a pedal) if the tone should stop or sustain.
2. There's a note (frequency) associated with each key.

**Side node:** A piano is a polyphonic instrument, meaning that you can play and hear more than 1 note together. In this article, we only look at a monophone voice.

Let's start with the bottom - point 4:

### 1 - Envelope

Let's build an `attack-release` envelope. Forgive me - no sustain phase for today!

```fsharp
// Have a look at: ./src/lib/blocks.fsx - Envelope module

// we need the "releasing" phase to prevent hearable cracks
type FollowerMode =
    | Releasing of int
    | Following

// An Envelope follower (tc: time constant - play with it)
let follow tc (input: float) release =

    let seedValue = 0.0
    let seed = (seedValue, Following)
    
    fun s _ ->
        let lastValue, lastMode = s
        let lastMode' = if release then Releasing 1000 else lastMode
        
        let target,newMode =
            match lastMode' with
            | Following -> input, Following
            | Releasing remaining ->
                let x = remaining - 1
                (0.0, if x = 0 then Following else Releasing x)

        let diff = lastValue - target
        let out = lastValue - diff * tc
        
        { value = out
            state = out,newMode }
                
    |> liftSeed seed
    |> Block

/// An Attack-Release envelope (a, r)
let ar a r trigger resetTrigger =
    let target, tc =
        if trigger then 1.0, a
        else 0.0, r
    follow tc target resetTrigger
```

Our envelope is based on a `follower` with a simple principle, which is this: Take the difference between current input and the last output, and add a specific fraction of that difference something to the last output. The effect is that the output "follows" the input more or less slowly (defined by `tc`). The `ar` envelope uses this follower and wells it which value it should follow: 0.0 or 1.0.

So what are we going to do with this envelope? Remember: We wanted to shape the amplitude of our sinus tone, which means: multiply the output of the tone generator with the output of the envelope.

The envelope itself has parameters:

* A `trigger` (bool): When this is `true`, the envelope opens: It tries to reach the output value `1.0`, so that we can actually hear something. `false` means: stop playing; try to reach `0.0` as value to have silence.
* Depending on the `a` and `r` (attack - release) values, the opening and closing happens slower or faster.
* A `resetTrigger` value: We will see later why this is important, but we can retrigger the same tone, like hitting the same key on a piano, and we hear 2 different key strokes.

Putting the sine tone generator and the envelope together:

```fsharp

// TODO: Play for 0.5 seconds, then release

```

### 2 - Composition and Notes

Now we can play a nicely shaped sound, but we want more: We need a way of composing a melody. Before we can do that, we have to look at our building blocka once again, and see what we have:

* We have generators that can output tones at a frequence.
* We have envelopes that can be triggered (and retriggered).

We can now put this together in 2 types:

```fsharp
type Synth<'s> = Synth of (float -> Block<float, 's, Env>)
type Envelope<'s> = Envelope of (bool -> bool -> Block<float, 's, Env>)
```

We can now build a function that combines these 2:

```fsharp
let inline buildInstrument (Envelope envelope) (Synth synth) note resetTrigger =
    let initialFrq = 0.0
    
    // ( +-> ) This is a "feedback with no reader state". 
    // Why? -> We are able to feed back state not only
    // inside a block, but over a whole block composition.
    initialFrq +-> fun lastFrq ->
        block {
            let frq, isTriggered =
                match note with
                | None -> lastFrq, false
                | Some frq -> frq, true
            let! s = synth frq
            let! e = envelope isTriggered resetTrigger
            return { out = s * e
                        feedback = frq }
        }
```

The `buildInstrument` basically takes an envelope and a synth and combines them to a `Block`, that can again be evaluated.

There are 2 more parameters: `Note` and `resetTrigger`:

* `Note`: This gives us a frequency when something should be played (Some frq), or None when there should be silence (key is released).
* `resetTrigger`: A bool that represents if there happened a retrigger of the key (in case the same key is hit 2 times after another).

We can encode this as a curried function:

```fsharp
type Voice<'s> = Voice of (float option -> bool -> Block<float, 's, Env>)
```

Now, we need something for composition - a "sequencer": A sequencer will be parametrized with a list of "commands" how it has to trigger the voice. The commands are:

```fsharp
type Trigger =
    | Hold of float // key (frequency) is triggered (can also mean retriggered)
    | Sus           // "Please hold the current key"
    | Rel           // No key is pressed - come to silence.
```

The sequencer itself looks like this:

```fsharp
let sequencer (Voice voice) (bpm: float) beats (pattern: Trigger list) =

    let index l i =
        let length = l |> List.length
        let i' = i - (i / length * length)
        l.[i']

    let bps = bpm / 60.0
    let patternQuant = beats / 4.0
    let initials = (-1, 1000.0)

    // ( ++> ) Look at the comment in 'buildInstrument': This is the
    //         variant with reader state.
    initials ++> fun s (r: Env) ->
        block {
            let lastQuantIndex, lastFrq = s
            let currentSecs = toSeconds r
            let currentQuantIndex = (Math.Floor(bps * currentSecs * patternQuant) |> int)

            let beatChanged = currentQuantIndex <> lastQuantIndex

            let newQuantIndex, newFrq, trigger, resetTrigger =
                let step = index pattern currentQuantIndex

                match step with
                | Hold frq -> currentQuantIndex, frq, Some frq, beatChanged
                | Sus -> lastQuantIndex, lastFrq, Some lastFrq, false
                | Rel -> lastQuantIndex, lastFrq, None, false

            let! synthValue = voice trigger resetTrigger
            return { out = synthValue
                     feedback = newQuantIndex, newFrq }
        }
```

It gets our previousely composed `Voice`, some song infos (bpm - beats per minute) and the note quantization. The quantization (e.g. "8th notes") is used to interpret the length of the elements in the pattern.

The sequencer is - of cource - also a `Block` that can be evaluated. According to the quantization, it looks at the current note in the pattern and triggers the voice.

Notes are actually only `Trigger` values of type `Hold`:

```fsharp
module Notes =

    let c0 = Hold 16.351597831287414
    let cs0 = Hold 17.323914436054505
    let d0 = Hold 18.354047994837977
    let ds0 = Hold 19.445436482630058
    let e0 = Hold 20.601722307054366
    let f0 = Hold 21.826764464562746
    let fs0 = Hold 23.12465141947715
    let g0 = Hold 24.499714748859326
    let gs0 = Hold 25.956543598746574
    let a0 = Hold 27.5
    let as0 = Hold 29.13523509488062
    let b0 = Hold 30.86770632850775

    let c1 = Hold 32.70319566257483
    let cs1 = Hold 34.64782887210901
    let d1 = Hold 36.70809598967594
    // ...
```

Putting it all together, we can play a nice song I'm sure all of us know:

```fsharp

// Have a look at: ./src/MAIN_audioDemo.fsx

// an amplitude modulated synth (alternative 2)
let amSynth frq =
    block {
        let amount = 0.5
        let! modulator = 1.0 - (Osc.sin (frq * 1.5)) * amount
        let! v = (Osc.sin frq) * 0.5 * modulator
        let! lp = Filter.lowPass v { q = 1.0; frq = 4000.0; gain = 1.0 }
        return lp
    }

// create somthing "triggerable" by combining the am synth
// and an attack-release envelope
let synthVoice =
    let envelope = Envelope.ar 0.005 0.0001 |> Envelope
    let synth = amSynth |> Synth
    buildInstrument envelope synth |> Voice

// define a melody (no chords; just monophone notes)
let jingleBells = [
    
    e5; Sus;   e5; Sus;   e5; Sus;   Rel; Rel
    e5; Sus;   e5; Sus;   e5; Sus;   Rel; Rel
    
    e5; Sus;   g5; Sus;   c5; Sus;   Rel; d5
    e5; Sus;   Sus; Sus;  Rel; Rel;  Rel; Rel
    
    f5; Sus;   f5; Sus;   f5; Sus;   Rel; f5
    f5; Rel;   e5; Rel;   e5; Rel;   e5; e5
    
    g5; Rel;   g5; Rel;   f5; Sus;   d5; Sus
    c5; Sus;   Sus; Sus;  Sus; Rel;  Rel; Rel
    
    Rel; Rel;  Rel; Rel;  Rel; Rel;  Rel; Rel
]

// play the synth at 90 BPM. The pattern describes 16th notes
sequencer synthVoice 90.0 16.0 jingleBells 
|> playSync 12.0<s>
```

TODO: Embed twitter video

## TODO

* Github
    * Audio geht nur unter Windows
    * Order of Files
    * Demo Files und lib Ordner
    * Readme.md im GitHub Repo machen
* Polyphony
// TODO: Pattern should tell when it's "done" instead of specifying seconds to play
// Naming, code quality ist nicht so geil

