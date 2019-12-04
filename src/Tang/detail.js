import React from 'react'
import './detail.css'

export default class TangShi extends React.Component {
    state = {
        showNavList: false,
        navList: [],
    }

    componentDidMount() {
        const navList = this.getNavList()
        this.setState({ navList })
    }

    getNavList = () => {
        const eles = this.getElementByTag('li', 'data-type', 'anchor') 
        return eles.map(ele => ({
            href: ele.getAttribute('data-name'),
            title: ele.getAttribute('data-name'),
        }))
    }

    getElementByTag = (tag, attr, value) => {
        const nodes = document.getElementsByTagName(tag)
        const nodeArr = Array.prototype.slice.call(nodes)
        return nodeArr.filter(node => node.getAttribute(attr) === value)
    }

    getElementTop = (element) => {
        let currentTop = element.offsetTop
        let current = element.offsetParent
        while (current !== null) {
            currentTop += current.offsetTop
            current = current.offsetParent
        }
        return currentTop
    }

    scrollToItem = (e) => {
        const href = e.target.getAttribute('data-href')
        const targetNodes = this.getElementByTag('li', 'data-name', href)
        const targetNode = targetNodes && targetNodes[0]
        const currentTop = document.body.scrollTop + document.documentElement.scrollTop
        const targetTop = this.getElementTop(targetNode)
        this.animateScroll(currentTop, targetTop)
    }

    animateScroll = (curY, targetY) => {
        //window.scrollTo(0, targetY) // 比较生硬
        const dist = targetY - curY
        const step = Math.floor(dist/10) === 0 ? dist : Math.floor(dist/10)
        const nextY = curY + step
        setTimeout(() => {
            window.scrollTo(0, nextY)
            if(Math.abs(targetY - nextY) <= 1) {
                window.scrollTo(0, targetY)
            } else {
                this.animateScroll(nextY, targetY)
            }
        })
    }

    render() {
        const { showNavList, navList } = this.state
        return (
            <div>
                <ul className="ul-main">
                    <li data-name="题目" data-type="anchor">咏鹅</li>
                    <li data-name="作者" data-type="anchor">骆宾王</li>
                    <li data-name="第一句" data-type="anchor">鹅鹅鹅</li>
                    <li data-name="第二句" data-type="anchor">曲项向天歌</li>
                    <li data-name="第三句" data-type="anchor">白毛浮绿水</li>
                    <li data-name="第四句" data-type="anchor">红掌拨清波</li>
                    <li data-name="余音" data-type="anchor">~拨清波~</li>
                    <li data-name="绕梁" data-type="anchor">~清波~</li>
                    <li data-name="梁" data-type="anchor">~~~波~~~</li>
                </ul>
                <ul className="ul-anchor">
                    {
                        !showNavList && <li onClick={() => this.setState({ showNavList: true })}>目录</li>
                    }
                    {
                        showNavList && (navList || []).length > 0 &&
                            navList.map(item => <li key={item.href} data-href={item.href} onClick={this.scrollToItem}>{item.title}</li>)
                    }
                </ul>
            </div>
        )
    }
}