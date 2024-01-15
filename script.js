const quizData = [
    {
        question: "Dünyanın en eski şehirlerinden biri aşağıdakilerden hangisidir?",
        imgLink: 'https://cdn.listelist.com/wp-content/uploads/2023/05/catalhoyuk.jpg',
        answers: [
            { text: "Şam", isCorrect: false },
            { text: "Viyana", isCorrect: false },
            { text: "Babil", isCorrect: false },
            { text: "Bağdat", isCorrect: true }
        ]
    },
    {
        question: "Gülü ile meşhur olan ilimiz hangisidir?",
        imgLink: 'https://nomatto.com/asset/resized/isparta/gul_bahcesi_l.jpg',
        answers: [
            { text: "Isparta", isCorrect: true },
            { text: "Aydın", isCorrect: false },
            { text: "Antalya", isCorrect: false },
            { text: "Burdur", isCorrect: false }
        ]
    },
    {
        question: "İçerisinde yüksek oranda demir minerali bulunduran sebze hangisidir?",
        imgLink: 'https://images.migrosone.com/tazedirekt/product/28140000/28140000-31316d-680x454.jpg',
        answers: [
            { text: "Pırasa", isCorrect: false },
            { text: "Havuç", isCorrect: false },
            { text: "Ispanak", isCorrect: true },
            { text: "Roka", isCorrect: false }
        ]
    },
    {
        question: "Hangisi bir web uygulamalarının temel unsurlarından değildir?",
        imgLink: 'https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D',
        answers: [
            { text: "Javascript", isCorrect: false },
            { text: "CSS", isCorrect: false },
            { text: "HTML", isCorrect: false },
            { text: "Java", isCorrect: true }
        ]
    },
    {
        question: "Aşağıdakilerden hangisi Türkiye’nin komşusu bir ülke değildir?",
        imgLink: 'https://isbh.tmgrup.com.tr/sbh/2020/11/19/turkiye-haritasi-1605764713268.png',
        answers: [
            { text: "İran", isCorrect: false },
            { text: "Yunanistan", isCorrect: false },
            { text: "Gürcistan", isCorrect: false },
            { text: "Ukrayna", isCorrect: true }
        ]
    },
    {
        question: "En büyük uydusu olan gezegen aşağıdakilerden hangisidir?",
        imgLink: 'https://dergio.s3.eu-central-1.amazonaws.com/site-media/2022/06/05135318/6f01c129-b021-4753-a80c-2b5806475169.jpg',
        answers: [
            { text: "Satürn", isCorrect: false },
            { text: "Jüpiter", isCorrect: true },
            { text: "Neptün", isCorrect: false },
            { text: "Dünya", isCorrect: false }
        ]
    },
    {
        question: "Aşağıdaki hayvanlardan hangisi çöl ortamına daha dayanıklıdır?",
        imgLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg/800px-07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg',
        answers: [
            { text: "Aslan", isCorrect: false },
            { text: "Ayı", isCorrect: false },
            { text: "Deve", isCorrect: true },
            { text: "Köpek", isCorrect: false }
        ]
    },
];

let activeQuestionIndex = 0;
let correctAnswer = 0;
let score = 0;

