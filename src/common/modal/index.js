import React, { useState } from 'react'
import './Modal.css'

const Modal = ({ visible, onCancel }) => {
    if(!visible) return null
    return (
        <div className="modal" onClick={onCancel}>
            <div className="content" onClick={(e) => e.stopPropagation()}>
                <div>
                《咏鹅》是初唐诗人骆宾王于七岁时写的一首五言古诗。 这首诗开篇先声夺人，“鹅！鹅！鹅！”写出鹅的声响美，又通过“曲项”与“向天”、“白毛”与“绿水”、“红掌”与“清波”的对比写出鹅的线条美与色彩美，同时，“歌”、“浮”、“拨”等字又写出鹅的动态美，听觉与视觉、静态与动态、音声与色彩完美结合，将鹅的形神活现而出。
                </div>
                <span>编辑</span>
            
            </div>
        </div>
    )
}

export default Modal
