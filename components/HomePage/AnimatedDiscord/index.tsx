const AnimatedDiscord = () => {
  return (
    <svg width="2rem" height="2rem" className="discord-logo-container" viewBox="0 0 48 48">
      <defs>
        <g>
          <path
            id="discord-logo"
            fill="currentColor" // Safari can't animate
            d="m40,12c0,0 -4.585,-3.588 -10,-4l-0.488,0.976c4.896,1.198 7.142,2.915 9.488,5.024c-4.045,-2.065 -8.039,-4 -15,-4s-10.955,1.935 -15,4c2.346,-2.109 5.018,-4.015 9.488,-5.024l-0.488,-0.976c-5.681,0.537 -10,4 -10,4s-5.121,7.425 -6,22c5.162,5.953 13,6 13,6l1.639,-2.185c-2.782,-0.967 -5.924,-2.694 -8.639,-5.815c3.238,2.45 8.125,5 16,5s12.762,-2.55 16,-5c-2.715,3.121 -5.857,4.848 -8.639,5.815l1.639,2.185c0,0 7.838,-0.047 13,-6c-0.879,-14.575 -6,-22 -6,-22zm-22.5,18c-1.933,0 -3.5,-1.791 -3.5,-4c0,-2.209 1.567,-4 3.5,-4s3.5,1.791 3.5,4c0,2.209 -1.567,4 -3.5,4zm13,0c-1.933,0 -3.5,-1.791 -3.5,-4c0,-2.209 1.567,-4 3.5,-4s3.5,1.791 3.5,4c0,2.209 -1.567,4 -3.5,4z"
          />
        </g>
      </defs>
      <g className="discord-logo">
        <use className="discord-original" href="#discord-logo"></use>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 24 24;-18 24 24;16.8 24 24;-11.4 24 24;8.7 24 24;-7.5 24 24;6 24 24;-4.8 24 24;3.79 24 24;-3.12 24 24;2.52 24 24;-2.01 24 24;1.56 24 24;-1.2 24 24;0.96 24 24;-0.75 24 24;0.6 24 24;-0.48 24 24;0.384 24 24;0 24 24;0 24 24;0 24 24;0 24 24;0 24 24;0 24 24"
          begin="3s"
          dur="2s"
          fill="freeze"
          repeatCount="indefinite"
        />
      </g>
      <animate
        fill="freeze"
        dur="4000ms"
        begin="0s"
        values={
          false ? '#DA7272;#DABF72;#A6DA72;#72DA8C;#72DADA;#728CDA;#A672DA;#DA72C0;#DA7272' : '#fff'
        }
        calcMode="linear"
        attributeName="fill"
        repeatCount="indefinite"
      />
    </svg>
  )
}

export default AnimatedDiscord
