
Since we now know what a signal is (a value that changes over time), that DSP is easy (dealing with sequences of values), and that we are interested in functions that transform scalar inputs into scalar outputs, let us start directly by writing a processing function. Later on, you will see how to compose these small functions to a larger system.

### Amplifier

Amplifying signals is a science in itself. You could spend a lot of money buying analog gear that sounds just "right," but "right" is a subjective term based on a user's preferences. For us, a simple solution will be enough. Amplification of a signal in this context means scale values linearly. We can do that this way:

![Before Amp - After Amp](./chart_input_and_amp.png)

Linear scaling of a value is mathematically just a multiplication, so that is indeed very simple. This function does the job:

```fsharp
// float -> float -> float
let amp amount input : float = input * amount
```

### Another Example: Hard Limiter

Now that we have our amplifier, we want to have the ability to _limit_ a signal to a certain boundary. Again, there are a lot of ways to do this in a "nice" sounding way, but we will use a very simple technique that leads to a very harsh sounding distortion when the input signal gets limited. The limiter looks like this:

```fsharp
// float -> float -> float
let limit threshold input : float =
    if input > threshold then threshold
    else if input < -threshold then -threshold
    else input
```
