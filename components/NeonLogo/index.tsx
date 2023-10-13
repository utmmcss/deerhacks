import styles from '@/styles/neon.module.css'

type Props = {
  flicker?: boolean
}

const NeonLogo = (props: Props) => {
  const { flicker = false } = props

  return (
    <svg
      width="min(30rem, 100%)"
      viewBox="0 0 910 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(flicker && { className: styles.flicker })}
      style={{ margin: '-3rem 0' }}
    >
      <g filter="url(#filter)" style={{ transform: 'scale(1.25)', transformOrigin: 'center' }}>
        <path
          d="M354.815 535.592C353.858 536.23 354.655 537.717 355.718 537.292L368.999 532.193L331.547 625.052C329.794 629.461 333.619 634.029 338.187 633.073C359.065 628.823 405.972 612.993 432.268 555.354C473.067 466.161 354.815 535.592 354.815 535.592ZM407.619 555.354C403.688 576.497 387.273 585.475 378.242 588.875C375.745 589.778 373.248 587.494 374.045 584.944L388.229 539.099C388.601 537.877 389.663 536.974 390.938 536.867C396.516 536.336 411.125 536.549 407.619 555.354Z"
          stroke="#FFB4C7"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M603.909 439.227C606.087 438.696 608.158 440.502 607.84 442.733L601.146 494.21L598.543 514.237L582.5 637.482C582.234 639.607 580.428 641.201 578.25 641.201H554.982C552.326 641.201 550.307 638.864 550.732 636.261L565.554 530.227L519.071 544.836L486.4 639.501C485.816 641.307 484.169 642.529 482.31 642.529L458.458 649.541C455.483 649.541 453.411 646.62 454.42 643.804L484.169 558.967L490.916 539.683L513.334 475.776C514.024 473.81 515.299 472.164 516.999 470.942L536.602 464.408C538.408 463.133 540.798 464.886 540.108 467.011L522.471 525.446L568.741 510.359L580.322 452.136C580.906 449.055 583.191 446.558 586.272 445.814L603.909 439.227Z"
          stroke="#FFB4C7"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M645.557 375.851L641.307 363.102C640.51 360.818 637.961 359.649 635.782 360.658L625.052 365.439C625.052 365.439 596.95 355.505 562.313 370.38C540.852 355.505 527.624 363.527 527.624 363.527C527.624 363.527 525.977 396.835 560.666 388.548C562.26 388.176 541.277 505.79 541.277 505.79L565.182 494.263L575.541 439.758L573.788 406.716L608.477 406.982L644.123 380.42C645.504 379.358 646.088 377.498 645.557 375.851ZM537.08 370.061C537.08 370.061 554.026 371.495 553.973 378.136L537.08 370.061ZM576.338 374.098C576.338 374.098 591.903 367.458 591.903 372.186C591.903 380.579 576.338 374.098 576.338 374.098Z"
          stroke="#996FFF"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M575.435 353.858L547.333 337.337L555.567 304.295L586.962 276.193L557.213 296.007L563.801 266.259L578.675 247.187L557.213 264.612L541.436 315.61L529.165 299.301L520.877 276.193V303.817L539.045 324.11L534.105 340.631L558.86 360.446L575.435 353.858Z"
          stroke="#FFB4C7"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M610.124 352.212L639.873 334.044L631.639 301.001L600.243 272.952L629.992 292.767L623.405 263.071L608.53 244L629.992 261.424L645.77 312.422L658.041 296.114L666.275 273.005V300.576L648.107 320.869L653.047 337.39L628.292 357.205L610.124 352.212Z"
          stroke="#FFB4C7"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M321.188 658.147C321.188 658.147 368.095 644.867 404.857 608.584C409.106 604.387 416.384 610.23 415.906 616.18C415.003 628.558 382.279 664.044 355.293 684.018C327.509 704.577 318.479 737.141 315.876 750.263C315.185 753.609 312.263 756 308.863 756H296.751C292.236 756 288.836 751.856 289.739 747.394L296.751 713.555L295.211 709.942C293.192 705.161 294.361 699.69 298.239 696.183L308.332 687.099L313.326 667.231C314.335 663.088 317.257 659.688 321.188 658.147Z"
          stroke="#996FFF"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M391.576 666.647C384.032 676.103 371.177 687.737 361.136 692.837C360.605 693.474 360.286 694.271 360.286 695.121C360.18 717.061 374.045 726.039 386.582 743.569C387.432 744.738 388.92 745.269 390.354 744.897L406.822 741.232C408.735 740.754 409.85 738.841 409.372 736.929C406.397 725.56 397.313 695.227 397.791 668.984C397.897 665.638 393.754 664.097 391.576 666.647Z"
          stroke="#996FFF"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M439.068 607.362C446.505 606.99 453.411 603.643 457.555 601.093C458.883 600.296 460.476 601.624 459.945 603.059L443.212 651.879C442.893 655.279 445.39 658.307 448.789 658.572L481.407 651.773C483.319 651.932 484.435 653.897 483.638 655.651C472.96 679.822 461.326 711.642 461.326 736.823C461.326 738.469 459.945 739.744 458.298 739.585L428.868 738.151C427.593 738.044 426.584 737.035 426.371 735.813C421.059 698.202 424.937 648.32 437.58 609.008C437.899 608.318 438.43 607.734 439.068 607.362Z"
          stroke="#996FFF"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M532.511 625.636C537.399 622.608 543.561 626.645 542.764 632.329L540.745 646.248C540.745 649.648 543.508 652.41 546.908 652.41H571.132C573.044 652.41 574.319 654.269 573.735 656.075C565.341 681.15 563.641 706.171 565.979 731.245C566.138 732.891 564.863 734.273 563.216 734.273H533.733C532.458 734.273 531.343 733.423 531.024 732.148C522.949 697.936 523.321 662.981 531.289 627.389C531.396 626.645 531.874 626.008 532.511 625.636Z"
          stroke="#996FFF"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M497.822 485.126L462.601 583.934C459.467 595.568 423.662 602.634 412.825 600.456C436.305 574.478 472.854 525.977 437.634 500.266C437.899 499.575 438.43 498.991 439.068 498.672L493.36 481.513C495.856 480.185 498.672 482.469 497.822 485.126Z"
          stroke="#996FFF"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M262.062 566.882C262.062 566.882 289.845 533.043 316.885 533.043C338.772 533.043 354.815 548.501 354.815 548.501L346.368 570.282L318.266 559.02L296.273 569.91V561.782L262.062 566.882Z"
          stroke="#996FFF"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M636.792 402.307C654.11 432.852 663.991 468.179 663.991 505.79C663.991 567.201 637.642 622.395 595.675 660.803"
          stroke="#FF7533"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M296.167 644.335C263.709 607.362 244 558.86 244 505.79C244 389.823 338.028 295.795 453.995 295.795C467.807 295.795 481.354 297.123 494.422 299.673"
          stroke="#FF7533"
          strokeWidth="5.4012"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.454315"
          y="0.454315"
          width="100%"
          height="100%"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="5.73441"></feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.772549 0 0 0 0 0.294118 0 0 0 0 0.0862745 0 0 0 1 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_8_18"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="20.0704"></feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.772549 0 0 0 0 0.294118 0 0 0 0 0.0862745 0 0 0 1 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_8_18"
            result="effect2_dropShadow_8_18"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="40.1408"></feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.772549 0 0 0 0 0.294118 0 0 0 0 0.0862745 0 0 0 1 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_8_18"
            result="effect3_dropShadow_8_18"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="68.8129"></feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.772549 0 0 0 0 0.294118 0 0 0 0 0.0862745 0 0 0 1 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_8_18"
            result="effect4_dropShadow_8_18"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="120.423"></feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.772549 0 0 0 0 0.294118 0 0 0 0 0.0862745 0 0 0 1 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="effect4_dropShadow_8_18"
            result="effect5_dropShadow_8_18"
          ></feBlend>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect5_dropShadow_8_18"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="2.8672"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          ></feColorMatrix>
          <feBlend mode="normal" in2="shape" result="effect6_innerShadow_8_18"></feBlend>
        </filter>
      </defs>
    </svg>
  )
}

export default NeonLogo
