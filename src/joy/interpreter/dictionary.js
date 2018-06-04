const CombinatorDefs = require('./combinator_defs')
const OperandDefs = require('./operand_defs')
const OperatorDefs = require('./operator_defs')
const PredicateDefs = require('./predicate_defs')

function Dictionary () {
  const definitions = {}

  function define (key, value) {
    if (Object.prototype.hasOwnProperty.call(definitions, key)) {
      throw new Error('Word "' + key + '" already defined')
    }
    definitions[key] = value
  }

  function get (key) {
    if (!Object.prototype.hasOwnProperty.call(definitions, key)) {
      throw new Error('Word "' + key + '" is not defined')
    }
    return definitions[key]
  }

  return { define: define, get: get }
}

Dictionary.stdlib = function stdlib () {
  const dict = Dictionary()
  function load (defs) {
    defs.forEach((def) => {
      dict.define(def.name, def)
    })
  }
  load(CombinatorDefs)
  load(OperandDefs)
  load(OperatorDefs)
  load(PredicateDefs)
  return dict
}

module.exports = Dictionary