//Soruları html e yazmak yerine buradan yüklemek için bir fonksiyon oluşturduk. 
function loadQuestion() {
    const currentQuestion = quizData[activeQuestionIndex]; //gösterilecek olan soruyu seçmek için quiz datadan soru sayısını indexten alarak yazmasını sağladık.
    const questionElement = document.getElementById('question'); // soruyu html de id si question olan yere yaz.
    const answerListElement = document.getElementById('answer-list'); // cevabı answer list olan yere yaz.
    const imageElement = document.getElementById('question-image'); // resmi id si question list olan yere yaz.
    const questionNumberElement = document.getElementById('question-number'); // numarayı question number olan yere yaz.
    const submitBtn = document.getElementById("submit-btn");

    // soru numarası vermek için şu anki soruya 1 ekliyoruz. quiz uzunluğu bitene kadar devam ediyor.
    questionNumberElement.textContent = activeQuestionIndex + 1 + '/' + quizData.length;

    // Clear previous question and answers when it is loaded
    questionElement.textContent = '';
    answerListElement.innerHTML = '';

    // fonksiyona yazdığım questionElementi'n alacağı yazıyı nereden seçtiğimizi gösterdik.
    questionElement.textContent = currentQuestion.question;

    // fonksiyona yazdığım imageElementi'n alacağı verileri çağırdı.
    imageElement.setAttribute('src', currentQuestion.imgLink)

    // Cevapları ayarlama
    currentQuestion.answers.forEach(answer => {  // her cevap için liste elementi oluşturduk.
        const li = document.createElement('li'); 
        li.textContent = answer.text;  // li elementinin içine cevapların yazılmasını söyledik.
        li.onclick = () => checkAnswer(answer.isCorrect); // tıklayınca sorunun doğruluğunu kontrol ettik.
        answerListElement.appendChild(li);  // answerListElemente li yi atayıp,listenin nereye yazılacağını belirledik.
    });
}

// quizi başlatmak için fonksiyon tanımladık.
loadQuestion();

// ilerletmek için id'si next-question olan elemanı seçtik, ona bir tıklama atadık.
document.getElementById('next-question').addEventListener('click', () => {
    // şu anki soru sırası quizdatanın toplam uzunluğundan kısa ise her zaman ilerlemeye devam et.
    if (activeQuestionIndex < quizData.length - 1) {
       
        activeQuestionIndex++
        //şu anki soru sırası 
        if(activeQuestionIndex == quizData.length - 1) {
            document.getElementById('next-question').style.visibility = 'visible';
        }
        loadQuestion();
    } else {
        activeQuestionIndex == 0;
        showNotification('Test tamamlandı zaten!', 3000, 'purple');
    }
});

loadQuestion();

// geri gelme butonunu tanımlayıp ona da click görevi verdik.
document.getElementById('before-question').addEventListener('click', () => {
    if (activeQuestionIndex >0 ) {
        activeQuestionIndex-- //her tıklamada 1 soru geri gelmesini söyledik.
        loadQuestion();
    }
});

function startQuiz() {
    alert("Quiz başlıyor!");
    // Burada quiz'e geçiş veya diğer işlevselliği ekleyebilirsiniz.
  }

// başla butonuna tıklayıp quizi başlatıyoruz.
document.getElementById('start').addEventListener('click', () => {
        showNotification('Test başladı!', 3000, 'green');
        loadQuestion();
        document.getElementById('next-question').style.visibility = 'visible';
});

// reset butonunu 
document.getElementById('reset').addEventListener('click', () => {
    activeQuestionIndex = 0;
    showNotification('Test  baştan başladı!', 3000, 'purple');
    loadQuestion();
    document.getElementById('next-question').style.visibility = 'visible';
});

// bildirim göstermek için oluşturulan fonksiyon.
function showNotification(message, duration = 3000, color = 'green') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    notification.style.backgroundColor = color;

    let quizContainer = document.querySelector('#quiz-container');
    quizContainer.style.border = '2px solid ' + color;

    // Hide the notification after the duration
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// cevaplara göre hangi bildirim gösterilecek onu ayarlıyoruz.
function checkAnswer(isCorrect) {
    if (isCorrect) {    //doğru ise uygulanacaklar
        showNotification('Doğru Cevap!', 3000, 'green');
        correctAnswer++;
    } else {            //yanlış ise uygulanacaklar
        showNotification('Yanlış Cevap. Olmadı!', 3000, 'red');
    }
    if (activeQuestionIndex < quizData.length) { 
        activeQuestionIndex++
        loadQuestion();
    } else {
        let mesaj = 'Test tamamlandı' + correctAnswer + 'doğrun var!';
        showNotification( mesaj, 3000, 'purple');
    }

};
function bitirmeMesajiGoster(){
    let mesaj = 'Test tamamlandı' + correctAnswer + 'doğrun var!';
    showNotification( mesaj, 3000, 'purple');
}
document.querySelector('#submit-btn').addEventListener('click', bitirmeMesajiGoster());





