
import { Suspense } from "react";

export default function ManufacturerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <><Suspense>{children}</Suspense></>;
}