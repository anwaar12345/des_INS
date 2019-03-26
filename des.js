const DES = document.querySelector('#DES');
const DESKey = document.querySelector('#DESKey');
const plainMessage = document.querySelector('#plain');
const encryptedMessage = document.querySelector('#encrypted');
const encrypteBtn = document.querySelector('#encrypte');
const decrypteBtn = document.querySelector('#decrypte');
const resetBtn = document.querySelector('#reset');
DESKey.disabled = true;
let encryptedMessageChars = [];
let plainMessageChars = [];
let nsc = 0;
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const initialPermutation = [57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7, 56, 48, 40, 32, 24, 16, 8, 0, 58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6]
const permutationKey = [56, 48, 40, 32, 24, 16, 8, 0, 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 60, 52, 44, 36, 28, 20, 12, 4, 27, 19, 11, 3];
const keyDbox = [13, 16, 10, 23, 0, 4, 2, 27, 14, 5, 20, 9, 22, 18, 11, 3, 25, 7, 15, 6, 26, 19, 12, 1, 40, 51, 30, 36, 46, 54, 29, 39, 50, 44, 32, 47, 43, 48, 38, 55, 33, 52, 45, 41, 49, 35, 28, 31]
const expantionDbox = [31, 0, 1, 2, 3, 4, 3, 4, 5, 6, 7, 8, 7, 8, 9, 10, 11, 12, 11, 12, 13, 14, 15, 16, 15, 16, 17, 18, 19, 20, 19, 20, 21, 22, 23, 24, 23, 24, 25, 26, 27, 28, 27, 28, 29, 30, 31, 0]
const sbox = [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13, 15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9, 10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12, 7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9, 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4, 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14, 2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3, 12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13, 4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6, 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2, 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12, 13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
const straightDbox = [15, 6, 19, 20, 28, 11, 27, 16, 0, 14, 22, 25, 4, 17, 30, 9, 1, 7, 23, 13, 31, 26, 2, 8, 18, 12, 29, 5, 21, 10, 3, 24];
const finalPermutation = [39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25, 32, 0, 40, 8, 48, 16, 56, 24];
const symbolsToBinary = [{
    "symbol": "\u0000",
    "binary": "00000000"
    },
  {
    "symbol": "\u0001",
    "binary": "00000001"
  },
  {
    "symbol": "\u0002",
    "binary": "00000010"
  },
  {
    "symbol": "\u0003",
    "binary": "00000011"
  },
  {
    "symbol": "\u0004",
    "binary": "00000100"
  },
  {
    "symbol": "\u0005",
    "binary": "00000101"
  },
  {
    "symbol": "\u0006",
    "binary": "00000110"
  },
  {
    "symbol": "\u0007",
    "binary": "00000111"
  },
  {
    "symbol": "\b",
    "binary": "00001000"
  },
  {
    "symbol": "\t",
    "binary": "00001001"
  },
  {
    "symbol": "\n",
    "binary": "00001010"
  },
  {
    "symbol": "\u000b",
    "binary": "00001011"
  },
  {
    "symbol": "Ā",
    "binary": "00001100"
  },
  {
    "symbol": "ā",
    "binary": "00001101"
  },
  {
    "symbol": "\u000e",
    "binary": "00001110"
  },
  {
    "symbol": "\u000f",
    "binary": "00001111"
  },
  {
    "symbol": "\u0010",
    "binary": "00010000"
  },
  {
    "symbol": "\u0011",
    "binary": "00010001"
  },
  {
    "symbol": "\u0012",
    "binary": "00010010"
  },
  {
    "symbol": "\u0013",
    "binary": "00010011"
  },
  {
    "symbol": "\u0014",
    "binary": "00010100"
  },
  {
    "symbol": "\u0015",
    "binary": "00010101"
  },
  {
    "symbol": "\u0016",
    "binary": "00010110"
  },
  {
    "symbol": "\u0017",
    "binary": "00010111"
  },
  {
    "symbol": "\u0018",
    "binary": "00011000"
  },
  {
    "symbol": "\u0019",
    "binary": "00011001"
  },
  {
    "symbol": "\u001a",
    "binary": "00011010"
  },
  {
    "symbol": "\u001b",
    "binary": "00011011"
  },
  {
    "symbol": "\u001c",
    "binary": "00011100"
  },
  {
    "symbol": "\u001d",
    "binary": "00011101"
  },
  {
    "symbol": "\u001e",
    "binary": "00011110"
  },
  {
    "symbol": "\u001f",
    "binary": "00011111"
  },
  {
    "symbol": " ",
    "binary": "00100000"
  },
  {
    "symbol": "!",
    "binary": "00100001"
  },
  {
    "symbol": "\"",
    "binary": "00100010"
  },
  {
    "symbol": "#",
    "binary": "00100011"
  },
  {
    "symbol": "$",
    "binary": "00100100"
  },
  {
    "symbol": "%",
    "binary": "00100101"
  },
  {
    "symbol": "&",
    "binary": "00100110"
  },
  {
    "symbol": "'",
    "binary": "00100111"
  },
  {
    "symbol": "(",
    "binary": "00101000"
  },
  {
    "symbol": ")",
    "binary": "00101001"
  },
  {
    "symbol": "*",
    "binary": "00101010"
  },
  {
    "symbol": "+",
    "binary": "00101011"
  },
  {
    "symbol": ",",
    "binary": "00101100"
  },
  {
    "symbol": "-",
    "binary": "00101101"
  },
  {
    "symbol": ".",
    "binary": "00101110"
  },
  {
    "symbol": "/",
    "binary": "00101111"
  },
  {
    "symbol": "0",
    "binary": "00110000"
  },
  {
    "symbol": "1",
    "binary": "00110001"
  },
  {
    "symbol": "2",
    "binary": "00110010"
  },
  {
    "symbol": "3",
    "binary": "00110011"
  },
  {
    "symbol": "4",
    "binary": "00110100"
  },
  {
    "symbol": "5",
    "binary": "00110101"
  },
  {
    "symbol": "6",
    "binary": "00110110"
  },
  {
    "symbol": "7",
    "binary": "00110111"
  },
  {
    "symbol": "8",
    "binary": "00111000"
  },
  {
    "symbol": "9",
    "binary": "00111001"
  },
  {
    "symbol": ":",
    "binary": "00111010"
  },
  {
    "symbol": ";",
    "binary": "00111011"
  },
  {
    "symbol": "<",
    "binary": "00111100"
  },
  {
    "symbol": "=",
    "binary": "00111101"
  },
  {
    "symbol": ">",
    "binary": "00111110"
  },
  {
    "symbol": "?",
    "binary": "00111111"
  },
  {
    "symbol": "@",
    "binary": "01000000"
  },
  {
    "symbol": "A",
    "binary": "01000001"
  },
  {
    "symbol": "B",
    "binary": "01000010"
  },
  {
    "symbol": "C",
    "binary": "01000011"
  },
  {
    "symbol": "D",
    "binary": "01000100"
  },
  {
    "symbol": "E",
    "binary": "01000101"
  },
  {
    "symbol": "F",
    "binary": "01000110"
  },
  {
    "symbol": "G",
    "binary": "01000111"
  },
  {
    "symbol": "H",
    "binary": "01001000"
  },
  {
    "symbol": "I",
    "binary": "01001001"
  },
  {
    "symbol": "J",
    "binary": "01001010"
  },
  {
    "symbol": "K",
    "binary": "01001011"
  },
  {
    "symbol": "L",
    "binary": "01001100"
  },
  {
    "symbol": "M",
    "binary": "01001101"
  },
  {
    "symbol": "N",
    "binary": "01001110"
  },
  {
    "symbol": "O",
    "binary": "01001111"
  },
  {
    "symbol": "P",
    "binary": "01010000"
  },
  {
    "symbol": "Q",
    "binary": "01010001"
  },
  {
    "symbol": "R",
    "binary": "01010010"
  },
  {
    "symbol": "S",
    "binary": "01010011"
  },
  {
    "symbol": "T",
    "binary": "01010100"
  },
  {
    "symbol": "U",
    "binary": "01010101"
  },
  {
    "symbol": "V",
    "binary": "01010110"
  },
  {
    "symbol": "W",
    "binary": "01010111"
  },
  {
    "symbol": "X",
    "binary": "01011000"
  },
  {
    "symbol": "Y",
    "binary": "01011001"
  },
  {
    "symbol": "Z",
    "binary": "01011010"
  },
  {
    "symbol": "[",
    "binary": "01011011"
  },
  {
    "symbol": "\\",
    "binary": "01011100"
  },
  {
    "symbol": "]",
    "binary": "01011101"
  },
  {
    "symbol": "^",
    "binary": "01011110"
  },
  {
    "symbol": "_",
    "binary": "01011111"
  },
  {
    "symbol": "`",
    "binary": "01100000"
  },
  {
    "symbol": "a",
    "binary": "01100001"
  },
  {
    "symbol": "b",
    "binary": "01100010"
  },
  {
    "symbol": "c",
    "binary": "01100011"
  },
  {
    "symbol": "d",
    "binary": "01100100"
  },
  {
    "symbol": "e",
    "binary": "01100101"
  },
  {
    "symbol": "f",
    "binary": "01100110"
  },
  {
    "symbol": "g",
    "binary": "01100111"
  },
  {
    "symbol": "h",
    "binary": "01101000"
  },
  {
    "symbol": "i",
    "binary": "01101001"
  },
  {
    "symbol": "j",
    "binary": "01101010"
  },
  {
    "symbol": "k",
    "binary": "01101011"
  },
  {
    "symbol": "l",
    "binary": "01101100"
  },
  {
    "symbol": "m",
    "binary": "01101101"
  },
  {
    "symbol": "n",
    "binary": "01101110"
  },
  {
    "symbol": "o",
    "binary": "01101111"
  },
  {
    "symbol": "p",
    "binary": "01110000"
  },
  {
    "symbol": "q",
    "binary": "01110001"
  },
  {
    "symbol": "r",
    "binary": "01110010"
  },
  {
    "symbol": "s",
    "binary": "01110011"
  },
  {
    "symbol": "t",
    "binary": "01110100"
  },
  {
    "symbol": "u",
    "binary": "01110101"
  },
  {
    "symbol": "v",
    "binary": "01110110"
  },
  {
    "symbol": "w",
    "binary": "01110111"
  },
  {
    "symbol": "x",
    "binary": "01111000"
  },
  {
    "symbol": "y",
    "binary": "01111001"
  },
  {
    "symbol": "z",
    "binary": "01111010"
  },
  {
    "symbol": "{",
    "binary": "01111011"
  },
  {
    "symbol": "|",
    "binary": "01111100"
  },
  {
    "symbol": "}",
    "binary": "01111101"
  },
  {
    "symbol": "~",
    "binary": "01111110"
  },
  {
    "symbol": "",
    "binary": "01111111"
  },
  {
    "symbol": "",
    "binary": "10000000"
  },
  {
    "symbol": "",
    "binary": "10000001"
  },
  {
    "symbol": "",
    "binary": "10000010"
  },
  {
    "symbol": "",
    "binary": "10000011"
  },
  {
    "symbol": "",
    "binary": "10000100"
  },
  {
    "symbol": "",
    "binary": "10000101"
  },
  {
    "symbol": "",
    "binary": "10000110"
  },
  {
    "symbol": "",
    "binary": "10000111"
  },
  {
    "symbol": "",
    "binary": "10001000"
  },
  {
    "symbol": "",
    "binary": "10001001"
  },
  {
    "symbol": "",
    "binary": "10001010"
  },
  {
    "symbol": "",
    "binary": "10001011"
  },
  {
    "symbol": "",
    "binary": "10001100"
  },
  {
    "symbol": "",
    "binary": "10001101"
  },
  {
    "symbol": "",
    "binary": "10001110"
  },
  {
    "symbol": "",
    "binary": "10001111"
  },
  {
    "symbol": "",
    "binary": "10010000"
  },
  {
    "symbol": "",
    "binary": "10010001"
  },
  {
    "symbol": "",
    "binary": "10010010"
  },
  {
    "symbol": "",
    "binary": "10010011"
  },
  {
    "symbol": "",
    "binary": "10010100"
  },
  {
    "symbol": "",
    "binary": "10010101"
  },
  {
    "symbol": "",
    "binary": "10010110"
  },
  {
    "symbol": "",
    "binary": "10010111"
  },
  {
    "symbol": "",
    "binary": "10011000"
  },
  {
    "symbol": "",
    "binary": "10011001"
  },
  {
    "symbol": "",
    "binary": "10011010"
  },
  {
    "symbol": "",
    "binary": "10011011"
  },
  {
    "symbol": "",
    "binary": "10011100"
  },
  {
    "symbol": "",
    "binary": "10011101"
  },
  {
    "symbol": "",
    "binary": "10011110"
  },
  {
    "symbol": "",
    "binary": "10011111"
  },
  {
    "symbol": " ",
    "binary": "10100000"
  },
  {
    "symbol": "¡",
    "binary": "10100001"
  },
  {
    "symbol": "¢",
    "binary": "10100010"
  },
  {
    "symbol": "£",
    "binary": "10100011"
  },
  {
    "symbol": "¤",
    "binary": "10100100"
  },
  {
    "symbol": "¥",
    "binary": "10100101"
  },
  {
    "symbol": "¦",
    "binary": "10100110"
  },
  {
    "symbol": "§",
    "binary": "10100111"
  },
  {
    "symbol": "¨",
    "binary": "10101000"
  },
  {
    "symbol": "©",
    "binary": "10101001"
  },
  {
    "symbol": "ª",
    "binary": "10101010"
  },
  {
    "symbol": "«",
    "binary": "10101011"
  },
  {
    "symbol": "¬",
    "binary": "10101100"
  },
  {
    "symbol": "­",
    "binary": "10101101"
  },
  {
    "symbol": "®",
    "binary": "10101110"
  },
  {
    "symbol": "¯",
    "binary": "10101111"
  },
  {
    "symbol": "°",
    "binary": "10110000"
  },
  {
    "symbol": "±",
    "binary": "10110001"
  },
  {
    "symbol": "²",
    "binary": "10110010"
  },
  {
    "symbol": "³",
    "binary": "10110011"
  },
  {
    "symbol": "´",
    "binary": "10110100"
  },
  {
    "symbol": "µ",
    "binary": "10110101"
  },
  {
    "symbol": "¶",
    "binary": "10110110"
  },
  {
    "symbol": "·",
    "binary": "10110111"
  },
  {
    "symbol": "¸",
    "binary": "10111000"
  },
  {
    "symbol": "¹",
    "binary": "10111001"
  },
  {
    "symbol": "º",
    "binary": "10111010"
  },
  {
    "symbol": "»",
    "binary": "10111011"
  },
  {
    "symbol": "¼",
    "binary": "10111100"
  },
  {
    "symbol": "½",
    "binary": "10111101"
  },
  {
    "symbol": "¾",
    "binary": "10111110"
  },
  {
    "symbol": "¿",
    "binary": "10111111"
  },
  {
    "symbol": "À",
    "binary": "11000000"
  },
  {
    "symbol": "Á",
    "binary": "11000001"
  },
  {
    "symbol": "Â",
    "binary": "11000010"
  },
  {
    "symbol": "Ã",
    "binary": "11000011"
  },
  {
    "symbol": "Ä",
    "binary": "11000100"
  },
  {
    "symbol": "Å",
    "binary": "11000101"
  },
  {
    "symbol": "Æ",
    "binary": "11000110"
  },
  {
    "symbol": "Ç",
    "binary": "11000111"
  },
  {
    "symbol": "È",
    "binary": "11001000"
  },
  {
    "symbol": "É",
    "binary": "11001001"
  },
  {
    "symbol": "Ê",
    "binary": "11001010"
  },
  {
    "symbol": "Ë",
    "binary": "11001011"
  },
  {
    "symbol": "Ì",
    "binary": "11001100"
  },
  {
    "symbol": "Í",
    "binary": "11001101"
  },
  {
    "symbol": "Î",
    "binary": "11001110"
  },
  {
    "symbol": "Ï",
    "binary": "11001111"
  },
  {
    "symbol": "Ð",
    "binary": "11010000"
  },
  {
    "symbol": "Ñ",
    "binary": "11010001"
  },
  {
    "symbol": "Ò",
    "binary": "11010010"
  },
  {
    "symbol": "Ó",
    "binary": "11010011"
  },
  {
    "symbol": "Ô",
    "binary": "11010100"
  },
  {
    "symbol": "Õ",
    "binary": "11010101"
  },
  {
    "symbol": "Ö",
    "binary": "11010110"
  },
  {
    "symbol": "×",
    "binary": "11010111"
  },
  {
    "symbol": "Ø",
    "binary": "11011000"
  },
  {
    "symbol": "Ù",
    "binary": "11011001"
  },
  {
    "symbol": "Ú",
    "binary": "11011010"
  },
  {
    "symbol": "Û",
    "binary": "11011011"
  },
  {
    "symbol": "Ü",
    "binary": "11011100"
  },
  {
    "symbol": "Ý",
    "binary": "11011101"
  },
  {
    "symbol": "Þ",
    "binary": "11011110"
  },
  {
    "symbol": "ß",
    "binary": "11011111"
  },
  {
    "symbol": "à",
    "binary": "11100000"
  },
  {
    "symbol": "á",
    "binary": "11100001"
  },
  {
    "symbol": "â",
    "binary": "11100010"
  },
  {
    "symbol": "ã",
    "binary": "11100011"
  },
  {
    "symbol": "ä",
    "binary": "11100100"
  },
  {
    "symbol": "å",
    "binary": "11100101"
  },
  {
    "symbol": "æ",
    "binary": "11100110"
  },
  {
    "symbol": "ç",
    "binary": "11100111"
  },
  {
    "symbol": "è",
    "binary": "11101000"
  },
  {
    "symbol": "é",
    "binary": "11101001"
  },
  {
    "symbol": "ê",
    "binary": "11101010"
  },
  {
    "symbol": "ë",
    "binary": "11101011"
  },
  {
    "symbol": "ì",
    "binary": "11101100"
  },
  {
    "symbol": "í",
    "binary": "11101101"
  },
  {
    "symbol": "î",
    "binary": "11101110"
  },
  {
    "symbol": "ï",
    "binary": "11101111"
  },
  {
    "symbol": "ð",
    "binary": "11110000"
  },
  {
    "symbol": "ñ",
    "binary": "11110001"
  },
  {
    "symbol": "ò",
    "binary": "11110010"
  },
  {
    "symbol": "ó",
    "binary": "11110011"
  },
  {
    "symbol": "ô",
    "binary": "11110100"
  },
  {
    "symbol": "õ",
    "binary": "11110101"
  },
  {
    "symbol": "ö",
    "binary": "11110110"
  },
  {
    "symbol": "÷",
    "binary": "11110111"
  },
  {
    "symbol": "ø",
    "binary": "11111000"
  },
  {
    "symbol": "ù",
    "binary": "11111001"
  },
  {
    "symbol": "ú",
    "binary": "11111010"
  },
  {
    "symbol": "û",
    "binary": "11111011"
  },
  {
    "symbol": "ü",
    "binary": "11111100"
  },
  {
    "symbol": "ý",
    "binary": "11111101"
  },
  {
    "symbol": "þ",
    "binary": "11111110"
  },
  {
    "symbol": "ÿ",
    "binary": "11111111"
  }
]
  

DES.addEventListener('click', (e) => {
    DESKey.disabled = false;
})
encrypteBtn.addEventListener('click', (e) => {
     if (DES.checked) {
        if (DESKey.value === "") {
            alert("you must enter a key of 8 characters! cant leave blank!")
        } else if (DESKey.value.length !== 8) {
            alert("your key must have the lenght of 8 characters!")
        } else if (plainMessage.value === "") {
            alert("you must  plain text/Message to encrypt!")
        } else {
            //prepare plain blocks
            space = '';
            numOfspaces=0;
            plainBlocks = [];
            encryptBlocks = [];
            plainBinary =[];
            encrypteBinary = [];
            encryptedtext = '';
            keyCompression = [];
            keyBinary=[];
            keyPermuted=[];
            keyC0=[];
            keyD0=[];
            keyS=[];
            key=[];
            left = '';
            right = '';
            finalRight = '';
            finalLeft = '';
            final = [];
            rightFun = [];
            finalBinary = [];
            finalB = '';
            encryptedMessage.value='';
            if (plainMessage.value.length%8 !==0){
                for (d = 0; d < 8 - (plainMessage.value.length % 8);d++){
                    space+=' ';
                    numOfspaces++;
                }
                plainMessage.value = plainMessage.value+space;
            }
            plainBinary = convertToBinary(plainMessage.value);
            plainBlocks = [];
            for (i = 0; i < plainBinary.length / 64; i++) {
                plainBlocks.push(plainBinary.substring(i * 64, (i + 1) * 64));

            }
            //initial
            encryptedtext = '';
            keyBinary = convertToBinary(DESKey.value).split('');
            keyCompression = [];
            keyPermuted = permute(keyBinary, permutationKey);
            keyC0 = keyPermuted.join('').substring(0, 28).split('');
            keyD0 = keyPermuted.join('').substring(28).split('');
            for (q = 0; q < 16; q++) {
                if (q === 0 || q === 1 || q === 8 || q === 15) {
                    keyC0 = keyShift(keyC0, 1);
                    keyD0 = keyShift(keyD0, 1);
                } else {
                    keyC0 = keyShift(keyC0, 2);
                    keyD0 = keyShift(keyD0, 2);
                }
                keyS = keyC0.concat(keyD0);
                key = permute(keyS, keyDbox);
                keyCompression.push(key);
            }
            for(m=0;m<plainBlocks.length;m++){
            plainBlocks[m] = permute(plainBlocks[m].split(''), initialPermutation);
            plainBlocks[m] = plainBlocks[m].join('');
            left = plainBlocks[m].substring(0, 32);
            right = plainBlocks[m].substring(32, 64);
            for (w = 0; w < 16; w++) {
                rightFun = desFunction(right, keyCompression[w]);
                xOR(rightFun, left, left.length);
                finalRight = xor.join('');
                finalLeft = right;
                right = finalRight;
                left = finalLeft;
            }
            final = right + left;
            final =permute(final.split(''),finalPermutation);
              final = final.join('');
            finalB+=final;
          }
            finalBinary = [];
          for (e = 0; e < finalB.length/8; e++) {
                finalBinary.push(finalB.substring(e * 8, (e + 1) * 8));
            }
                // console.log(`encrypt after : ${finalBinary.join('')}`)
            encryptedtext+=(convertToText(finalBinary));
            left='';
            right='';
            finalRight='';
            finalLeft='';
            final=[];
            rightFun=[];
            finalBinary = [];
        
            encryptedMessage.value = encryptedtext;
            plainMessage.value='';
        }
    }
    // when no chose type of cipher  
    else {
        alert("please check DES Radio Button to enable Key input box!")
    }
})

decrypteBtn.addEventListener('click', (e) => {
    // when select DES
    if (DES.checked) {
        if (DESKey.value === "") {
            alert("you must enter a key of 8 characters!")
        } else if (DESKey.value.length !== 8) {
            alert("your key must have the lenght of 8 characters!")
        } else if (encryptedMessage.value === "") {
            alert("you must entre encrypted Message ")
        } else {
            space = '';
            numOfspaces2 = 0;
            plainBlocks = [];
            encryptBlocks=[];
            plainBinary = [];
            encrypteBinary=[];
            encryptedtext = '';
            keyCompression = [];
            keyBinary = [];
            keyPermuted = [];
            keyC0 = [];
            keyD0 = [];
            keyS = [];
            key = [];
            left = '';
            right = '';
            finalRight = '';
            finalLeft = '';
            final = [];
            rightFun = [];
            finalBinary = [];
            plainMessage.value = '';
            if (encryptedMessage.value.length % 8 !== 0) {
                for (d = 0; d < 8 - (encryptedMessage.value.length % 8); d++) {
                    space += ' ';
                    numOfspaces2++;
                }
                encryptedMessage.value = encryptedMessage.value + space;
            }
            encrypteBinary = convertToBinary(encryptedMessage.value);
            encryptBlocks = [];
            for (i = 0; i < encrypteBinary.length / 64; i++) {
                encryptBlocks.push(encrypteBinary.substring(i * 64, (i + 1) * 64));
            }
            //initial
            keyBinary = convertToBinary(DESKey.value).split('');
            plainText = '';
            keyCompression = [];

            keyPermuted = permute(keyBinary, permutationKey);

            keyC0 = keyPermuted.join('').substring(0, 28).split('');

            keyD0 = keyPermuted.join('').substring(28).split('');

            for (q = 0; q < 16; q++) {
                if (q === 0 || q === 1 || q === 8 || q === 15) {
                    keyC0 = keyShift(keyC0, 1);
                    keyD0 = keyShift(keyD0, 1);
                } else {
                    keyC0 = keyShift(keyC0, 2);
                    keyD0 = keyShift(keyD0, 2);
                }
                keyS = keyC0.concat(keyD0);
                key = permute(keyS, keyDbox);
                keyCompression.push(key);

            }

            for (m = 0; m < encryptBlocks.length; m++) {
            encryptBlocks[m] = permute(encryptBlocks[m].split(''), initialPermutation);
            encryptBlocks[m] = encryptBlocks[m].join('');
            left = encryptBlocks[m].substring(0, 32);
            right = encryptBlocks[m].substring(32, 64);
            for (w = 15; w >= 0; w--) {
                              
                 rightFun = desFunction(right, keyCompression[w]);
                xOR(rightFun, left, left.length);
                finalRight = xor.join('');
                finalLeft = right;
                right = finalRight;
                left = finalLeft;
            }
            final = right + left;
            final = permute(final.split(''), finalPermutation);
            final = final.join('');
            finalBinary = [];
            for (e = 0; e < 8; e++) {
                finalBinary.push(final.substring(e * 8, (e + 1) * 8));
            }
            plainText += convertToText(finalBinary);
                left = '';
                right = '';
                finalRight = '';
                finalLeft = '';
                final = [];
                rightFun = [];
                finalBinary = [];
        }
            encryptedMessage.value = '';
            plainText=plainText.split('');
            for(v=0;v<numOfspaces;v++){
                plainText.pop();
            }
            plainText = plainText.join('');
            plainMessage.value = plainText;
        }
    }
    
    else {
        alert("please first perform encryption then the decryption will be done!");
    }
})
resetBtn.addEventListener('click', (e) => {
    DES.checked = false;
    DESKey.disabled = true;
    DESKey.value = "";
    plainMessage.value = "";
    encryptedMessage.value = "";
})

function convertToBinary(string) {
    stringBinary = '';
    for (r = 0; r < string.length; r++) {
        for (j = 0; j < symbolsToBinary.length; j++) {
            if (string[r] === symbolsToBinary[j].symbol) {
                stringBinary += symbolsToBinary[j].binary;
                break;
            }
        }
    }
    return stringBinary;
}

function permute(array, permutationMatrix) {
    newArray = [];
    for (t = 0; t < permutationMatrix.length; t++) {
        newArray.push(array[permutationMatrix[t]])
    }
    return newArray;
}

function keyShift(key, num) {
    for (y = 0; y < num; y++) {
        key.push(key[0]);
        key.splice(0, 1);
    }
    return key;
}

function desFunction(right, key) {
    right = right.split('');
    right = permute(right, expantionDbox);
    xOR(right, key, right.length);
    right = xor.join('');
    sboxBlocks = [];
    for (u = 0; u < 8; u++) {
        sboxBlocks.push(right.substring(u * 6, (u + 1) * 6));
    }
    outputSbox = [];
    for (i = 0; i < 8; i++) {
        addzeros = '';
        rowNum = parseInt(sboxBlocks[i][0] + sboxBlocks[i][5], 2);
        columnNum = parseInt(sboxBlocks[i].substring(1, 5), 2);
        xboxNum = i;
        fourBits = sbox[(rowNum * 16 + columnNum) + xboxNum * 64].toString(2);
        if (fourBits.length < 4) {
            for (j = 0; j < 4 - fourBits.length; j++) {
                addzeros += '0';
            }
        }
        fourBits = addzeros.concat(fourBits);
        outputSbox.push(fourBits);
    }
    right = outputSbox.join('');
    right = permute(right, straightDbox);
    return right;
}

function xOR(num1, num2, length) {
    xor = [];
    for (o = 0; o < length; o++) {
        xor.push((parseInt(num1[o]) ^ parseInt(num2[o])).toString());
    }
}

function convertToText(string) {
    stringText = '';
   
    for (p = 0; p < string.length; p++) {
        for (a = 0; a < symbolsToBinary.length; a++) {
            if (string[p] === symbolsToBinary[a].binary) {
                stringText+=symbolsToBinary[a].symbol;
            }
        }
    }
    return stringText;
}