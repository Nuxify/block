export const GreeterContractAddress =
  '0x093eb7ccAfa165D8D35c6666984de510Be58cBd2'
export const GreeterContractABI = [
  {
    inputs: [{ internalType: 'string', name: '_greeting', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'greet',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '_greeting', type: 'string' }],
    name: 'setGreeting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
