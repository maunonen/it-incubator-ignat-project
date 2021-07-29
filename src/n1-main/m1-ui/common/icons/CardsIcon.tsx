import React from "react";

export interface MessageIconPropsType {
    // 512 without px
    size?: string
}

const LoadingIcon: React.FC<MessageIconPropsType> = ({size}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            enableBackground="new 0 0 512 512"
            viewBox="0 0 60 50"
        >
            <g xmlns="http://www.w3.org/2000/svg" fill="none" fillRule="evenodd">
                <g fillRule="nonzero">
                    <path
                        fill="#2d2e46"
                        d="M2 41h56a1 1 0 011 1v3a4 4 0 01-4 4H5a4 4 0 01-4-4v-3a1 1 0 011-1z"
                        data-original="#a4c2f7"
                    ></path>
                    <path
                        fill="#7facfa"
                        d="M58 41h-3a1 1 0 011 1v3a4 4 0 01-4 4h3a4 4 0 004-4v-3a1 1 0 00-1-1zM21 45a2 2 0 01-1.789-1.106L17.764 41h24.472l-1.447 2.894A2 2 0 0139 45z"
                        data-original="#7facfa"
                    ></path>
                    <path
                        fill="#e8edfc"
                        d="M16 3v4.54l-4 1.07-2.46.66a2 2 0 00-1.41 2.45l.52 1.96L4 16.72V5a2.006 2.006 0 012-2zM4 22.78L15.88 41H4z"
                        data-original="#e8edfc"
                    ></path>
                    <path
                        fill="#cad9fc"
                        d="M4 22.78v4.601L12.88 41h3z"
                        data-original="#cad9fc"
                    ></path>
                    <path
                        fill="#e8edfc"
                        d="M56 5v11.72l-4.66-3.04.53-1.96a2 2 0 00-1.41-2.45L48 8.61l-4-1.07V3h10a2.006 2.006 0 012 2zM44.12 41L56 22.78V41z"
                        data-original="#e8edfc"
                    ></path>
                    <path
                        fill="#cad9fc"
                        d="M54 3h-3a2.006 2.006 0 012 2v36h3V5a2.006 2.006 0 00-2-2z"
                        data-original="#cad9fc"
                    ></path>
                    <path
                        fill="#e8edfc"
                        d="M44 3v38H16V3a2.006 2.006 0 012-2h24a2.006 2.006 0 012 2z"
                        data-original="#e8edfc"
                    ></path>
                    <path
                        fill="#cad9fc"
                        d="M42 1h-3a2.006 2.006 0 012 2v38h3V3a2.006 2.006 0 00-2-2zM51.87 11.72l-.53 1.96-7.29 27.3V41H44V7.54l4 1.07 2.46.66a2 2 0 011.41 2.45z"
                        data-original="#cad9fc"
                    ></path>
                    <path
                        fill="#e8edfc"
                        d="M57.68 20.2L56 22.78 44.12 41h-.07v-.02l7.29-27.3L56 16.72l1.09.71a2 2 0 01.59 2.77z"
                        data-original="#e8edfc"
                    ></path>
                    <path
                        fill="#cad9fc"
                        d="M57.09 17.43L56 16.72l-4.66-3.04-.44 1.667L53 16.72l1.09.71a2 2 0 01.59 2.77L53 22.78 46.073 33.4l-2.023 7.58V41h.07L56 22.78l1.68-2.58a2 2 0 00-.59-2.77zM16 7.54V41h-.04l-.01-.02-7.29-27.3h-.01l-.52-1.96a2 2 0 011.41-2.45L12 8.61z"
                        data-original="#cad9fc"
                    ></path>
                    <path
                        fill="#e8edfc"
                        d="M15.96 41h-.08L4 22.78 2.32 20.2a2 2 0 01.59-2.77L4 16.72l4.65-3.04h.01l7.29 27.3z"
                        data-original="#e8edfc"
                    ></path>
                    <path
                        fill="#cad9fc"
                        d="M15.95 40.98l-7.29-27.3h-.01l-2.546 1.664 4.823 18.059L15.88 41h.08z"
                        data-original="#cad9fc"
                    ></path>
                    <path
                        fill="#2d2e46"
                        d="M24 6.05A2.49 2.49 0 0126 5a2.154 2.154 0 012 2.333c0 1.453-1.112 3.173-4 4.667-2.888-1.494-4-3.214-4-4.667A2.154 2.154 0 0122 5c.796.01 1.54.4 2 1.05z"
                        data-original="#a4c2f7"
                    ></path>
                    <path
                        fill="#fff"
                        d="M4 22.78V41H2a1 1 0 00-1 1v3a4 4 0 004 4h3a4 4 0 01-4-4v-3a1 1 0 011-1h2V26zM7 14V5a2.006 2.006 0 012-2H6a2.006 2.006 0 00-2 2v11.72z"
                        data-original="#ffffff"
                    ></path>
                    <path fill="#fff" d="M3 33h2v8H3z" data-original="#ffffff"></path>
                    <g fill="#2d2e46">
                        <circle cx="4" cy="37" r="1" data-original="#428dff"></circle>
                        <path
                            d="M58 40h-1V23.074l1.52-2.331c.434-.668.584-1.48.417-2.259a2.963 2.963 0 00-1.3-1.891L57 16.178V5a3 3 0 00-3-3h-9.184A3 3 0 0042 0H18a3 3 0 00-2.816 2H6a3 3 0 00-3 3v11.179l-.63.411a3.007 3.007 0 00-.886 4.156L3 23.071V33a1 1 0 002 0v-6.861L14.037 40H2a2 2 0 00-2 2v3a5.006 5.006 0 005 5h50a5.006 5.006 0 005-5v-3a2 2 0 00-2-2zm-3 0h-9.034L55 26.142zm0-35v9.874l-2.5-1.632.337-1.258a3 3 0 00-2.116-3.68L45 6.773V4h9a1 1 0 011 1zM5 5a1 1 0 011-1h9v2.773L9.278 8.305a3 3 0 00-2.114 3.674l.336 1.264L5 14.875zM3.163 19.658a1 1 0 01.3-1.39l4.588-2.992 2.988 11.172a1 1 0 001.221.708 1 1 0 00.707-1.224L9.1 11.457a.984.984 0 01.095-.75 1 1 0 01.609-.471L15 8.843V35a1 1 0 002 0V3a1 1 0 011-1h24a1 1 0 011 1v32a1 1 0 002 0V8.843l5.2 1.392a1 1 0 01.707 1.224l-3.873 14.473a1 1 0 101.932.516l2.989-11.173 4.593 3a1 1 0 01.294 1.383L43.578 40H16.425zM40.618 42l-.718 1.447A1 1 0 0139 44H21a1 1 0 01-.895-.553L19.382 42zM58 45a3 3 0 01-3 3H5a3 3 0 01-3-3v-3h15.146l1.17 2.342A2.984 2.984 0 0021 46h18a2.984 2.984 0 002.684-1.658L42.854 42H58z"
                            data-original="#428dff"
                        ></path>
                        <circle cx="5" cy="45" r="1" data-original="#428dff"></circle>
                        <circle cx="9" cy="45" r="1" data-original="#428dff"></circle>
                        <path
                            d="M15 44h-2a1 1 0 000 2h2a1 1 0 000-2zM23.54 12.888a1 1 0 00.92 0C28.41 10.844 29 8.531 29 7.333A3.145 3.145 0 0026 4a3.411 3.411 0 00-2 .652A3.411 3.411 0 0022 4a3.145 3.145 0 00-3 3.333c0 1.198.59 3.511 4.54 5.555zM22 6c.46.009.89.23 1.165.6a1 1 0 00.823.442H24c.332-.002.642-.166.83-.44A1.487 1.487 0 0126 6c.649 0 1 .687 1 1.333 0 1.173-1.086 2.444-3 3.53-1.914-1.086-3-2.357-3-3.53C21 6.687 21.351 6 22 6zM24.412 24.943l-2.336 5.673a1 1 0 101.85.762L26 26.333h8l2.078 5.048a1 1 0 101.85-.762l-2.336-5.673-4.667-11.327a1 1 0 00-1.846 0zm2.415-.61L30 16.627l3.173 7.706z"
                            data-original="#428dff"
                        ></path>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default LoadingIcon;