
export default function ModuleLayout({ children }: { children: React.ReactNode }) {
    return (<>
        <div className="h-[calc(100%-70px)] w-full " style={{ backgroundImage: "url('/images/bg-02.png')" }}>
            <div className="h-full w-full backdrop-blur-sm">
                {children}
            </div>
        </div>
    </>)
}