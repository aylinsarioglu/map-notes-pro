import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { detecType, setStorage } from "./helpers.js";

//! HTML'den gelenler
const form = document.querySelector("form");
const list = document.querySelector("ul");

//! Olay İzleyicileri
form.addEventListener("submit", handleSubmit);
list.addEventListener("click", handleClick);

//! Ortak Kullanım Alanı
var map;
var layerGroup = [];
var notest = JSON.parse(localStorage.getItem("notes")) || [];
var coords = [];

/*
 *Kullanıcının konumunu öğrenmek için getCurrentPosition methodunu kullandık ve bizden iki paramete istedi :
 *1.Kullanıcı konum iznini verdiğinde çalışacak fonksiyondur.
 *2.Kullanıcı konum iznini vermediğinde çalışacak fonksiyondur.
 */

navigator.geolocation.getCurrentPosition(loadMap, errorFunction);
function errorFunction() {
  ("hata");
}
//* Haritaya tıklanınca çalışır.
function onMapClick(e) {
  //* Haritaya tıklandığında form bileşenini display özelliğini flex yaptık.
  form.style.display = "flex";
  e;
  //* Haritada tıkladığımız yerin koordinatlarını coord dizisi içerisine aktardık.
  coords = [e.latlng.lat, e.latlng.lng];
  coords;
}
//* Kullanıcının konumuna göre haritayı ekrana aktarır.
function loadMap(e) {
  //* Haritanın Kurulumu
  map = L.map("map").setView([e.coords.latitude, e.coords.longitude], 10);
  L.control;
  //*2. Haritanın nasıl gözükeceğini belirler.
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  //* 3.Harita da ekrana basılacak imleçleri tutacağımız katman
  layerGroup = L.layerGroup().addTo(map);

  //* Local'den gelene notesları listeleme
  renderNotesList(notes);

  //* Haritada bir tıklanma olduğunda çalışacak fonksiyon
  map.on("click", onMapClick);
}

function renderMarker(item) {
  // L.marker ([50.505,30.57],{ icon:myIcon}).addTo(map);
  // Markerı oluşturur
  L.marker(item.coords, { icon: detecIcon(item.status) })
    .addTo(layerGroup) // imleçlerin olduğu katmana ekler.
    .bindPopup(`${item.desc}`); // üzerine tıklanınca açılacak popup ekleme
}

function handleSubmit(e) {
  e.preventDefault(); //* Sayfanın yenilenmesini engeller.
  e;
  const desc = e.target[0].value; //Formun içerisindeki text inputun değerini alma
  const date = e.target[1].value; //Formun içerisindeki date inputunun değerini alma
  const status = e.target[2].value; // Formun içerisindeki select yapısının değerini alma

  notest.push({
    id: uuidv4(),
    desc,
    date,
    status,
    coords,
  });

  //* Local storage güncelle
  setStorage(notes);
  //renderNoteList fonksiyonuna parametre olarak notes dizisini gönderdik.
  renderNoteList(notes);

  //* Form gönderildiğinde kapat
  form.style.display = "none";
}
//* Ekrana notları aktaracak fonksiyon
function renderNotesList(item) {
  //* Notlar (list) alanını temizle
  list.innerHTML = "";
  //* Markerları temizler
  layerGroup.clearLayers();
  //* Herbir not için li etiketi oluşturur ve içerisini günceller.
  item.forEach((item) => {
    const listElement = document.createElement("li"); //* bir li etiketi oluşturur.
    listElement.dataset.id = item.id; //* li etiketine data-id özelliği ekleme
    listElement;
    listElement.innerHTML = `
        <div>
              <p> ${item.desc} </p>
              <p><span>Tarih:</span> ${item.date}</p>
              <p><span>Durum:</span>${detecType(item.status)}</p>
            </div>
            <i class="bi bi-x" id="delete"></i>
            <i class="bi bi-airplane-fill" id="fly"></i>
        `;
    list.insertAdjacentElement("afterbegin", listElement);

    renderMarker(item);
  });
}
//* Notes alanında tıklanma olayını izler.
function handleClick(e) {
  //* Güncellenecek elemanın id'sini öğrenmek için parantElement yöntemini kullandık.
  const id = e.target.parentElement.dataser.id;
  console.log(id);
  if (e.target.id === "delete") {
    //* idsini bildiğimiz elemanı diziden filter yöntemi kullanarak kaldırdık
    notes = notes.filter((note) => note.id != id);
    console.log(notes);
    setStorage(notes); //* localStorage güncelle
    renderNoteList(notes); //* ekranı güncelle
  }

  if (e.target.id === "fly") {
    //* Tıkladığımız elemanın idsi ile dizi içerisindeki elemanlardan herhangi birinin idsi eşleşirse bul.
    const note = notes.find((note) => note.id == id);
    console.log(notes);
    map.flyTo(note.coords); //* Haritayı bulduğumuz elemana yönlendirmesi için flyTo methodunu kullandık.
  }
}
