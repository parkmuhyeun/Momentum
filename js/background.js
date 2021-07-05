const images = [                                                    //background images
    "0.jpg",
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg"
];

const chosenImage = images[Math.floor(Math.random() * images.length)];          //랜덤이미지저장

const bgImage = document.createElement("img");                  //Element 생성(img)
bgImage.src = `img/${chosenImage}`;
bgImage.classList.add("bgImage");

document.body.appendChild(bgImage);                             //body에 bgImage 추가