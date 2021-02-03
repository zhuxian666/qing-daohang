const $last = $('.last')
const $siteList = $('.siteList')
const str = JSON.parse(localStorage.getItem('hash'))
const hash = str || [
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url: 'https://www.bilibili.com'},
    {logo: 'W', url: 'https://www.weibo.com'},
    {logo: 'D', url: 'https://www.douyu.com'},
    {logo: 'T', url: 'https://www.taobao.com'},
    {logo: 'B', url: 'https://www.baidu.com'}
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
}
const rander = () => {
    $siteList.find('.site:not(.last)').remove()
    hash.forEach((node, index) => {
        let iconSrc = `${node.url + '/favicon.ico'}`
        const $li = $(`<li class="site">
            <img class="icon-wrapper" src="${iconSrc}"/>
            <div class="link">${simplifyUrl(node.url)}</div>
            <svg class="icon close" aria-hidden="true">
                    <use xlink:href="#icon-shanchu"></use>
                </svg>
        </li>`).insertBefore($last)

        $('.icon-wrapper').on('error',(xxx)=>{
            xxx.target.src = '../27-pig.png'
        })
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hash.splice(index, 1)
            rander()
        })
    })
}
// http://www.baidu.com/favicon.ico
rander()

$('.addButton').on('click', () => {
    let url = window.prompt('请输入要添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://www.' + url
    }
    hash.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    rander()
})
window.onbeforeunload=()=>{
    const string = JSON.stringify(hash)
    localStorage.setItem('hash',string)
}





























