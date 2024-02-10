import React from "react";

export default function Logo({ width, height, color }) {
  return (
    <svg
      width={width ? width : "22"}
      height={height ? height : "22"}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.312 3.42948L15.4461 6.56349M2.59786 13.0245L2.17709 16.8229L5.97541 16.4021L16.8229 5.54887V4.26934L14.7307 2.17706H13.4511L2.59786 13.0245Z"
        stroke={color ? color : "#4285F4"}
        strokeWidth="1.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6507 7.3147L6.41754 12.5478"
        stroke={color ? color : "#4285F4"}
        strokeWidth="1.1875"
        strokeMiterlimit="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
