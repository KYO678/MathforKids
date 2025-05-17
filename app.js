const { useState, useEffect } = React;
const { motion } = framerMotion;

const AdditionAnimation = () => {
  const [firstNumber, setFirstNumber] = useState(10);
  const [secondNumber, setSecondNumber] = useState(12);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  
  // 数字の入力を1〜30に制限する
  const handleNumberChange = (setter) => (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 30) {
      setter(value);
    } else if (e.target.value === '') {
      setter(0);
    }
  };

  // ブロックの準備
  useEffect(() => {
    // 計算後の状態を維持する場合はブロックを更新しない
    if (hasCalculated && !isAnimating) return;
    
    setShowResult(false);
    
    const newBlocks = [];
    // 最初の数のブロック
    for (let i = 0; i < firstNumber; i++) {
      newBlocks.push({
        id: `first-${i}`,
        group: 'first',
        color: '#FF9999', // 赤っぽい色
        initialX: (i % 10) * 30,
        initialY: Math.floor(i / 10) * 30,
        x: (i % 10) * 30,
        y: Math.floor(i / 10) * 30 + 50,
      });
    }
    
    // 2番目の数のブロック
    for (let i = 0; i < secondNumber; i++) {
      newBlocks.push({
        id: `second-${i}`,
        group: 'second',
        color: '#99CCFF', // 青っぽい色
        initialX: (i % 10) * 30,
        initialY: Math.floor(i / 10) * 30,
        x: (i % 10) * 30,
        y: Math.floor(i / 10) * 30 + 150,
      });
    }
    
    setBlocks(newBlocks);
  }, [firstNumber, secondNumber, hasCalculated, isAnimating]);

  // アニメーションの実行
  const runAnimation = () => {
    setIsAnimating(true);
    setShowResult(false);
    setAnimationCompleted(false);
    
    // タイマーでアニメーション完了を設定
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationCompleted(true);
      setHasCalculated(true);
    }, 2000);
  };

  // 答えを表示する
  const showAnswer = () => {
    setShowResult(true);
  };

  // 全体のリセット
  const resetAnimation = () => {
    setShowResult(false);
    setIsAnimating(false);
    setHasCalculated(false);
    setAnimationCompleted(false);
  };

  // 合計の計算
  const sum = firstNumber + secondNumber;

  // 数を漢数字に変換する関数
  const toJapaneseNumber = (num) => {
    if (num <= 10) {
      const kanji = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      return kanji[num];
    } else if (num < 20) {
      return `十${num - 10 === 0 ? '' : toJapaneseNumber(num - 10)}`;
    } else if (num < 30) {
      return `二十${num - 20 === 0 ? '' : toJapaneseNumber(num - 20)}`;
    } else {
      return `三十${num - 30 === 0 ? '' : toJapaneseNumber(num - 30)}`;
    }
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-lg max-w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">楽しい足し算アニメーション</h1>
        <p className="text-lg text-gray-700">ブロックを使って足し算をしよう！</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <div className="flex items-center">
          <input
            type="number"
            value={firstNumber}
            onChange={handleNumberChange(setFirstNumber)}
            min="1"
            max="30"
            className="w-16 h-16 text-2xl text-center border-2 border-blue-400 rounded-lg"
            disabled={isAnimating}
          />
          <span className="text-4xl mx-4">+</span>
          <input
            type="number"
            value={secondNumber}
            onChange={handleNumberChange(setSecondNumber)}
            min="1"
            max="30"
            className="w-16 h-16 text-2xl text-center border-2 border-blue-400 rounded-lg"
            disabled={isAnimating}
          />
          <span className="text-4xl mx-4">=</span>
          <div className="w-16 h-16 flex items-center justify-center text-2xl font-bold bg-yellow-100 border-2 border-yellow-400 rounded-lg">
            {showResult ? sum : '?'}
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="mb-1 font-semibold text-blue-800">
          {!isAnimating && !animationCompleted && !showResult && '計算してみよう！'}
          {isAnimating && 'ブロックが動いているよ...'}
          {animationCompleted && !showResult && 'いくつになったかな？「答えを見る」ボタンをおしてね！'}
          {showResult && `${firstNumber} + ${secondNumber} = ${sum}`}
        </div>
        {showResult && (
          <div className="text-2xl font-bold text-purple-600 mt-2">
            {`${toJapaneseNumber(firstNumber)} + ${toJapaneseNumber(secondNumber)} = ${toJapaneseNumber(sum)}`}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {!animationCompleted && (
          <button
            onClick={runAnimation}
            disabled={isAnimating}
            className="px-6 py-3 bg-green-500 text-white rounded-full text-lg font-bold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-200"
          >
            計算スタート！
          </button>
        )}
        
        {animationCompleted && !showResult && (
          <button
            onClick={showAnswer}
            className="px-6 py-3 bg-yellow-500 text-white rounded-full text-lg font-bold hover:bg-yellow-600 transition-colors duration-200"
          >
            答えを見る
          </button>
        )}
        
        <button
          onClick={resetAnimation}
          disabled={isAnimating}
          className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-bold hover:bg-purple-600 disabled:bg-gray-400 transition-colors duration-200"
        >
          リセット
        </button>
        
        {hasCalculated && showResult && (
          <button
            onClick={() => {
              setFirstNumber(0);
              setSecondNumber(0);
              setTimeout(() => {
                setHasCalculated(false);
                setAnimationCompleted(false);
                setShowResult(false);
                setFirstNumber(10);
                setSecondNumber(12);
              }, 100);
            }}
            disabled={isAnimating}
            className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-bold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-200"
          >
            新しい問題
          </button>
        )}
      </div>

      <div className="relative w-full h-64 bg-white rounded-lg border-2 border-gray-300 overflow-hidden">
        {/* 最初の数の表示エリア */}
        <div className="absolute top-2 left-2 bg-red-100 px-3 py-1 rounded-full text-red-800 font-bold">
          {firstNumber}
        </div>
        
        {/* 2番目の数の表示エリア */}
        <div className="absolute top-2 right-2 bg-blue-100 px-3 py-1 rounded-full text-blue-800 font-bold">
          {secondNumber}
        </div>
        
        {/* アニメーションエリア */}
        <div className="relative w-full h-full">
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              initial={{ x: block.x, y: block.y }}
              animate={{
                x: (isAnimating || hasCalculated) 
                  ? 150 + (blocks.indexOf(block) % 10) * 30
                  : block.x,
                y: (isAnimating || hasCalculated) 
                  ? 100 + Math.floor(blocks.indexOf(block) / 10) * 30
                  : block.y,
                scale: isAnimating ? [1, 1.1, 1] : 1,
                opacity: 1
              }}
              transition={{ duration: 1, delay: block.group === 'first' ? 0 : 0.5 }}
              style={{
                position: 'absolute',
                width: '25px',
                height: '25px',
                backgroundColor: block.color,
                borderRadius: '4px',
                border: '1px solid rgba(0,0,0,0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: isAnimating ? 10 : 1
              }}
            >
              {/* 四角の中の数字は表示しない */}
            </motion.div>
          ))}
          
          {/* 結果の表示 */}
          {showResult && (
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <div className="inline-block bg-yellow-200 px-6 py-2 rounded-full text-xl font-bold text-yellow-800 shadow-md">
                合計: {sum}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center mt-6 text-gray-600">
        <p>数字を変えて、いろいろな足し算をやってみよう！</p>
      </div>
    </div>
  );
};

// アプリケーションのレンダリング
ReactDOM.render(<AdditionAnimation />, document.getElementById('root'));