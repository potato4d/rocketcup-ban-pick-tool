function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="container mx-auto p-4">
  <div class="flex flex-col items-start justify-start gap-4">
    <h2 class="w-full text-center text-2xl font-bold">Rocket CUP JUDGE Tool</h2>
    <h3 class="font-bold">チーム情報</h3>
    <ul class="flex flex-col items-start justify-start gap-4">
      <li class="flex gap-4">
        <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="チームAの名前を入力" />
      </li>
      <li class="flex gap-4">
        <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="チームBの名前を入力" />
      </li>
    </ul>

    <h3 class="mt-4 font-bold">{{チームA}}の状況</h3>
    <div class="flex flex-col items-start justify-start gap-4">
      <ul class="flex justify-start items-start flex-col gap-2">
        <li class="flex gap-4">
          <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div class="flex">
            <button type="button" class="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div class="bg-gray-300" style="width: 1px; height: 100%"></div>
            <button type="button" class="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li class="flex gap-4">
          <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div class="flex">
            <button type="button" class="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div class="bg-gray-300" style="width: 1px; height: 100%"></div>
            <button type="button" class="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li class="flex gap-4">
          <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div class="flex">
            <button type="button" class="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div class="bg-gray-300" style="width: 1px; height: 100%"></div>
            <button type="button" class="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li class="flex gap-4">
          <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div class="flex">
            <button type="button" class="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div class="bg-gray-300" style="width: 1px; height: 100%"></div>
            <button type="button" class="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li class="flex gap-4">
          <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div class="flex">
            <button type="button" class="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div class="bg-gray-300" style="width: 1px; height: 100%"></div>
            <button type="button" class="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
      </ul>
      <button type="button" class="cursor-pointer rounded border border-gray-400 px-2 py-1 text-sm text-gray-800">リセット</button>
    </div>

    <h3 class="mt-4 font-bold">{{チームA}}の状況</h3>
    <div class="flex flex-col items-start justify-start gap-4">
      <ul class="flex justify-start items-start flex-col gap-2">
        <li class="flex gap-4">
          <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div class="flex">
            <button type="button" class="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div class="bg-gray-300" style="width: 1px; height: 100%"></div>
            <button type="button" class="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li class="flex gap-4">
          <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div class="flex">
            <button type="button" class="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div class="bg-gray-300" style="width: 1px; height: 100%"></div>
            <button type="button" class="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li class="flex gap-4">
          <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div class="flex">
            <button type="button" class="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div class="bg-gray-300" style="width: 1px; height: 100%"></div>
            <button type="button" class="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li class="flex gap-4">
          <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div class="flex">
            <button type="button" class="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div class="bg-gray-300" style="width: 1px; height: 100%"></div>
            <button type="button" class="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
        <li class="flex gap-4">
          <input type="text" class="w-48 rounded-sm border border-gray-400 px-2 py-1" placeholder="デッキ名を入力" />
          <div class="flex">
            <button type="button" class="cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm">BAN</button>
            <div class="bg-gray-300" style="width: 1px; height: 100%"></div>
            <button type="button" class="cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm">PICK</button>
          </div>
        </li>
      </ul>
      <button type="button" class="cursor-pointer rounded border border-gray-400 px-2 py-1 text-sm text-gray-800">リセット</button>
    </div>

    <h3 class="mt-4 font-bold">コピペ用テキスト</h3>
    <textarea name="" class="rounded-sm bg-gray-200" id="" cols="80" rows="15"></textarea>
  </div>
</div>

    </div>
  )
}

export default App
