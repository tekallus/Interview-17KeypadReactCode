import React, { useState } from "react";

// Keyboard bileşeni, kullanıcının bir kombinasyon girmesini sağlayan tuş takımını oluşturmak icin
function Keyboard({ combination, onCombinationEntered }) {
  // enteredCombination, kullanıcının girdiği rakamları tutan bir state'i temsil eder.
  const [enteredCombination, setEnteredCombination] = useState([]);

  // handleKeypress, kullanıcının bir rakam tuşuna bastığında çağrılan fonksiyondur.
  const handleKeypress = (digit) => {
    // Eğer girilen rakamların sayısı, belirlenen kombinasyonun uzunluğunu geçmediyse,
    // yeni rakamı enteredCombination state'ine ekler.
    if (enteredCombination.length < combination.length) {
      setEnteredCombination((prev) => [...prev, digit]);
    }
  };

  // handleBackspace, kullanıcının geri tuşuna bastığında çağrılan fonksiyondur.
  const handleBackspace = () => {
    // Eğer girilen rakamların sayısı 0'dan büyükse, son girilen rakamı enteredCombination state'inden kaldırır.
    if (enteredCombination.length > 0) {
      setEnteredCombination((prev) => prev.slice(0, -1));
    }
  };

  // handleSubmit, kullanıcının "Submit" tuşuna bastığında çağrılan fonksiyondur.
  const handleSubmit = () => {
    // Eğer girilen kombinasyon, belirlenen kombinasyona eşitse, onCombinationEntered fonksiyonunu çağırır.
    if (enteredCombination.join("") === combination.join("")) {
      onCombinationEntered();
    }
  };

  // Klavye bileşenini oluşturan JSX'i döndürür.
  return (
    <div className="keyboard flex flex-col items-center">
      {/* Girilen kombinasyonu gösteren bir input alanı */}
      <input
        type="text"
        value={enteredCombination.join("")}
        readOnly
        className="bg-gray-100 text-gray-900 p-2 mb-2 text-center w-24 rounded"
      />
      {/* Rakam tuşlarını ve geri tuşunu içeren bir tuş takımı */}
      <div className="keys grid grid-cols-4 gap-2 mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
          <button
            key={digit}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleKeypress(digit)}
          >
            {digit === 0 ? "0" : digit}
          </button>
        ))}
        {/* Geri tuşu */}
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleBackspace}
        >
          Backspace
        </button>
      </div>
      {/* Submit tuşu */}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
} // Bu kapatıcı parantezi ekledim

// Uygulamanın ana bileşeni.
function App() {
  // Başarılı giriş ekranını gösteren bir bileşen
  const unlockedScreen = () => (
    <div style={{ textAlign: "center" }}>Giriş başarılı!</div>
  );

  // Uygulamanın JSX'ini döndürür.
  return (
    <div className="app">
      {/* Kilit kombinasyonunu ve başarılı giriş ekranını belirleyerek CombinationLock bileşenini çağırır. */}
      <CombinationLock combination={[1, 2, 3, 4]} NextScreen={unlockedScreen} />
    </div>
  );
}

// Kombinasyon kilidi bileşeni
const CombinationLock = ({ combination, NextScreen }) => {
  // Klavyenin gösterilip gösterilmeyeceğini kontrol eden bir state
  const [showKeyboard, setShowKeyboard] = useState(true);
  // Doğru kombinasyonun girilip girilmediğini kontrol eden bir state
  const [enteredCorrectCombination, setEnteredCorrectCombination] = useState(false);

  // Kullanıcı doğru kombinasyonu girdiğinde çağrılan fonksiyon
  const handleCombinationEntered = () => {
    // Doğru kombinasyon girildiğini işaretler
    setEnteredCorrectCombination(true);
    // Klavyeyi gizler
    setShowKeyboard(false);
  };

  // Kombinasyon kilidi bileşeninin JSX'ini döndürür.
  return (
    <div>
      {/* Klavyeyi gösterme koşulu sağlanıyorsa, Keyboard bileşenini çağırır */}
      {showKeyboard && (
        <Keyboard combination={combination} onCombinationEntered={handleCombinationEntered} />
      )}
      {/* Doğru kombinasyon girildiyse, NextScreen bileşenini çağırır */}
      {enteredCorrectCombination && <NextScreen />}
    </div>
  );
};

// App bileşenini dışa aktarır.
export default App;
