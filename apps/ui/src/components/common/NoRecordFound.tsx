import React from "react";

type NoRecordFoundProps = {
    message?: string;
    icon?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    /**
     * If true, the component will take 100% height of its parent
     * so it can be perfectly centered in the viewport or any container.
     */
    fullHeight?: boolean;
};

const DefaultIcon = (
    <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="3" y="3" width="18" height="14" rx="2" stroke="#9CA3AF" strokeWidth="1.5" />
        <path d="M7 21h10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8.5" cy="8.5" r="1" fill="#9CA3AF" />
        <circle cx="11.5" cy="8.5" r="1" fill="#9CA3AF" />
        <circle cx="14.5" cy="8.5" r="1" fill="#9CA3AF" />
    </svg>
);

export default function NoRecordFound({
    message = "No record found",
    icon = DefaultIcon,
    className,
    style,
    fullHeight = true,
}: NoRecordFoundProps) {
    const containerStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: 16,
        height: fullHeight ? "100%" : undefined,
        minHeight: fullHeight ? undefined : 160,
        color: "#6B7280",
        ...style,
    };

    const messageStyle: React.CSSProperties = {
        marginTop: 12,
        fontSize: 16,
        lineHeight: 1.2,
    };

    return (
        <div role="status" className={className} style={containerStyle}>
            <div aria-hidden>{icon}</div>
            <div style={messageStyle}>{message}</div>
        </div>
    );
}