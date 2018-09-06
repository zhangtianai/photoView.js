# photoView.js
一款移动端图片滑动查看插件，类似图片相册的效果，简单易用，支持VUE。

#### 效果预览
![预览图](https://github.com/yeguangcheng/photoView.js/blob/master/images/20180906105740.png?raw=true)

#### 单页面引用
<script src="./photoView.js"></script>

#### 单页面使用
```
  var photoView = new PhotoView({
                      data: ['http://xxx1.jpg','http://xxx2.jpg'],
                      dom: '#pic'
                  })
  photoView.open(index)
```

#### VUE中引用
1. 打开结尾注释 
  ```
  export default PhotoView
  ```
2. 引入
  ```
  import PhotoView from '../../util/photoView.js'
  ```

#### VUE中使用
```
  mounted () {
    this.photoView = new PhotoView({
                         data: ['http://xxx1.jpg','http://xxx2.jpg'],
                         dom: '#pic'
                     })
  },
  methods: {
    openImg (index) {
       this.photoView.open(index)
    }
  }
```

#### 参数说明
* data：图片的地址数组，例 `['http://xxx1.jpg','http://xxx2.jpg']`

* dom：需要挂载的的DOM元素名，例 #home .content

#### 功能简介
  
  * 无需写HTML结构，自动创建
  
  * 引入单个JS即可实现功能，photoView.css 为非必须文件
  
  * 支持竖图与横图，根据图片比例自动适应屏幕
  
  * 图片预缓存，提升图片打开速度
  
