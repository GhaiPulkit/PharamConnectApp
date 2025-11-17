export default function SectionWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            < section className="py-[3rem] px-[2rem] backdrop-blur-xl flex justify-center items-center max-w-[1100px] mx-auto" >
                {children}
            </section>
        </>
    )
}