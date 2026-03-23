// Veritabanı simülasyonu (Backend'e geçince burası API'den gelecek)
const state = {
    doctors: [
        { id: 1, name: "Dr. Ahmet Yılmaz", spec: "Kardiyoloji", city: "İstanbul", rating: 4.9 },
        { id: 2, name: "Dr. Ayşe Demir", spec: "Nöroloji", city: "Ankara", rating: 4.8 }
    ],
    appointments: JSON.parse(localStorage.getItem('my_appts')) || []
};

// Sayfa yüklendiğinde çalışacaklar
document.addEventListener('DOMContentLoaded', () => {
    renderDoctors(state.doctors);
    setupFilters();
});

// Verimli Render Fonksiyonu (DOM manipülasyonunu minimize eder)
function renderDoctors(list) {
    const grid = document.getElementById('doctorGrid');
    grid.innerHTML = list.map(doc => `
        <div class="card" onclick="openProfile(${doc.id})">
            <div style="font-weight:600; font-size:1.1rem">${doc.name}</div>
            <div style="color:#64748b">${doc.spec}</div>
            <div style="margin-top:10px; font-size:0.9rem">📍 ${doc.city}</div>
            <div style="margin-top:15px; display:flex; justify-content:space-between; align-items:center">
                <span style="color:#f59e0b">★ ${doc.rating}</span>
                <button class="btn-primary" style="padding:5px 10px; font-size:0.8rem">Randevu</button>
            </div>
        </div>
    `).join('');
}

// Güvenlik: Input temizleme (XSS koruması için temel adım)
function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Arama Mantığı (Hızlı filtreleme)
function handleSearch() {
    const city = document.getElementById('citySelect').value;
    const spec = document.getElementById('specSelect').value;
    
    const filtered = state.doctors.filter(d => 
        (city === "" || d.city === city) && 
        (spec === "" || d.spec === spec)
    );
    
    renderDoctors(filtered);
    document.getElementById('resultsTitle').textContent = filtered.length + " Doktor Bulundu";
}