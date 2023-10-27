//noPage
import esp from 'esoftplay/esp';

var crypto = require("crypto")
var Buffer = require('buffer').Buffer
class Ecrypt {
  constructor() {
    this.salt = esp.config("salt")
    this.method = 'AES-256-CBC'
    this.use_sha = false
    this.getIV = this.getIV.bind(this)
    this.encode = this.encode.bind(this)
  }

  encode(text) {
    // var crypto = new Crypto()
    var string = this.sha5(new Date().toISOString().substr(0, 19) + text, true, this.use_sha);
    var iv = this.getIV(16)
    var encryptor = crypto.createCipheriv(this.method, this.salt, iv);
    var encrypted = new Buffer(iv).toString('base64') + encryptor.update(string, 'utf8', 'base64') + encryptor.final('base64');
    var output = new Buffer(encrypted).toString('base64');
    return output;
  }

  decode(text) {
    try {
      var text = new Buffer(text, 'base64').toString();
      var iv = new Buffer(text.substr(0, 24), 'base64').toString();
      var decryptor = crypto.createDecipheriv(this.method, this.salt, iv);
      var decrypted = decryptor.update(text.substr(24), 'base64', 'utf8') + decryptor.final('utf8');
      var text_raw = this.sha5(decrypted, false, this.use_sha).toString();
      var output = text_raw.substr(19);
    } catch (e) {
      output = ""
    }
    return output;
  }

  sha5(string, toggle, use_sha = true) {
    var o = "";
    if (use_sha) {
      var a = 0;
      var j = 0;
      var x = 0;
      if (toggle) {
        for (var i = 0; i < string.length; i++) {
          a = string.charAt(i)
          j = this.rand(97, 122);
          if (this.rand(0, 1) > 0) {
            j -= 32
          }
          x = this.ord(a) + j
          if (x > 255) {
            x -= 255
          }
          o += String.fromCharCode(j) + String.fromCharCode(x)
        }
      } else {
        j = 0
        for (var i = 0; i < string.length; i++) {
          a = string.charAt(i)
          if (i % 2) {
            x = this.ord(a) - j
            if (x < 0) {
              x += 255
            }
            o += String.fromCharCode(x)
          } else {
            j = this.ord(a)
          }
        }
      }
    } else {
      o = string
    }
    return o
  }
  getIV(length) {
    var o = "";
    for (var i = 0; i < length; i++) {
      var j = this.rand(97, 122);
      if (this.rand(0, 1) > 0) {
        j -= 32
      }
      o += String.fromCharCode(j)
    }
    return o
  }

  rand(min, max) {
    max += 1;
    var out = Math.random() * (max - min) + min;
    return Math.floor(out)
  }

  ord(string) {
    var str = string + ''
    var code = str.charCodeAt(0)
    if (code >= 0xD800 && code <= 0xDBFF) {
      var hi = code
      if (str.length === 1) {
        return code
      }
      var low = str.charCodeAt(1)
      return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000
    }
    if (code >= 0xDC00 && code <= 0xDFFF) {
      return code
    }
    return code
  }
}
export default Ecrypt