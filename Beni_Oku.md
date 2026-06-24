# Aşk Web Sitesi Kurulum ve Özelleştirme Rehberi ❤️

Kız arkadaşınız için hazırladığımız bu özel web sitesi tamamen hazır durumdadır! Sitenin sorunsuz çalışması ve fotoğraflarınızın görünmesi için yapmanız gereken birkaç küçük adım bulunmaktadır.

---

## 1. Fotoğrafları Yerleştirme (Çok Önemli!) 📸

Sohbet penceresinde gönderdiğiniz **11 adet fotoğrafı** bilgisayarınıza indirin ve sitenizin kurulu olduğu klasörün içinde **`img`** isimli yeni bir klasör oluşturup şu şekilde isimlendirerek kaydedin:

- İlk gönderdiğiniz cafe fotoğrafı ➔ `resim1.jpg`
- İkinci gönderdiğiniz kanyon cam teras fotoğrafı ➔ `resim2.jpg`
- Üçüncü gönderdiğiniz gülümseyen selfie ➔ `resim3.jpg`
- Dördüncü gönderdiğiniz şık akşam yemeği fotoğrafı ➔ `resim4.jpg`
- Beşinci gönderdiğiniz gece öpücük fotoğrafı ➔ `resim5.jpg`
- Altıncı gönderdiğiniz Anıtkabir fotoğrafı ➔ `resim6.jpg`
- Yedinci gönderdiğiniz omza yaslanma fotoğrafı ➔ `resim7.jpg`
- Sekizinci gönderdiğiniz balonlu akşam yemeği fotoğrafı ➔ `resim8.jpg`
- Dokuzuncu gönderdiğiniz güneşli kafe selfie'si ➔ `resim9.jpg`
- Onuncu gönderdiğiniz çeneyi eline dayamış kafe selfie'si ➔ `resim10.jpg`
- On birinci gönderdiğiniz araba selfie'si ➔ `resim11.jpg`

> [!TIP]
> Eğer klasör yapısı hazır değilse, `img` isimli bir klasör oluşturup fotoğrafları içine atmanız yeterlidir. Fotoğrafların uzantısının `.jpg` (küçük harflerle) olduğundan emin olun.

---

## 2. Özelleştirmeler (Şifre, Tarih, İsimler) ⚙️

Tüm ayarları **`script.js`** dosyasının en üstündeki **`CONFIG`** alanından kolayca değiştirebilirsiniz:

- **Giriş Şifresi**: `PASSWORD` kısmından değiştirebilirsiniz. Varsayılan olarak `seniseviyorum` olarak ayarlanmıştır.
- **İlişki Başlangıç Tarihi**: `START_DATE` kısmından yıl, ay (şubat için `1`, mart için `2` vb.) ve gün olarak girin. Aşk sayacı bu tarihten itibaren geçen süreyi saniyesi saniyesine hesaplar.
- **Aşk Notları**: `LOVE_NOTES` dizisi içerisindeki cümleleri istediğiniz gibi düzenleyebilir veya yeni cümleler ekleyebilirsiniz. Kavanoza tıklandıkça bu notlar rastgele çıkacaktır.
- **Gizli Mektup**: `SECRET_LETTER_TEXT` kısmına, slider %100 olduğunda daktilo efektiyle yazılmasını istediğiniz o özel mektubu yazın.

---

## 3. Arka Plan Müziği Ekleme 🎵

Siteye giriş yapıldığında çalacak şarkıyı özelleştirebilirsiniz:
- İstediğiniz romantik bir şarkıyı (MP3 formatında) bulun.
- Adını **`muzik.mp3`** yapın ve `index.html` dosyasının yanına (ana klasöre) kaydedin.
- Eğer bu dosyayı eklemezseniz, site otomatik olarak internet üzerinden harika bir enstrümantal piyano müziği çalacaktır (yedek sistem aktiftir).

---

## 4. Siteyi Nasıl Çalıştıracaksınız? 🚀

- Sitenin klasörünü açın.
- **`index.html`** dosyasına çift tıklayın. Web tarayıcınızda (Chrome, Edge, Safari vb.) siteniz hemen açılacaktır!
- Arkadaşınıza göndermek isterseniz bu klasörü zipleyip ona gönderebilir veya **GitHub Pages** (ücretsiz) ya da **Netlify** gibi platformlarda 2 dakikada yayına alarak ona link atabilirsiniz.
