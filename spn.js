let key = string2Binary("security");
let s_Boxes ="";
let cipherText = "";

function string2Binary(string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2).padStart(8,0);
    }).join('');
}

function binary2String(str) {
    var newBin = []
    for(let i = 0; i<str.length;i+=8){
        newBin.push(str.substring(i,i+8))
    }
    var binCode = [];
    for (let i = 0; i < newBin.length; i++) {
        binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
      }
    return binCode.join("");
}

function substitution(data){
    let p_Data=""
    p_Data += data[2]; p_Data += data[8]; p_Data += data[12]; p_Data += data[5];
    p_Data += data[9]; p_Data += data[0]; p_Data += data[14]; p_Data += data[4];
    p_Data += data[11]; p_Data += data[1]; p_Data += data[15]; p_Data += data[6];
    p_Data += data[3]; p_Data += data[10]; p_Data += data[7]; p_Data += data[13];
    return p_Data
}

function r_Substitution(data){
    let rp_Data = "";
    rp_Data += data[5]; rp_Data += data[9];  rp_Data += data[0];  rp_Data += data[12];
    rp_Data += data[7]; rp_Data += data[3];  rp_Data += data[11]; rp_Data += data[14];
    rp_Data += data[1]; rp_Data += data[4];  rp_Data += data[13]; rp_Data += data[8];
    rp_Data += data[2]; rp_Data += data[15]; rp_Data += data[6]; rp_Data += data[10];
    return rp_Data;
}

function xor(string,subKey){
    let bin_xor= "";
    let xor = 0;
    for (let i = 0; i < string.length; i++) {
        xor = Number(string[i]) ^ Number(subKey[i]);
        bin_xor += String(xor);
    }
    return bin_xor;
}

const encrypt = function(text){
    cipherText = "";
    text = text%2 == 1 ? text+" " : text;
    let bin_plainText = string2Binary(text)
    let data = bin_plainText
    let xor_text = "";

    for( let i = 0; i<bin_plainText.length; i+=16){
        data = bin_plainText.substring(i,i+16)
        for(let j = 0; j < 64; j+=16){
            xor_text = xor(data,key.substring(j,j+16))

            if (j<32) {
                s_Boxes = substitution(xor_text)
            }
            else{
                s_Boxes = xor_text
            }
            data = s_Boxes
        }
        cipherText += data;
    }
    return cipherText
}

const decrypt = function(text){
    let cipher_Text = text;
    let plain_Text = "";
    let xor_text = "";
    let data = "";

    for( let i = 0; i<cipher_Text.length; i+=16){
        data = cipher_Text.substring(i,i+16)
        for(let j = 48; j >= 0; j-=16){
            xor_text = xor(data,key.substring(j,j+16))

            if (j == 48 || j == 0) {
                s_Boxes = xor_text
            }
            else{
                s_Boxes = r_Substitution(xor_text)
            }
            data = s_Boxes
        }
        plain_Text += data;
    }
    return binary2String(plain_Text)
}

export default {
    decrypt,
    encrypt,
    string2Binary,
    binary2String,
    substitution,
    r_Substitution,
    xor
}
