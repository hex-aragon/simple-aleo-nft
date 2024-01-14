function encodeToAsciiBinary(text) {
  const asciiBytes = Array.from(text, (char) => char.charCodeAt(0));
  const asciiBinary = asciiBytes.map((byte) =>
    byte.toString(2).padStart(8, "0")
  );
  const totalBits = 128;
  const remainingBits = totalBits - asciiBinary.join("").length;

  // Ensure remainingBits is non-negative
  const paddingBits = remainingBits >= 0 ? remainingBits : 0;

  // Dynamically pad with 0 based on the remainingBits
  const paddedBinary = asciiBinary.join("") + "0".repeat(paddingBits);

  return paddedBinary;
}

const text = "google.com/";
//const text = "aleo.org/social.png/";
const result = encodeToAsciiBinary(text);
console.log("result", result);

console.log(result);
const unsignedInt128Value = BigInt("0b" + result);
console.log(unsignedInt128Value);

//0110011101101111011011110110011101101100011001010010111001100011011011110110110100101111
//0110011101101111011011110110011101101100011001010010111001100011011011110110110100101111
//0000000000000000000000000000000000000000

//137489088058657146712104188238903640064u128
//137489088058657146712104188238903640064n

function decodeFromAsciiBinary(binaryString) {
  const chunkSize = 8;
  const chunks = binaryString.match(new RegExp(`.{1,${chunkSize}}`, "g"));
  const asciiBytes = chunks.map((chunk) => parseInt(chunk, 2));
  const decodedText = String.fromCharCode(...asciiBytes);
  return decodedText;
}

//const text2 = "google.com/";
const result2 = encodeToAsciiBinary(text);
console.log("Encoded result:", result2);

const unsignedInt128Value2 = BigInt("0b" + result2);
console.log("BigInt value:", unsignedInt128Value2);

const decodedText = decodeFromAsciiBinary(result2);
console.log("Decoded text:", decodedText);