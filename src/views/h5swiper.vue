<template>
  <div class="swithSite">
    <switchHeader title="切换车站" />
    <div class="search-div">
      <i class="search-icon"></i>
      <input ref="searchInput" v-model="inputValue" placeholder="" maxlength="10" @focus="handleFocus"
        @input="handleInput" />
      <i class="clear-icon" v-if="isInputing" @click="clearSearchInput"></i>
    </div>
    <!--搜索结果-->
    <div class="search-result-div" v-if="hasResult">
      <ul>
        <li v-for="(site,index) in searchResultList" :id="site.buildId" @click="handleSelectSite(site)" :key="index">
          {{site.name}}
        </li>
      </ul>
    </div>
    <div class="no-result" v-if="hasNoResult">抱歉，未找到你要搜索的内容</div>
    <div ref="siteContainer" class="swiper-container" style="height: calc(100% - 133px); overflow: hidden;"
      v-show="!hasResult && !hasNoResult">
      <div ref="siteWrapper" class="swiper-wrapper">
        <div class="cur-site-div block-list swiper-slide">
          <p>当前车站</p>
          <div class="grid">
            <div class="grid-cell" @click="changeSite({buildId,name:curSiteName})">
              <span class="poi-text cur-site-text">
                {{curSiteName}}
              </span>
            </div>
          </div>
        </div>
        <div class="site-loc-div block-list swiper-slide" v-if="isLocate">
          <p>定位车站</p>
          <div class="grid">
            <div class="grid-cell" @click="changeSite({buildId: $store.state.userCurBuildId, name: locSiteName})">
              <span class="poi-text site-loc-text" id="curSiteId">
                <a class="loc-icon" :class="{active: true}"></a>
                {{locSiteName}}
              </span>
            </div>
          </div>
        </div>
        <div class="pop-use-div block-list swiper-slide">
          <p>热门车站</p>
          <div class="grid">
            <div class="grid-cell" v-for="(item,index) in hotSiteList" @click="changeSite(item)" :key="index">
              <span class="poi-text" :id="item.buildId"> {{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="all-site-div block-list swiper-slide" v-for="(siteList,index) in allSiteList" :id="siteList.id"
          :key="index">
          <p class="site-list-anchor">{{siteList.index}}</p>
          <div class="site-block-div">
            <ul>
              <li v-for="(site,index) in siteList.data" @click="changeSite(site)" :key="index">{{site.name}}</li>
            </ul>
          </div>
        </div>
        <div class="swiper-slide version" v-show="allSiteList.length">c1.0.0</div>
      </div>
    </div>
    <div ref="siteDiv" class="site-letter-div" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
      v-show="!hasResult && !hasNoResult">
      <ul ref="siteLetterUl">
        <li v-for="(letter,index) in letterList" :key="index">{{letter}}</li>
      </ul>
    </div>
    <div class="site-letter-select" v-show="letterClick">
      <span>{{letterName}}</span>
    </div>
  </div>
</template>

<script>
import switchHeader from './components/header/header'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'switch-site',
  components: {
    switchHeader
  },
  data() {
    return {
      swiper: null,
      letterClick: false,
      letterName: '',
      locSiteName: '',
      inputValue: '',
      hasResult: false,
      hasNoResult: false,
      startY: 0,
      startIndex: 0,
      disY: 0,
      searchResultList: [],
      allSiteList: [{
        'index': 'B',
        'data': [{
          'buildId': 996900,
          'name': '北京南站'
        }, {
          'buildId': 996901,
          'name': '北戴河站'
        }, {
          'buildId': 996902,
          'name': '北京西站'
        }, {
          'buildId': 996903,
          'name': '北京站'
        }, {
          'buildId': 996904,
          'name': '宝鸡南站'
        }, {
          'buildId': 996905,
          'name': '滨海西站'
        }]
      }, {
        'index': 'C',
        'data': [{
          'buildId': 996906,
          'name': '成都站'
        }, {
          'buildId': 996907,
          'name': '长春西站'
        }, {
          'buildId': 996908,
          'name': '长沙南站'
        }, {
          'buildId': 996909,
          'name': '长春站'
        }, {
          'buildId': 996910,
          'name': '成都南站'
        }, {
          'buildId': 996911,
          'name': '重庆北站'
        }, {
          'buildId': 996912,
          'name': '成都东站'
        }, {
          'buildId': 996913,
          'name': '重庆西站'
        }, {
          'buildId': 996914,
          'name': '长沙站'
        }]
      }, {
        'index': 'D',
        'data': [{
          'buildId': 996915,
          'name': '大办公室'
        }, {
          'buildId': 996916,
          'name': '大连北站'
        }]
      }, {
        'index': 'F',
        'data': [{
          'buildId': 996917,
          'name': '福州站'
        }, {
          'buildId': 996918,
          'name': '佛山西站'
        }, {
          'buildId': 996919,
          'name': '福田站'
        }, {
          'buildId': 996920,
          'name': '福州南站'
        }]
      }, {
        'index': 'G',
        'data': [{
          'buildId': 996921,
          'name': '贵阳北站'
        }, {
          'buildId': 996922,
          'name': '广州北站'
        }, {
          'buildId': 996923,
          'name': '办公室'
        }, {
          'buildId': 996965,
          'name': '桂林北站'
        }, {
          'buildId': 996942,
          'name': '广州站'
        }, {
          'buildId': 996925,
          'name': '贵阳站'
        }, {
          'buildId': 996926,
          'name': '广州南站'
        }, {
          'buildId': 996927,
          'name': '桂林站'
        }]
      }],
      letterList: ['当前', '热门', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Q', 'S', 'T', 'W', 'X', 'Y', 'Z'],
      hotSiteList: [{ 'buildId': 996965, 'name': '广州南站' }, { 'buildId': 996965, 'name': '北京南站' }, { 'buildId': 996965, 'name': '上海虹桥站' }, { 'buildId': 996965, 'name': '北京西站' }, { 'buildId': 996965, 'name': '杭州站' }, { 'buildId': 996965, 'name': '南京南站' }],
      allSites: {},
      isInputing: false,
      activeIndex: 0,
      bodyHeight: 0
    }
  },
  computed: {
    buildId() {
      return 996965
    },
    curSiteName() {
      return '桂林北站'
    },
    showBuildName() {
      return '桂林北站'
    },
    isLocate() {
      return 996965
    }
  },
  mounted() {
    this._initSwiper()
  },
  beforeDestroy(){
   this.swiper.destroy(true)
   this.swiper = null
  },
  beforeRouteEnter(from, to, next) {
    next((vm) => {
      if (vm.swiper) {
        vm.swiper.slideTo(0, 300, false)
      }
      if (vm.$refs.siteLetterUl.children.length > 0) {
        for (let i = 0; i < vm.$refs.siteLetterUl.children.length; i++) {
          vm.$refs.siteLetterUl.children[i].style.cssText = ''
        }
        let height = vm.$refs.siteLetterUl.children[0].offsetWidth
        vm.$refs.siteLetterUl.children[0].style.cssText = `background: #2A70FE;color: #fff;border-radius: 50%;height: ${height}px;line-height: ${height}px;`
      }
      vm.initVal(vm)
    })
  },
  watch: {
    activeIndex(curVal) {
      this.focusTouchedLetter(curVal)
    },
    isInputing(curVal) {
      if (curVal) {
        document.body.style.cssText = `height: ${this.bodyHeight}px`
      }
    }
  },
  methods: {
    // 初始化数据
    initVal(vm) {
      vm.hasResult = false
      vm.hasNoResult = false
      vm.letterClick = false
      vm.inputValue = ''
      vm.isInputing = false
      vm.searchResultList = []
      vm.bodyHeight = document.body.offsetHeight
    },
    // 初始化swiper
    _initSwiper() {
      let that = this
      this.swiper = new Swiper('.swiper-container', {
        // speed: 2000,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        observer: true, // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
        observerParents: false, // 将observe应用于Swiper的父元素
        freeMode: true, // 惯性滑动
        freeModeMomentum: true, // 释放slider后会继续滑动
        freeModeMomentumBounceRatio: 0, // 拖动时，至顶部或底部不继续滑动并回滚
        resistanceRatio: 0, // 处于顶部或底部时，无法继续向下或向上拖动
        direction: 'vertical', // 竖向滑动
        slidesPerView: 'auto', // 控制单屏显示的slider的数量，设置成auto，是让slider的高度自适应，如果是数字n，则单屏显示n个slider
        autoHeight: true, // wrapper和container会随着当前slide的高度而发生变化
        setWrapperSize: true,
        nested: true,
        on: {
          sliderMove: function () {
            let transTop = Math.abs(that.swiper.getTranslate())
            that.setScrollTop(transTop)
          },
          touchEnd: function (e) {
            // 监听惯性滚动时的滚动距离
            let timer = true
            let count = 0
            let momentum = () => {
              if (!that.swiper) {
                return false
              }
              if (timer) {
                requestAnimationFrame(momentum)
              }
              ++count
              let curY = Math.abs(this.getTranslate())
              if (count > 1 && !that.swiper.animating) {
                timer = false
              } else {
                that.setScrollTop(curY)
              }
            }
            momentum()
          },
          slideChangeTransitionEnd: function () {
            this.update(true)
          }
        }
      })
    },
    setScrollTop(transTop) {
      let list = this.$refs.siteWrapper.children
      for (let i = 0; i < list.length; i++) {
        if (list[i].offsetTop <= transTop) {
          this.activeIndex = i
        }
      }
    },
    handleFocus(ev) {
      this.isInputing = true
    },

    handleInput(ev) {
      ev = ev || event
      this.search(ev.target.value)
    },

    // 模糊搜索
    search(input) {
      this.searchResultList = []
      if (!input.length) {
        this.hasNoResult = false
        this.hasResult = false
      } else {
        for (let items of this.allSiteList) {
          this.searchResultList = items.data.reduce((sum, cur, index) => {
            cur.name.toLowerCase().includes(input.toLowerCase()) && sum.push({ buildId: cur.buildId, name: cur.name })
            return sum
          }, this.searchResultList)
        }
        if (this.searchResultList.length > 0) {
          this.hasResult = true
          this.hasNoResult = false
        } else {
          this.hasResult = false
          this.hasNoResult = true
        }
      }
    },
    /** 清空搜索字段 */
    clearSearchInput() {
      this.isInputing = false
      this.inputValue = ''
      this.hasResult = false
      this.hasNoResult = false
      this.letterClick = false
      this.searchResultList = []
    },
    /** 选择搜索结果的站点 */
    handleSelectSite(item) {
      this.changeSite(item)
      this.hasResult = false
      this.hasNoResult = false
    },
    /** 切换站点 */
    changeSite(item) {
      if (item.buildId !== this.buildId) {
        if (this.$store.state.userCurLocatedOpen && this.isLocatSe && this.isLocate !== item.buildId) {
          // this.jsBrigeUtil.stopUpdataCurLoc(this)
        }
        this.$store.commit('UPDATE_showBuildId', item.buildId)
        this.$store.commit('UPDATE_showBuildName', item.name)
        // this.$store.commit('UPDATE_ShowSecondPanel', false)
      }
      this.$router.push({ name: 'home' })
    },

    /**
      * 右侧字母点击高亮效果
      * @param index
      */
    focusTouchedLetter(index) {
      for (let i of this.$refs.siteLetterUl.children) {
        i.style.cssText = ''
      }
      let height = this.$refs.siteLetterUl.children[index].offsetWidth
      this.$refs.siteLetterUl.children[index].style.cssText = `background: #2A70FE;color: #fff;border-radius: 50%;height: ${height}px;line-height: ${height}px;`
    },
    touchStart(ev) {
      ev = ev || event
      if (ev.targetTouches.length > 1) return
      this.startY = ev.targetTouches[0].clientY
      if (!ev.targetTouches[0].target.textContent || ev.targetTouches[0].target.tagName.toLowerCase() !== 'li') return
      for (let i = 0; i < this.$refs.siteLetterUl.children.length; i++) {
        if (ev.targetTouches[0].target.textContent === this.$refs.siteLetterUl.children[i].innerText) {
          this.startIndex = i
          break
        }
      }
      this.letterName = ev.targetTouches[0].target.textContent
      this.swiper.slideTo(this.startIndex, 300, false)
      this.focusTouchedLetter(this.startIndex)
      this.letterClick = true
    },
    touchMove(ev) {
      ev = ev || event
      if (ev.targetTouches.length > 1) return
      this.disY = ev.targetTouches[0].clientY - this.startY
      let index = 0
      if (this.disY > 0) {
        index = this.startIndex + Math.floor(this.disY / 14)
      } else if (this.disY < 0) {
        index = this.startIndex + Math.floor(this.disY / 14)
      }
      if (index >= 0 && index < this.$refs.siteLetterUl.children.length) {
        this.letterName = this.letterList[index]
        this.swiper.slideTo(index, 300, false)
        this.focusTouchedLetter(index)
        this.letterClick = true
      }
    },

    touchEnd(ev) {
      ev = ev || event
      if (ev.changedTouches.length > 1) return
      this.letterClick = false
      this.letterName = ''
      this.startIndex = 0
    },

    // 点击右侧字母列表
    handleLetterClick(ev) {
      ev = ev || event
      for (let i = 0; i < this.$refs.siteLetterUl.children.length; i++) {
        if (ev.target.text === this.$refs.siteLetterUl.children[i].innerText) {
          this.startIndex = i
          break
        }
      }
      this.letterName = this.$refs.siteLetterUl.children[this.startIndex].innerText
      this.swiper.slideTo(this.startIndex, 300, false)
      this.letterClick = true
      setTimeout(() => {
        this.letterClick = false
      }, 300)
    },

      /**
       * 获取车站列表和字母列表
       * @returns {Promise<void>}
       */
      async getSiteList() {
 
      },

      // 获取热门车站列表
      async getHotSiteList() {
        
      }

  }
}
</script>

<style scoped>
.swithSite {
  height: 100vh;
  background-color: #f5f5f5;
}
/*搜索块 s*/
.swithSite .search-div {
  width: 94.4vw;
  height: 50px;
  margin: 10px auto 15px;
  border-radius: 5px;
  /*line-height: 36px;*/
  position: relative;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
}
.swithSite .search-div .search-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url('../assets/common/search-icon@2x.png');
  background-size: 100% 100%;
  position: absolute;
  top: 12px;
  left: 20px;
}

.swithSite .search-div .clear-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url('../assets/common/clear-icon@2x.png');
  background-size: 100% 100%;
  position: absolute;
  top: 12px;
  right: 5.6vw;
}

