import { useEffect, useState } from 'react'

import styles from '@/styles/success.module.css'

type Props = {
  show: boolean
}

const AnimatedSuccess = (props: Props) => {
  const { show } = props

  const [active, setActive] = useState(show)

  // Delay animation
  useEffect(() => {
    setActive(show)
  }, [show])

  return (
    <svg
      width="6rem"
      height="6rem"
      viewBox="0 0 134 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(active && { className: styles.active })}
    >
      <path
        d="M112.167 67C112.167 63.6473 111.739 60.3528 111.042 57.2205L119.275 48.9881C121.217 54.644 122.333 60.6963 122.333 67C122.333 97.5439 97.5439 122.333 67 122.333C36.4562 122.333 11.6667 97.5439 11.6667 67C11.6667 36.4561 36.4562 11.6667 67 11.6667C78.5725 11.6667 89.2904 15.2406 98.1605 21.3416L90.8256 28.6764C83.8991 24.3479 75.777 21.8333 67 21.8333C42.0455 21.8333 21.8334 42.0455 21.8334 67C21.8334 91.9545 42.0455 112.167 67 112.167C91.9545 112.167 112.167 91.9545 112.167 67Z"
        fill="#66bb6a"
        className={styles.successCircle}
      />
      <path
        d="M122.125 28.9231L59.1273 91.9761L36.1613 69.01L43.3267 61.8446L58.7739 77.2919L59.1275 77.6454L59.481 77.2919L114.962 21.8108L122.125 28.9231Z"
        fill="#66bb6a"
        className={styles.successCheckmark}
      />
    </svg>
  )
}

export default AnimatedSuccess
