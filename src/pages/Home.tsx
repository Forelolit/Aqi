import { Container, LeafletMap } from '@/components';

export const Home = () => {
    return (
        <section className="relative overflow-hidden">
            <Container>
                <div className="border-2 border-blue-500 h-300 w-300 rounded-full z-0 absolute -top-120 -left-100" />
                <div className="border-2 border-blue-500 h-300 w-300 rounded-full z-0 absolute -bottom-120 -right-100" />
                <div className="flex justify-center items-center min-h-screen">
                    <div className="px-10 py-4 bg-neutral-600/30 backdrop-blur-sm rounded-[17px]">
                        <h1 className="text-center mb-5 text-2xl font-black">
                            IQ <i>AIR</i>
                        </h1>
                        <LeafletMap currentPosition={[42.875, 74.6]} className="h-120 w-250 rounded-[15px]" />
                    </div>
                </div>
            </Container>
        </section>
    );
};
