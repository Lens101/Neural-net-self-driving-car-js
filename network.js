class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }

  static feedForward(givenInputs, network) {
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }
    return outputs;
  }
}

class Level {
  constructor(inputCount, outputCount) {
    //setup the input and output nodes for each NN layer
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);

    //if a value exceeds a bias, the neuron will 'fire'.
    this.biases = new Array(outputCount);

    this.weights = [];
    //if n input nodes and m output nodes, create n*m array,
    //so each input node is connected to every output node & vv.
    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    }

    //to start: randomize the weights, biases of each node.
    Level.#randomize(this);
  }

  // static method as we want to serialize the object

  static #randomize(level) {
    //Give a random weight between -1 and 1 for every neuron in the NN.
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        //randomize
        level.weights[i][j] = Math.random() * 2 - 1;
      }
    }

    //randomize biases too
    for (let i = 0; i < level.biases.length; i++) {
      level.biases[i] = Math.random() * 2 - 1;
    }
  }

  //compute output values using FF algorithm
  static feedForward(givenInputs, level) {
    //pass the values taken via the sensor
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    }

    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }

      if (sum > level.biases[i]) {
        level.outputs[i] = 1;
      } else {
        level.outputs[i] = 0;
      }
    }

    return level.outputs;
  }
}
