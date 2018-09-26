const ec = require('elliptic').ec
const random = require('secure-random')
const CryptoJS = require('crypto-js')
const SHA256 = require('js-sha256')
const ripemd160 = require('ripemd160')
const fs = require('fs')
const secp256k1 = new ec('secp256k1')

const walletDirectory = "wallets/"

const wallet = {}

/*(
  COMPLETED:
    Generate Keypair
    Retrieve PubKey using PrivKey
    Retrieve Address using Pub/Priv Key

    Encrypt(
        (username + passphrase) => validation, result saved on first line of file, 
          (private key) => comma separated value)
          e.g. Filename: username
               Contents: [Encryption of name+pass],[encryption of private key]
          User inputs username, pass -> compare with the contents of file(username)

  TODO:
    Sign transaction
    Verify transaction
)*/
wallet.generatePublicKeyFromPrivateKey = function(privateKey){
  //convert private key to public key, secp256k1
  let keys = secp256k1.keyFromPrivate(privateKey)
  let publicKey = keys.getPublic().getX().toString(16) + (keys.getPublic().getY().isOdd()?1:0)

  // console.log("Public Key Generated: ", publicKey)
  return publicKey
}

wallet.generateRandomPrivateKey = function(){
  //generate a random private key

  let privateKey = random.randomBuffer(32) //32byte hex digit
  const max = Buffer.from('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140', 'hex')

  while(Buffer.compare(max, privateKey) === 1){
    privateKey = random.randomBuffer(32)
  }

  privateKey = privateKey.toString('hex')

  // console.log("Private Key Generated: ", privateKey)
  return privateKey
}

wallet.generateAddressfromPubKey = function(publicKey){
  //generate a public key hash
//   let hash = SHA256(Buffer.from(publicKey, 'hex'))
//   let publicAddress = new ripemd160().update(Buffer.from(hash, 'hex')).digest()
  //generate an address
//   const step1 = Buffer.from("00" + publicKeyHash.toString('hex'), 'hex')
//   const step2 = SHA256(step1)
//   const step3 = SHA256(Buffer.from(step2, 'hex'))
//   const checksum = step3.substring(0, 8)
//   const step4 = step1.toString('hex') + checksum
//   const base58 = require('bs58')
//   const publicAddress = base58.encode(Buffer.from(step4, 'hex'))

  // console.log(publicAddress)
  return CryptoJS.RIPEMD160(publicKey).toString()
}

wallet.createRandomKeyPair = function() {
  let privateKey = this.generateRandomPrivateKey()
  let publicKey = this.generatePublicKeyFromPrivateKey(privateKey)
  // let publicAddress = this.generateAddressfromPubKey(publicKey)
  // return {privateKey, publicKey, publicAddress}
  return {privateKey, publicKey}
}

wallet.generateWallet = function(passphrase){
  // let {privateKey, publicKey, publicAddress} = this.createRandomKeyPair()
  let {privateKey, publicKey} = this.createRandomKeyPair()
  //Encrypt them
  let filename  = "FancyPurseCoinWalletLMAO_" + Math.round(+ new Date() / 1000) + "_" + Math.random(10000, 10000)+".txt"
  // let encryptedWhole = CryptoJS.AES.encrypt(filename+passphrase+","+privateKey+"|"+publicKey+"|"+publicAddress, passphrase).toString()
  let encryptedWhole = CryptoJS.AES.encrypt(filename+passphrase+","+privateKey+"|"+publicKey, passphrase).toString()
  // console.log("Encrypted everything: " + encryptedWhole)

  //create file with filename $name, encrypted data, store
  if (!fs.existsSync(walletDirectory)){
    fs.mkdirSync(walletDirectory)
  }


  fs.writeFile(walletDirectory + filename, encryptedWhole, "utf-8", (err) => {
    if (err){
      console.log("Failed to write file")
      throw err
    }
    console.log("File successfully written to " + walletDirectory+filename)
  })

  return filename
}

wallet.retrieveWallet = function(filename, passphrase){
  //retrieve file with filename $name
  // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
  // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  
  // let privateKey, publicKey, publicAddress

  let file = fs.readFileSync(walletDirectory+filename, "utf-8")
  let initialDecrypt
  try{
    initialDecrypt = CryptoJS.AES.decrypt(file, passphrase).toString(CryptoJS.enc.Utf8).split(",")
  }catch(err){
    console.log("Wrong filename or passphrase")
    return
  }

  // let [privateKey, publicKey, publicAddress] = initialDecrypt[1].split("|")
  let [privateKey, publicKey] = initialDecrypt[1].split("|")

  return {privateKey, publicKey}

}

wallet.calculateDataHash = function(transaction){
//   let appendTransactions = Object.keys(transaction).reduce((acc, key) =>{
//     return acc + transaction[key]
//   }, "")
    const transactionJSON = JSON.stringify(transaction)
        
    return CryptoJS.SHA256(transactionJSON).toString()
};

wallet.signTransaction = function(transaction, senderPrivKeyHex){ 
  const transactionDataHash = this.calculateDataHash(transaction)
  let keys = secp256k1.keyFromPrivate(senderPrivKeyHex)
  let signature = keys.sign(transactionDataHash)

  return [signature.r.toString(16), signature.s.toString(16)]
}

wallet.verifyTransaction = function(transaction, publicKey, signature){
  let transactionHash = this.calculateDataHash(transaction)  
  let pubKeyX = publicKey.substring(0, 64)
  let pubKeyYOdd = parseInt(publicKey.substring(64))
  let pubKeyPoint = secp256k1.curve.pointFromX(pubKeyX, pubKeyYOdd)

  let keyPair = secp256k1.keyPair({pub: pubKeyPoint})

  let result = keyPair.verify(transactionHash, {r:signature[0], s:signature[1]})

  return result
}

module.exports = wallet