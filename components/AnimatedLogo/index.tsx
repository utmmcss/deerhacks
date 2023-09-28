import styles from '@/styles/logo.module.css';

type Props = {
  onAnimationEnd?: () => void;
  pulse?: boolean;
};

const AnimatedLogo = (props: Props) => {
  const { onAnimationEnd, pulse = true } = props;

  return (
    <svg
      width="12rem"
      height="12rem"
      viewBox="0 0 851 1071"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(pulse && { className: styles.pulse })}
      onAnimationEnd={() => onAnimationEnd?.()}
    >
      <g clipPath="url(#clip0_1_2)">
        <path
          d="M195.09 613.36C193.1 614.73 194.74 617.84 197 616.99L224.93 606.26L146.2 801.49C142.48 810.71 150.5 820.33 160.21 818.38C204.14 809.43 302.73 776.18 358.1 654.89C443.74 467.33 195.1 613.35 195.1 613.35L195.09 613.36ZM306.14 654.9C297.85 699.36 263.32 718.25 244.39 725.38C239.16 727.33 233.93 722.5 235.57 717.13L265.36 620.71C266.11 618.14 268.37 616.28 271.03 616.01C282.78 614.81 313.5 615.34 306.14 654.89V654.9Z"
          fill="#E7EEF4"
          stroke="#E7EEF4"
          strokeWidth={4}
          className={styles.deerhacks1}
        />
        <path
          d="M718.94 410.67C723.54 409.52 727.86 413.36 727.25 418.07L713.17 526.26V526.29L707.68 568.39L673.97 827.61C673.38 832.12 669.55 835.49 665 835.49H616.09C610.54 835.49 606.3 830.54 607.16 825.05L638.28 602.05L540.54 632.74L471.78 831.76C470.59 835.52 467.1 838.08 463.16 838.08L412.97 852.86C406.74 852.86 402.38 846.71 404.44 840.83L467.01 662.39L481.22 621.89L528.33 487.54C529.77 483.43 532.46 479.88 536.03 477.38L577.2 463.64C581 460.98 586.01 464.66 584.62 469.08L547.53 591.97L644.86 560.24L669.24 437.76C670.42 431.24 675.31 426.02 681.74 424.41L718.94 410.68V410.67Z"
          fill="#E7EEF4"
          stroke="#E7EEF4"
          strokeWidth={4}
          className={styles.deerhacks2}
        />
        <path
          d="M495.84 507.23L421.76 714.99C415.22 739.47 339.86 754.25 317.1 749.77C366.46 695.14 443.29 593.18 369.32 539.06C369.89 537.59 370.97 536.38 372.36 535.64L486.5 499.51C491.66 496.77 497.56 501.64 495.84 507.23Z"
          fill="#87A9C7"
          className={styles.deerhacks3}
        />
        <path
          d="M806.44 277.34L797.53 250.56C795.89 245.73 790.48 243.33 785.87 245.42L763.26 255.44C763.26 255.44 704.21 234.6 631.29 265.86C586.12 234.61 558.32 251.41 558.32 251.41C558.32 251.41 554.86 321.45 627.78 304.07C631.15 303.27 587.01 550.67 587.01 550.67L637.34 526.38L659.22 411.74L655.57 342.28L728.49 342.86L803.41 286.96C806.38 284.74 807.62 280.84 806.42 277.34H806.44ZM578.37 265.19C578.37 265.19 614.01 268.16 613.92 282.17L578.37 265.19ZM660.91 273.66C660.91 273.66 693.63 259.7 693.63 269.63C693.63 287.36 660.91 273.66 660.91 273.66Z"
          fill="#87A9C7"
          className={styles.deerhacks4}
        />
        <path
          d="M659.06 231.14L600.01 196.41L617.38 126.94L683.37 67.9L620.85 109.58L634.74 47.06L666 6.95001L620.85 43.58L587.64 150.81L561.81 116.52L544.44 67.9V125.93L582.65 168.62L572.23 203.35L624.33 245.03L659.06 231.14Z"
          fill="#87A9C7"
          className={styles.deerhacks5}
        />
        <path
          d="M732 227.67L794.51 189.46L777.15 119.99L711.16 60.95L773.67 102.63L759.78 40.11L728.52 0L773.67 36.64L806.88 143.86L832.72 109.58L850.09 60.95V118.99L811.88 161.67L822.3 196.41L770.2 238.09L732 227.67Z"
          fill="#87A9C7"
          className={styles.deerhacks6}
        />
        <path
          d="M577.75 802.64C588.02 796.26 601.01 804.8 599.27 816.72L595 845.99C595 853.17 600.82 858.99 608 858.99H658.97C662.96 858.99 665.71 862.91 664.44 866.7C646.74 919.4 643.25 972.07 648.12 1024.73C648.44 1028.14 645.79 1031.09 642.36 1031.09H580.33C577.64 1031.09 575.27 1029.24 574.66 1026.62C557.68 954.61 558.5 881.12 575.19 806.31C575.53 804.8 576.45 803.46 577.76 802.64H577.75Z"
          fill="#87A9C7"
          className={styles.deerhacks7}
        />
        <path
          d="M372.28 764.29C387.95 763.56 402.44 756.43 411.17 751.14C413.93 749.47 417.26 752.2 416.19 755.24L380.96 857.85C380.3 865 385.57 871.33 392.72 871.98L461.33 857.68C465.31 858.04 467.68 862.2 466.07 865.86C443.63 916.73 419.09 983.64 419.13 1036.51C419.13 1039.93 416.23 1042.63 412.82 1042.31L350.93 1039.34C348.25 1039.09 346.06 1037.04 345.69 1034.37C334.54 955.32 342.72 850.42 369.3 767.72C369.79 766.21 370.87 764.97 372.29 764.27L372.28 764.29Z"
          fill="#87A9C7"
          className={styles.deerhacks8}
        />
        <path
          d="M272.41 888.93C256.56 908.77 229.47 933.32 208.4 944C207.27 945.34 206.63 947.04 206.63 948.79C206.43 994.94 235.54 1013.85 261.99 1050.69C263.77 1053.17 266.92 1054.27 269.88 1053.51L304.5 1045.76C308.48 1044.73 310.86 1040.68 309.83 1036.7C303.62 1012.79 284.45 949.05 285.52 893.82C285.66 886.84 276.92 883.59 272.42 888.94L272.41 888.93Z"
          fill="#87A9C7"
          className={styles.deerhacks9}
        />
        <path
          d="M130.43 864.96C130.43 864.96 229.04 836.99 306.35 760.73C315.26 751.94 330.56 764.19 329.63 776.67C327.7 802.7 258.88 877.3 202.16 919.28C143.73 962.52 124.72 1031.04 119.23 1058.59C117.83 1065.62 111.65 1070.66 104.49 1070.66H79.03C69.49 1070.66 62.36 1061.9 64.3 1052.56L79.04 981.36L75.79 973.77C71.5 963.77 74.06 952.15 82.15 944.87L103.36 925.78L113.81 883.99C115.97 875.34 122.17 868.26 130.45 864.96H130.43Z"
          fill="#87A9C7"
          className={styles.deerhacks10}
        />
        <path
          d="M0 679.16C0 679.16 58.47 607.96 115.26 607.96C161.31 607.96 195.05 640.47 195.05 640.47L177.32 686.28L118.21 662.64L72 685.55V668.46L0 679.16Z"
          fill="#87A9C7"
          className={styles.deerhacks11}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="850.09" height="1070.65" fill="white" className={styles.deerhacks12} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AnimatedLogo;
