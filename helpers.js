//* Tipi analiz edip ona göre fonksiyonun çağrıldığı yere 
//* Tipe denk gelen açıklamayı gönderir. 

export const detecType = (type) => {
    switch (type) {
       case "park": 
        console.log (type);
        return "Park Yeri";
       case "home":
        console.log(type);
        return "Ev"; 
       case "job":
        console.log(type);
        return "İş";
       case "goto":
        console.log(type);
        return "Ziyaret";
    }
   
};
//* Local storage ı güncelleyecek fonksiyon
export const setStorage = (data) => {
    //* Veriyi locale göndermek için stringe çevirme 
    const strData = JSON.stringify(data);
    console.log(strData);
    //* localStoraga veriyi gönderdik.
    localStorage.setItem("notes",strData);
};
    
    var carIcon = L.icon ({
        iconUrl: "car.png",
        İconSize: [50,60],
    });
    var homeIcon = L.icon ({
        İconUrl: "home-marker.png",
        İconSize: [50,60],
    });
    var jobIcon = L.icon ({
        İconUrl: "job.png",
        İconSize: [50,60],
    });
    var visitIcon = L.icon ({
        İconUrl: "visit.png",
        İconSize: [50,60],
    });

    export const detecIcon = (type) => {
        switch (type) {
            case "park":
                return carIcon;
            case "home":  
                return homeIcon;
            case "job":  
                return jobIcon;
            case "goto":  
                return visitIcon;      
        }
    };