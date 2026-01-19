import { Container } from '@/components';

export const Notfound = () => {
    return (
        <section>
            <Container>
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <h1 className="text-2xl text-gray-200 font-bold">Page not found</h1>
                    <span className="text-3xl text-red-400 font-black">404</span>
                </div>
            </Container>
        </section>
    );
};
