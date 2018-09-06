/**
 * @class PhotoView - 图片相册查看插件
 *
 * @param {Array} data - 图片的路径.
 * @param {String} dom - 需要挂载的Dom元素
 *
 * @example this.photoView = new PhotoView({
 *                              data: ['http://xxx1.jpg','http://xxx2.jpg'],
 *                              dom: '#home'
 *                           })
 *          this.photoView.open(index) // 打开相册,传入默认索引值
 */
function PhotoView (opts) {
    this.data = opts.data
    this.domName = opts.dom || 'body'
    this.bind = null

    this.init()
    this.renderDom()
}

// 组件初始化环境
PhotoView.prototype.init = function () {
    this.clientX = document.body.clientHeight
    this.clientY = document.body.clientWidth
}

// 创建组件的DOM结构
PhotoView.prototype.renderDom = function () {
    // 创建容器元素并设置样式
    var photoView = document.createElement('div')
    var ul = document.createElement('ul')
    var close = document.createElement('div')

    ul.setAttribute('style', 'width:' + this.data.length * 100 + '%;height:100%;-webkit-transition:transform .5s;transition:transform .5s;-webkit-transform:translateX(0px);transform:translateX(0px);')
    ul.id = '__photoview-ul'

    photoView.setAttribute('style', 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:99;width:100%;')
    photoView.id = '__photoview'

    close.setAttribute('style', 'position:absolute;top:20px;right:20px;width:30px;height:30px;line-height:30px;text-align:center;font-size:18px;color:#fff;')
    close.innerText = 'X'
    close.id = '__photoview-close'

    // 根据数据创建图片
    for (var i = 0; i < this.data.length; i++) {
        var li = document.createElement('li')
        var img = new Image()
        var deviceRatio = this.clientY / this.clientX
        var ratio
        img.src = this.data[i];
        (function (i) {
            img.onload = function () {
                ratio = this.width / this.height > deviceRatio ? 'width' : 'height'
                ul.children[i].children[0].setAttribute('style', ratio + ':100%;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);')
            }
        })(i)
        li.setAttribute('style', 'width:' + 100 / this.data.length + '%;height:100%;float:left;position:relative;')
        li.appendChild(img)
        ul.appendChild(li)
    }

    // 添加节点并挂载到实例中
    photoView.appendChild(ul)
    photoView.appendChild(close)
    this.photoView = photoView
}

// 打开相册
PhotoView.prototype.open = function (index) {
    this.dom = document.querySelector(this.domName)
    this.dom.appendChild(this.photoView)
    this.outer = document.getElementById('__photoview-ul')
    this.close = document.getElementById('__photoview-close')
    this.index = index - 0
    this.index > (this.data.length - 1) && (this.index = this.data.length - 1)
    this.index < 0 && (this.index = 0)
    this.moveFn(this.index * -this.clientY)
    !this.bind && this.bindDOM()
}

// 容器移动距离设置
PhotoView.prototype.moveFn = function (n) {
    this.outer.style.webkitTransform = 'translateX(' + n + 'px)'
    this.outer.style.transform = 'translateX(' + n + 'px)'
}

// 容器动画过渡设置
PhotoView.prototype.trsit = function (n) {
    this.outer.style.webkitTransition = n
    this.outer.style.transition = n
}

// 开始移动事件
PhotoView.prototype.startHandler = function (e) {
    e.preventDefault()
    e.stopPropagation()

    this.startX = e.touches[0].clientX
}

// 移动中事件
PhotoView.prototype.moveHandler = function (e) {
    e.preventDefault()
    e.stopPropagation()

    this.moveX = e.touches[0].clientX - this.startX
    this.trasX = e.touches[0].clientX
    this.trsit('none')
    this.moveFn(-(this.index * this.clientY) + this.moveX)
}

// 移动结束事件
PhotoView.prototype.endHandler = function (e) {
    e.preventDefault()
    e.stopPropagation();

    (this.trasX - this.startX < -100) && (this.index = this.index + 1);
    (this.trasX - this.startX > 100) && (this.index = this.index - 1)

    this.index > (this.data.length - 1) && (this.index = this.data.length - 1)
    this.index < 0 && (this.index = 0)

    this.trsit('all .5s')
    this.moveFn(-(this.clientY * this.index))
    console.log(this.index)
}

// 关闭相册
PhotoView.prototype.closeHandler = function (e) {
    e.preventDefault()
    e.stopPropagation()

    this.dom.removeChild(this.photoView)
}

// 绑定事件
PhotoView.prototype.bindDOM = function () {
    this.bind = true
    this.outer.addEventListener('touchstart', this.startHandler.bind(this), false)
    this.outer.addEventListener('touchmove', this.moveHandler.bind(this), false)
    this.outer.addEventListener('touchend', this.endHandler.bind(this), false)
    this.close.addEventListener('click', this.closeHandler.bind(this), false)
}

// export default PhotoView
