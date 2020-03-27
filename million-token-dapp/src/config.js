export const PIXEL_TOKEN_ADDRESS = '0x7E3095625488192e38c7eefdeDd3840dac06E7d9'

export const PIXEL_TOKEN_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "newTokenCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_pixelId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "pixelBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "pixelBoughtOnSale",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_idPixel",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_newWeiPice",
        "type": "uint256"
      }
    ],
    "name": "pixelPriceModified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_sellerAddress",
        "type": "address"
      }
    ],
    "name": "pixelSetForSale",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newPrice",
        "type": "uint256"
      }
    ],
    "name": "tokenPriceModified",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "colonnesPixelImage",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "lignesPixelImage",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "nbOfPixels",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pairNotAvailable",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pixelForSale",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "line",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "column",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "priceWEI",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isAvailableForSale",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "hasBeenCreated",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pixelList",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "line",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "column",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "priceWEI",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isAvailableForSale",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "hasBeenCreated",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "line",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "column",
        "type": "uint256"
      }
    ],
    "name": "getInitialPixelPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_line",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_column",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_onSale",
        "type": "bool"
      }
    ],
    "name": "createPixel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pixelId",
        "type": "uint256"
      }
    ],
    "name": "getPixelLine",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pixelId",
        "type": "uint256"
      }
    ],
    "name": "getPixelCol",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pixelId",
        "type": "uint256"
      }
    ],
    "name": "buyPixel",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_line",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_column",
        "type": "uint256"
      }
    ],
    "name": "searchTokenByCoord",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_idPixel",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_newWeiPice",
        "type": "uint256"
      }
    ],
    "name": "modifyPixelPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_idPixel",
        "type": "uint256"
      }
    ],
    "name": "setPixelForSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pixelId",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "_pixelOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_weiPrice",
        "type": "uint256"
      }
    ],
    "name": "buyPixelForSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]