const $last = $(".last");
const $siteList = $(".siteList");
const getStr = JSON.parse(localStorage.getItem("hash"));
const hash = getStr || [
  { logo: "B", url: "https://www.bilibili.com" },
  { logo: "W", url: "https://www.weibo.com" },
  { logo: "D", url: "https://www.douyu.com" },
  { logo: "Z", url: "https://www.zhihu.com/" },
  { logo: "X", url: "https://www.ximalaya.com/" },
  { logo: "G", url: "https://github.com/" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\..*/, "")
};
const findIcon = (url)=>{
  return 'https://' + url
    .replace("https://", "")
    .replace("http://", "")
    .replace(/\/.*/, "")
       + "/favicon.ico"
}
const setStr = () => {
  localStorage.setItem("hash", JSON.stringify(hash));
};
const rander = () => {
  $siteList.find(".site:not(.last)").remove();
  hash.forEach((node, index) => {
    console.log(findIcon(node.url));
    const $li = $(`<li class="site">
            <div class="icon-wrapper">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <svg class="icon close" aria-hidden="true">
            <use xlink:href="#icon-shanchu"></use>
        </svg></li>`).insertBefore($last);
    $li.find(".icon-wrapper").addClass(`${simplifyUrl(node.url)}`);
    const $img = $(`<img class="icon-wrapper" src="${findIcon(node.url)}"/>`);
    $img.on("load", () => {
      const $removeClass = $(".site").find(`${"." + simplifyUrl(node.url)}`);
      $removeClass.replaceWith($img);
    });
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hash.splice(index, 1);
      setStr();
      rander();
    });
    let timeOutEvent;
    $li.on({
      touchstart() {
        timeOutEvent = setTimeout(() => {
          $li.find(".close").css("display", "block");
        }, 800);
      },
      touchmove() {
        clearTimeout(timeOutEvent);
      },
    });
    $(document).on("click", () => {
      $li.find(".close").css("display", "none");
    });
  });
};
rander();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");
  if (url && url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  if (url) {
    hash.push({
      logo: simplifyUrl(url)[0].toUpperCase(),
      url: url,
    });
    setStr();
    rander();
  }
});
window.onbeforeunload = () => {
  setStr();
};
