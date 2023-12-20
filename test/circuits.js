const { assert } = require("chai");
const wasm_tester = require("circom_tester").wasm;

describe("Age verification circuit", function () {
  let ageVerCircuit;

  before(async function () {
    ageVerCircuit = await wasm_tester("age_ver/age_ver.circom");
  });

  it("Should succeed for age threshold 18 and dob 1998-06-06", async function () {
    const dobTimestamp = Math.floor(new Date("1998-06-06") / 1000);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const ageThreshold = 60 * 60 * 24 * 365 * 18;
    
    let input = {
        dobTimestamp,
        currentTimestamp,
        ageThreshold,
    };

    const witness = await ageVerCircuit.calculateWitness(input);
    await ageVerCircuit.assertOut(witness, {oldEnough: 1});
  });

  it("Should fail for age threshold 18 and dob 2012-06-06", async function () {
    const dobTimestamp = Math.floor(new Date("2012-06-06") / 1000);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const ageThreshold = 60 * 60 * 24 * 365 * 18;

    let input = {
      dobTimestamp,
      currentTimestamp,
      ageThreshold,
    };

    const witness = await ageVerCircuit.calculateWitness(input);
    await ageVerCircuit.assertOut(witness, {oldEnough: 0});
  });
});