.swithSite .search-div input {
  width: 86.1vw;
  height: 40px;
  padding-top: 4px;
  box-sizing: border-box;
  font-size: 17px;
  background: #fff;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid hsla(0, 0%, 60.8%, 0.5);
  display: inherit;
  margin: 0 auto;
  padding-left: 30px;
  /*兼容ios*/
  border-radius: 0;
  /*解决ios不能输入问题*/
  -webkit-user-select: auto;
  /* 针对ios设置样式，去除ios下input的椭圆外框*/
  -webkit-appearance: none;
}

.swithSite .search-div .cancel-btn {
  font-size: 17px;
  color: #9b9b9b;
  margin-left: 1.1vw;
  width: 14.4vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: none;
}

/*搜索块 e*/

/*常用div s*/
.block-list {
  width: 94.4vw;
  font-size: 12px;
  color: #4a4a4a;
  margin: 0 auto 10px;
}

.block-list .grid {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: 5px;
}

.block-list .grid .grid-cell {
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  width: 30.5%;
  height: 35px;
  margin: 5px 3.6vw 5px 0;
  overflow: hidden;
  text-align: center;
}

.block-list .grid .grid-cell:active {
  background-color: #e1e1e1;
}

.block-list .grid .grid-cell:nth-child(3n) {
  margin-right: 0;
}

