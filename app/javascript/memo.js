function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () =>{
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // メモの入力フォームをリセットする
      const formText = document.getElementById("content");
      // ここで定義したHTMLが描画される
      const HTML = `<div class="post" data-id=${item.id}>
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
      ${item.content}
      </div>
    </div>`;
    // listという要素に対して、insertAdjacentHTMLでHTMLを追加
    list.insertAdjacentHTML("afterend",HTML);
    // 空の文字列に上書き
    formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);