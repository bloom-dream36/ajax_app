// checkという名前で関数を定義しましょう。
function check() {
  // postをクラス名にもつ要素を取得
  const posts = document.querySelectorAll(".post");
  // forEachを記述して、それぞれの要素への処理
  posts.forEach(function (post){

    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // 要素1つずつに対して、『クリック』した際に動作するイベント駆動
    post.addEventListener("click", () => { 
      // メモのidを取得
      const postId = post.getAttribute("data-id");
      // XMLHttpRequestを使用できるようにした
      const XHR = new XMLHttpRequest();
      // リクエストの詳細を指定
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンス形式指定
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        // HTTPステータスコードが200以外の場合、ifはtrueとなり、アラートを表示する処理が行われる
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // JavaScriptの処理から抜け出すことができます。これはエラーが出た場合に、15行目以降に記述されている処理を行わないように
          return null;
        }
        // 正常にレスポンスを受けた場合
        const item = XHR.response.post;
        // 既読であれば先ほどHTMLに定義した属性であるdata-checkの属性値にtrueをセット
        if (item.checked === true){
          post.setAttribute("data-check","true");
          // 未読であればdata-checkは属性ごと削除
       } else if (item.checked === false) {
         post.removeAttribute("data-check");
       }
      };
    });
  });  
} 
// 1000ミリ秒事に自動でcheck関数が実行される
setInterval(check, 1000);

