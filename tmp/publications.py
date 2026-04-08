import csv
import os

# 保存するファイル名
CSV_FILE = "research_data.csv"

# 項目の定義（列の順番を固定します）
FIELDNAMES = [
    "言語種別", "発行・発表の年月", "形態種別", "査読", "標題", 
    "執筆形態", "掲載誌名", "掲載区分", "出版社・発行元", "著者・共著者"
]

def get_multi_line_input():
    print("-" * 30)
    print("データを貼り付けてください。")
    print("（貼り付けた後、空行でEnterを押すか 'EOF' と入力すると確定します）")
    print("-" * 30)
    
    lines = []
    while True:
        try:
            line = input()
            if line.strip() == "EOF" or (not line and lines):
                break
            if not line and not lines: # 最初の空改行は無視
                continue
            lines.append(line)
        except EOFError:
            break
    return "\n".join(lines)

def save_to_csv(raw_text):
    # テキストを解析して辞書に変換
    data_dict = {}
    lines = raw_text.strip().split('\n')
    
    for line in lines:
        if '\t' in line:
            key, value = line.split('\t', 1)
        elif ' ' in line:
            # タブがなくスペース区切りの場合を考慮
            key, value = line.split(maxsplit=1)
        else:
            continue
        data_dict[key.strip()] = value.strip()

    if not data_dict:
        print("有効なデータが入力されませんでした。")
        return

    # ファイルが存在するか確認（ヘッダー書き込みの判定用）
    file_exists = os.path.isfile(CSV_FILE)

    # 追記モード ('a') でオープン
    with open(CSV_FILE, mode='a', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        
        # 新規ファイルの場合のみヘッダーを書き込む
        if not file_exists:
            writer.writeheader()
        
        # データの書き込み
        writer.writerow(data_dict)
        print(f"\n✅ CSVにデータを追加しました（現在のファイルサイズ: {os.path.getsize(CSV_FILE)} bytes）")

def main():
    while True:
        text = get_multi_line_input()
        if not text:
            break
        save_to_csv(text)
        
        cont = input("\n続けて次のデータを入力しますか？ (y/n): ").lower()
        if cont != 'y':
            break

if __name__ == "__main__":
    main()