.block-list .poi-text {
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  color: #4a4a4a;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 10px;
}

.block-list .poi-text .loc-icon {
  width: 16px;
  height: 16px;
  background-image: url('../assets/common/loc-icon@2x.png');
  background-size: 100% 100%;
  vertical-align: text-bottom;
  margin-right: 1px;
  display: none;
}

.block-list .poi-text .loc-icon.active {
  display: inline-block;
}

.site-list-contain-div {
  position: relative;
  overflow-y: hidden; /* 设置overflow-y为hidden，以避免原生的scroll影响根据手势滑动计算滚动距离 */
  background: transparent;
  /*解决安卓滑动页面时出现空白*/
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  height: calc(100% - 60px);
  margin-top: 10px;
}

.block-list .cur-site-text {
  color: #2a70fe;
}

/* 车站列表和搜索结果列表 */
.all-site-div,
.search-result-div {
  width: 100%;
  color: #4a4a4a;
  margin: 0 auto;
}

.search-result-div {
  height: calc(100% - 75px);
}

.search-result-div ul {
  height: 100%;
  overflow-y: auto;
  padding: 0;
}

.all-site-div .site-list-anchor {
  width: 94.4vw;
  margin: 10px auto 2px;
}

.all-site-div ul,
.search-result-div ul {
  width: 100%;
  padding: 0;
  list-style: none;
  display: block;
  position: relative;
  background-color: #fff;
}

.all-site-div ul li,
.search-result-div ul li {
  font-size: 15px;
  line-height: 40px;
  height: 40px;
  width: 94.4vw;
  margin: 0 auto;
  border-bottom: 1px solid rgba(155, 155, 155, 0.5);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.all-site-div ul li:last-child,
.search-result-div ul li:last-child {
  border-bottom: none;
}

/* 没有搜索结果 */
.no-result {
  box-sizing: border-box;
  padding: 10px;
  color: #4a4a4a;
  width: 100%;
  text-align: center;
  font-size: 12px;
}

/* 锚点 */
.site-letter-div {
  z-index: 1;
  position: absolute;
  overflow: hidden;
  padding: 20px 2.9vw 20px 4vw;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 10px;
  text-align: center;
}

.site-letter-div ul {
  list-style: none;
}
.site-letter-div ul li {
  line-height: 14px;
  height: 14px;
  color: #2a70fe;
}

.site-letter-select {
  z-index: 1;
  width: 50px;
  height: 50px;
  background-color: rgba(102, 102, 102, 0.5);
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 50px;
}

/*常用div e*/

/*热门div s*/

/*热门div e*/
.swiper-slide.version {
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #cecece;
  background: transparent;
  z-index: 100;
}
</style>
