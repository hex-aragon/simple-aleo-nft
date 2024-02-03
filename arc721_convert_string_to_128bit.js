function getSettingsFromNumber(settingNum) {
  const bitStringArray = settingNum
    .toString(2)
    .padStart(32, "0")
    .split("")
    .reverse();
  console.log("bitStringArray", bitStringArray);
  return {
    initialized: bitStringArray[0] === "1",
    active: bitStringArray[1] === "1",
    whiteList: bitStringArray[2] === "1",
    frozen: bitStringArray[3] === "1",
  };
}
//test url
//https://aleo-public.s3.us-west-2.amazonaws.com/testnet3/privacy-pride/1.json
function getBit(setting) {
  return setting ? "1" : "0";
}

function convertSettingsToNumber(settings) {
  console.log("call convertSettingsToNumber", settings);
  const { frozen, active, whiteList, initialized } = settings;
  console.log("after convertSettingsToNumber", settings);
  const bitString = `${getBit(frozen)}${getBit(whiteList)}${getBit(
    active
  )}${getBit(initialized)}`;

  console.log("bitString", bitString);
  return parseInt(bitString, 2);
}

function safeParseInt(value) {
  const parsedValue = parseInt(value, 10);
  console.log("parsedValue", parsedValue);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

function stringToBigInt(input) {
  console.log("call stringToBigInt", stringToBigInt);
  console.log("input", input);
  const encoder = new TextEncoder();
  const encodedBytes = encoder.encode(input);
  console.log("encoder", encoder);
  console.log("encodedBytes", encodedBytes);

  let bigIntValue = BigInt(0);
  console.log("bigIntValue", bigIntValue);

  for (let i = 0; i < encodedBytes.length; i++) {
    const byteValue = BigInt(encodedBytes[i]);
    console.log("byteValue", byteValue);

    const shiftedValue = byteValue << BigInt(8 * i);
    console.log("shiftedValue", shiftedValue);

    bigIntValue = bigIntValue | shiftedValue;
    console.log("bigIntValue", bigIntValue);
  }

  return bigIntValue;
}

function bigIntToString(bigIntValue) {
  console.log("call bigIntToString", bigIntToString);
  console.log("bigIntValue", bigIntValue);
  const bytes = [];
  let tempBigInt = bigIntValue;
  console.log("tempBigInt", tempBigInt);
  while (tempBigInt > BigInt(0)) {
    const byteValue = Number(tempBigInt & BigInt(255));
    console.log("byteValue", byteValue);

    bytes.push(byteValue);
    console.log("bytes", bytes);

    tempBigInt = tempBigInt >> BigInt(8);
    console.log("tempBigInt", tempBigInt);
  }

  const decoder = new TextDecoder();
  console.log("decoder", decoder);
  const asciiString = decoder.decode(Uint8Array.from(bytes));
  console.log("asciiString", asciiString);
  return asciiString;
}

function splitStringToBigInts(input) {
  const chunkSize = 16;
  const numChunks = Math.ceil(input.length / chunkSize);
  const bigInts = [];
  console.log("numChunks", numChunks);
  for (let i = 0; i < numChunks; i++) {
    const chunk = input.substr(i * chunkSize, chunkSize);
    console.log("chunk", chunk);

    const bigIntValue = stringToBigInt(chunk);
    console.log("bigIntValue", bigIntValue);

    bigInts.push(bigIntValue);
    console.log("bigInts", bigInts);
  }

  return bigInts;
}

function joinBigIntsToString(bigInts) {
  let result = "";

  for (let i = 0; i < bigInts.length; i++) {
    const chunkString = bigIntToString(bigInts[i]);
    console.log("chunkString", chunkString);
    result += chunkString;
    console.log("result", result);
  }

  return result;
}

function padArray(array, length) {
  const paddingLength = length - array.length;
  console.log("paddingLength", paddingLength);
  if (paddingLength <= 0) {
    return array;
  }

  const padding = Array(paddingLength).fill(BigInt(0));
  const paddedArray = array.concat(padding);
  console.log("padding", padding);
  console.log("paddedArray", paddedArray);
  return paddedArray;
}

function parseStringToBigIntArray(input) {
  const bigIntRegex = /([0-9]+)u128/g;
  const matches = input.match(bigIntRegex);

  if (!matches) {
    return [];
  }
  console.log("bigIntRegex", bigIntRegex);
  console.log("matches", matches);

  const bigInts = matches.map((match) => BigInt(match.slice(0, -4)));
  console.log("bigInts", bigInts);
  return bigInts;
}

function getPublicKeyFromFuture(input) {
  const keyRegex = /([0-9]+)field/g;
  const matches = input.match(keyRegex);

  if (!matches) {
    return "";
  }
  console.log("keyRegex", keyRegex);
  console.log("matches", matches);
  return matches[0];
}

function getRandomElement(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  console.log("randomIndex", randomIndex);
  console.log("list[randomIndex]", list[randomIndex]);
  return list[randomIndex];
}

const removeVisibilitySuffix = (str) => {
  console.log("str.replace(/.public$|.private$/,");
  return str.replace(/\.public$|\.private$/, "");
};

// 예시 URL
//const exampleUrl ="https://aleo-public.s3.us-west-2.amazonaws.com/testnet3/privacy-pride/1.json";
// original ipfs://bafkreibjfoldku25lppuc2eqyrxw23ld7ljk24a3bxk5zlrs2f4xrxdzri/
const exampleUrl = "bafkreibjfoldku25lppuc2eqyrxw23ld7ljk24a3bxk5zlrs2f4xrxdzri";
// URL을 아스키코드 8비트로 변환하고 0으로 패딩
const splitUrl = splitStringToBigInts(exampleUrl);
console.log("splitUrl", splitUrl);
const paddedAsciiUrl = padArray(splitUrl, 4);
console.log("Padded Ascii URL:", paddedAsciiUrl);
