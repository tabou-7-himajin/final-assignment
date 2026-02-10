// 大アルカナ22枚のリスト
  const tarotCards = [
    "0 愚者", "I 魔術師", "II 女教皇", "III 女帝", "IV 皇帝", 
    "V 教皇", "VI 恋人", "VII 戦車", "VIII 力", "IX 隠者", 
    "X 運命の輪", "XI 正義", "XII 吊るされた男", "XIII 死神",
    "XIV 節制", "XV 悪魔", "XVI 塔", "XVII 星", "XVIII 月", 
    "XIX 太陽"," XX 審判", "XXI 世界"
  ];

  const disp = document.getElementById('disp');
  const sName = document.getElementById('sName');
  const seizaSelect = document.getElementById('seiza');
  const checkButton = document.getElementById('checkButton');

  function fortuneTelling() {
    // 1. 今日の日付数値を取得 (年+月+日)
    const now = new Date();
    const dateValue = now.getFullYear() + (now.getMonth() + 1) + now.getDate();

    // 2. 選択された星座の数値を取得
    const seizaValue = parseInt(seizaSelect.value);
    const seizaName = seizaSelect.options[seizaSelect.selectedIndex].text;

    // 3. 合計値を計算
    const totalValue = dateValue + seizaValue;

    // 4. カードの算出（22で割った余り：0〜21）
    const cardIndex = totalValue % 22;

    /*
    // 5. 表裏の算出（2で割った余り：0か1）
    // 合計値が偶数なら正位置(0)、奇数なら逆位置(1)になります
    const isUpright = ((totalValue % 3) % 2) === 0;
    const direction = isUpright ? "【正位置】" : "【逆位置】";
    */

    // 1. サイン関数で複雑な小数を作る
    const seed = Math.sin(dateValue + seizaValue * 13) * 10000;
    
    // 2. 数値を絶対値の文字列にし、小数点以下を抽出
    const decimalPart = String(Math.abs(seed)).split('.')[1];
    
    // 3. 小数第二位（インデックス 1）を取り出す
    // 文字列として存在しない場合に備え、デフォルト値 '0' を設定
    const secondDigit = decimalPart ? (decimalPart[1] || '0') : '0';
    
    // 4. その数字が偶数か奇数かで正逆を決定
    const isUpright = parseInt(secondDigit) % 2 === 0;

    // --- 以下、表示処理 ---
    const direction = isUpright ? "【正位置】" : "【逆位置】";


    // 6. 結果を表示
    const cardName = tarotCards[cardIndex];
    sName.innerText = `${seizaName}`
    disp.innerText = `本日のカード：${cardName}${direction}`;
    

    // デバッグ用（どの数字が使われたか確認したい場合）
    console.log(`計算値: ${seed}, 小数第二位: ${secondDigit}`);
  }

  checkButton.addEventListener('click', fortuneTelling);
