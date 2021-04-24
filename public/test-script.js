const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
script.type = "text/javascript";
script.onreadystatechange = handler;
script.onload = handler;

document.getElementsByTagName("head")[0].appendChild(script);

function handler() {
  const header = $("header.site-header").parent();
  const makeHeader = (data) => {
    header
      .prepend(`<div>${data}</div>`)
      .css({ "background-color": "orange", "text-align": "center" });
  };
  fetch(
    "http://localhost:8080/https://dry-husky-69.loca.lt/api/products?shop=lucas-app-test-store.myshopify.com"
  )
    .then((res) => res.json())
    .then((data) => {
      makeHeader(data.data);
    })
    .catch((error) => console.log(error));
}

console.log("This is coming from ScriptTag API");
