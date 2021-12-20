// var assert = require('assert')
import assert from 'assert'
import spn from '../spn.js'


describe('Ara Fonksiyonlar',function(){
    it('<omer> kelimesinin ikili sistemde çıktısını vermeli', function() {
        let sonuc = spn.string2Binary("omer");
        assert.equal("01101111011011010110010101110010", sonuc);
    })
    it('İkili sistemdeki <omer> kelimesini string çıktısını vermeli', function() {
        let sonuc = spn.binary2String("01101111011011010110010101110010");
        assert.equal("omer", sonuc);
    })
    it('<0110> ile <0011> ikili ifadelerinin xor işlemine tabi tutulması', function() {
        let sonuc = spn.xor("0110","0011");
        assert.equal("0101", sonuc);
    })
    it('<0123456789abcdef> ifadesinin karıştırlmış halini verir', function() {
        let sonuc = spn.substitution("0123456789abcdef");
        assert.equal("28c590e4b1f63a7d", sonuc);
    })
    it('Karıştırılmış olan <0123456789abcdef> ifadesinin kendisini verir', function() {
        let sonuc = spn.r_Substitution("28c590e4b1f63a7d");
        assert.equal("0123456789abcdef", sonuc);
    })
})

describe('Ana Fonksiyonlar',function () {
    it('<emir> ifadesinin şifrelenmiş halini döner', function() {
        let sonuc = spn.encrypt("emir");
        assert.equal("00101110011011111110111001010001", sonuc);
    })
    it('Şifrelenmiş olan <emir> ifadesinin orijinalini döner.', function() {
        let sonuc = spn.decrypt("00101110011011111110111001010001");
        assert.equal("emir", sonuc);
    })
})
