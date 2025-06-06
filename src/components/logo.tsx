export const Logo = ({
  width = 48,
  height = 48,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 48 48"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <filter
        id="a"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="54"
        width="48"
        x="0"
        y="-3"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          in="SourceGraphic"
          in2="BackgroundImageFix"
          mode="normal"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="-3" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          in2="shape"
          mode="normal"
          result="effect1_innerShadow_3051_47007"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
        />
        <feBlend
          in2="effect1_innerShadow_3051_47007"
          mode="normal"
          result="effect2_innerShadow_3051_47007"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          operator="erode"
          radius="1"
          result="effect3_innerShadow_3051_47007"
        />
        <feOffset />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.24 0"
        />
        <feBlend
          in2="effect2_innerShadow_3051_47007"
          mode="normal"
          result="effect3_innerShadow_3051_47007"
        />
      </filter>
      <filter
        id="b"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="42"
        width="36"
        x="6"
        y="5.25"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          operator="erode"
          radius="1.5"
          result="effect1_dropShadow_3051_47007"
        />
        <feOffset dy="2.25" />
        <feGaussianBlur stdDeviation="2.25" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
        />
        <feBlend
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow_3051_47007"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3051_47007"
          mode="normal"
          result="shape"
        />
      </filter>
      <linearGradient
        id="c"
        gradientUnits="userSpaceOnUse"
        x1="24"
        x2="26"
        y1=".000001"
        y2="48"
      >
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#fff" stopOpacity=".12" />
      </linearGradient>
      <linearGradient
        id="d"
        gradientUnits="userSpaceOnUse"
        x1="24"
        x2="24"
        y1="9"
        y2="39"
      >
        <stop offset="0" stopColor="#fff" stopOpacity=".8" />
        <stop offset="1" stopColor="#fff" stopOpacity=".5" />
      </linearGradient>
      <linearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        x1="24"
        x2="24"
        y1="0"
        y2="48"
      >
        <stop offset="0" stopColor="#fff" stopOpacity=".12" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <clipPath id="f">
        <rect height="48" rx="12" width="48" />
      </clipPath>
      <g filter="url(#a)">
        <g clipPath="url(#f)">
          <rect fill="#175cd3" height="48" rx="12" width="48" />
          <path d="m0 0h48v48h-48z" fill="url(#c)" />
          <g filter="url(#b)">
            <path
              d="m24 9v9.2703c0 2.0449-2.5073 3.0295-3.8988 1.531l-5.8512-6.3013m24.75 10.5h-9.2703c-2.0449 0-3.0295-2.5073-1.531-3.8988l6.3013-5.8512m-10.5 24.75v-9.2703c0-2.0449 2.5073-3.0295 3.8988-1.531l5.8512 6.3013m-24.75-10.5h9.2703c2.0449 0 3.0295 2.5073 1.531 3.8988l-6.3013 5.8512"
              stroke="url(#d)"
              strokeWidth="3"
            />
          </g>
        </g>
        <rect
          height="46"
          rx="11"
          stroke="url(#e)"
          strokeWidth="2"
          width="46"
          x="1"
          y="1"
        />
      </g>
    </svg>
  );
};
