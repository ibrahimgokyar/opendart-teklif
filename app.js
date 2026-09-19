
const teklifFormu = document.getElementById("teklifFormu");
const gonderButonu = document.getElementById("gonderButonu");
const sonucMesaji = document.getElementById("sonucMesaji");

/*
    Önce n8n Test URL kullanılacak.
    Sistem çalıştıktan sonra Production URL ile değiştirilecek.
*/
const webhookUrl =
    "https://techcareer-n8n.app.n8n.cloud/webhook/web-site-teklif-techcareer";

teklifFormu.addEventListener("submit", async function (event) {
    event.preventDefault();

    sonucMesaji.className = "sonuc-mesaji";
    sonucMesaji.textContent = "";

    gonderButonu.disabled = true;
    gonderButonu.textContent = "Gönderiliyor...";

    const teklifBilgileri = {
        ad: document.getElementById("ad").value.trim(),
        soyad: document.getElementById("soyad").value.trim(),
        email: document.getElementById("email").value.trim(),
        websiteAdi:
            document.getElementById("websiteAdi").value.trim(),
        websiteTuru:
            document.getElementById("websiteTuru").value,
        aciklama:
            document.getElementById("aciklama").value.trim(),
        kvkkOnay:
            document.getElementById("kvkkOnay").checked,
        kaynak: "teklif.opendartakademi.com",
        talepTarihi: new Date().toISOString()
    };

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teklifBilgileri)
        });

        if (!response.ok) {
            throw new Error(
                `İstek başarısız. HTTP kodu: ${response.status}`
            );
        }

        sonucMesaji.className = "sonuc-mesaji basarili";
        sonucMesaji.textContent =
            "Teklif talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.";

        teklifFormu.reset();
    } catch (hata) {
        console.error("Webhook hatası:", hata);

        sonucMesaji.className = "sonuc-mesaji hatali";
        sonucMesaji.textContent =
            "Talebiniz gönderilemedi. Lütfen daha sonra yeniden deneyiniz.";
    } finally {
        gonderButonu.disabled = false;
        gonderButonu.textContent = "Teklif Talebi Gönder";
    }
});
  