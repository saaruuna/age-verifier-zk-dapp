pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template AgeProof() {
    signal input dobTimestamp; // Timestamp of the Date of Birth in seconds
    signal input currentTimestamp; // Current time in seconds
    signal input ageThreshold; // Age threshold in seconds
    signal output oldEnough; // 1 or 0 if older than threshold

    signal age;
    age <== currentTimestamp - dobTimestamp;

    component gt = GreaterThan(252);
	gt.in[0] <== age;
	gt.in[1] <== ageThreshold;

    oldEnough <== gt.out;
}

component main {public [currentTimestamp, ageThreshold]} = AgeProof();