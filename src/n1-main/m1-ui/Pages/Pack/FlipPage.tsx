import React, {useState} from 'react'
import {useSpring, a} from '@react-spring/web'

import styles from './styles.module.css'

export default function FlipPage() {
    const [flipped, set] = useState(false)
    const {transform, opacity} = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80},
    })
    return (
        <div
            style={{
            position: "relative",
            /*backgroundColor: "green",*/
            margin: "0px auto",
            marginTop: "20px",
            width: "100%",
            height: "500px",
        }}
        >
            <div className={styles.container} onClick={() => set(state => !state)}>
                <a.div
                    className={`${styles.c} ${styles.back}`}
                    style={{opacity: opacity.to(o => 1 - o), transform}}
                />
                <a.div
                    className={`${styles.c} ${styles.front}`}
                    style={{
                        opacity,
                        transform,
                        rotateX: '180deg',
                    }}
                />
            </div>
        </div>
    )
}
