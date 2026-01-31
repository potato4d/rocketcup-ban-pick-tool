function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4">
  <div className="flex flex-col items-start justify-start gap-4">
    <h2 className="w-full text-center text-2xl font-bold">Rocket CUP JUDGE Tool</h2>
    <h3 className="font-bold">チーム情報</h3>
    <ul className="flex flex-col items-start justify-start gap-4">
      <li className="flex gap-4">
        <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="チームAの名前を入力" />
      </li>
      <li className="flex gap-4">
        <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="チームBの名前を入力" />
      </li>
    </ul>

    <h3 className="mt-4 font-bold">{"チームA"}の状況</h3>
    <div className="flex flex-col items-start justify-start gap-4">
      <ul className="flex justify-start items-start flex-col gap-2">
        <li className="flex gap-4">
          <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div className="flex">
            <button type="button" className="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div className="bg-gray-300" style={{ width: "1px", height: "100%" }}></div>
            <button type="button" className="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li className="flex gap-4">
          <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div className="flex">
            <button type="button" className="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div className="bg-gray-300" style={{ width: "1px", height: "100%" }}></div>
            <button type="button" className="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li className="flex gap-4">
          <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div className="flex">
            <button type="button" className="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div className="bg-gray-300" style={{ width: "1px", height: "100%" }}></div>
            <button type="button" className="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li className="flex gap-4">
          <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div className="flex">
            <button type="button" className="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div className="bg-gray-300" style={{ width: "1px", height: "100%" }}></div>
            <button type="button" className="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li className="flex gap-4">
          <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div className="flex">
            <button type="button" className="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div className="bg-gray-300" style={{ width: "1px", height: "100%" }}></div>
            <button type="button" className="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
      </ul>
      <button type="button" className="cursor-pointer rounded border border-gray-400 px-2 py-1 text-sm text-gray-800">リセット</button>
    </div>

    <h3 className="mt-4 font-bold">{"チームB"}の状況</h3>
    <div className="flex flex-col items-start justify-start gap-4">
      <ul className="flex justify-start items-start flex-col gap-2">
        <li className="flex gap-4">
          <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div className="flex">
            <button type="button" className="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div className="bg-gray-300" style={{ width: "1px", height: "100%" }}></div>
            <button type="button" className="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li className="flex gap-4">
          <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div className="flex">
            <button type="button" className="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div className="bg-gray-300" style={{ width: "1px", height: "100%" }}></div>
            <button type="button" className="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li className="flex gap-4">
          <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div className="flex">
            <button type="button" className="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div className="bg-gray-300" style={{ width: "1px", height: "100%" }}></div>
            <button type="button" className="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li className="flex gap-4">
          <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div className="flex">
            <button type="button" className="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div className="bg-gray-300" style={{ width: "1px", height: "100%" }}></div>
            <button type="button" className="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li className="flex gap-4">
          <input type="text" className="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div className="flex">
            <button type="button" className="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div className="bg-gray-300" style={{ width: "1px", height: "100%" }}></div>
            <button type="button" className="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
      </ul>
      <button type="button" className="cursor-pointer rounded border border-gray-400 px-2 py-1 text-sm text-gray-800">リセット</button>
    </div>

    <h3 className="mt-4 font-bold">コピペ用テキスト</h3>
    <textarea name="" className="rounded-sm bg-gray-200" id="" cols={80} rows={15}></textarea>
  </div>
</div>

    </div>
  )
}

export default App
