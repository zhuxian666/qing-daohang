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
    .replace(/\/.*/, "")
    .replace(".com", "");
};
const rander = () => {
  $siteList.find(".site:not(.last)").remove();
  hash.forEach((node, index) => {
    let iconSrc = `${node.url + "/favicon.ico"}`;
    const $li = $(`<li class="site">
            <div class="icon-wrapper">${node.logo}</div>
            <svg class="icon close" aria-hidden="true">
                    <use xlink:href="#icon-shanchu"></use>
                </svg>
            <div class="link">${simplifyUrl(node.url)}</div>
            </li>`).insertBefore($last)
        $li.find('.icon-wrapper').addClass(`${simplifyUrl(node.url)}`)
        const $img = $(`<img class="icon-wrapper" src="${iconSrc}"/>`)
        $img.on('load', () => {
            const $removeClass = $('.site').find(`${'.' + simplifyUrl(iconSrc)}`)
            $removeClass.replaceWith($img)
        })

        $li.on('click', () => {
          window.open(node.url)
      })
      $li.on('click', '.close', (e) => {
          e.stopPropagation()
          hash.splice(index, 1)
          localStorage.setItem('hash', JSON.stringify(hash))
          rander()
      })
        const $site = $('site')
        let event
        $site.on({
            touchstart(e) {
                event = e.target.lastChild
                timeOutEvent = setTimeout(() => {
                    if (event){
                        event.style.display = 'block'
                    }
                }, 1000)
            },
            touchmove() {
                clearTimeout(timeOutEvent)
            }, 
        })
        $(document).on("click", () => {
            if(event)event.style.display = 'none'
        });
    })
}

window.onload=()=>{
    rander()
}
$('.addButton').on('click', () => {
    let url = window.prompt('请输入要添加的网址')
    if (url && url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    if (url) {
        hash.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url
        })
        localStorage.setItem('hash', JSON.stringify(hash))
        rander()
    }
})

window.onbeforeunload = () => {
  localStorage.setItem("hash", JSON.stringify(hash));
};
