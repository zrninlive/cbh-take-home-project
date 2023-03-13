import { describe, it, expect } from "vitest";
// const { deterministicPartitionKey } = require("./dpk");
const { deterministicPartitionKey } = require("./dpk-refactored");

describe("Deterministic Partition Key Tests", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
    console.log(trivialKey);
  });

  it("Returns a hash with 128 chars when input an single char", () => {
    const trivialKey = deterministicPartitionKey("X");
    expect(trivialKey).length(128);
    console.log(trivialKey);
  });

  it("Returns a hash with 128 chars when input a number", () => {
    const trivialKey = deterministicPartitionKey(1);
    expect(trivialKey).length(128);
    console.log(trivialKey);
  });

  it("Returns the same value inputed in partitionKey if the value is lower than 256 chars", () => {
    const partitionLowerThanMaximum = "ABCD";

    const trivialKey = deterministicPartitionKey({
      partitionKey: partitionLowerThanMaximum,
    });

    expect(trivialKey).toBe(partitionLowerThanMaximum);
    console.log(trivialKey);
  });

  it("Returns hash updated for 128 chars if partitionKey is exceeded 256 chars", () => {
    const partitionExceededLength =
      "hGb3ypKKJVEGdD3ooNuscnYt8klZVvNK2yQn7lsRkNy2qIPmg0uCjCNQsMilRIN0D8kTvQaqcB5wTJM7mhvL2mTP2fuLxAayH95uzaoQ9Fzil0dLTR9pFaGoujNglC2ww6mCQQ7WEfBkO5fAEqdZTdGpf8fNDjoXTqQLrjgA6FhS5U7ralHzWIDbHhnb4Eap877aQToYHG80RZv0ckWlUoaxnhvMLrlf6kfLKliCPaBWhercg8MzD2I5EdLwLbu8J51o";

    const trivialKey = deterministicPartitionKey({
      partitionKey: partitionExceededLength,
    });

    expect(trivialKey).length(128);
    console.log(trivialKey);
  });

  it("Returns hash updated for 128 chars if event is exceeded 256 chars", () => {
    const partitionExceededLength =
      "hGb3ypKKJVEGdD3ooNuscnYt8klZVvNK2yQn7lsRkNy2qIPmg0uCjCNQsMilRIN0D8kTvQaqcB5wTJM7mhvL2mTP2fuLxAayH95uzaoQ9Fzil0dLTR9pFaGoujNglC2ww6mCQQ7WEfBkO5fAEqdZTdGpf8fNDjoXTqQLrjgA6FhS5U7ralHzWIDbHhnb4Eap877aQToYHG80RZv0ckWlUoaxnhvMLrlf6kfLKliCPaBWhercg8MzD2I5EdLwLbu8J51o";

    const trivialKey = deterministicPartitionKey(partitionExceededLength);

    expect(trivialKey).length(128);
    console.log(trivialKey);
  });
});
