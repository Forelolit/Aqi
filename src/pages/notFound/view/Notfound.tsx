import { Container } from '@/components';

export const Notfound = () => {
    return (
        <section>
            <Container>
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <h1 className="text-2xl text-gray-200 font-bold">Page not found</h1>
                    <span className="text-3xl text-red-400 font-black">404</span>
                </div>
                {/* <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                    <h2>Мини-чат с ИИ</h2>
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Напиши вопрос..."
                        style={{ padding: '10px', width: '300px' }}
                    />
                    <button onClick={askAI} disabled={loading} style={{ padding: '10px' }}>
                        {loading ? 'Думаю...' : 'Спросить'}
                    </button>

                    <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                        <strong>Ответ:</strong> {answer}
                    </div>
                </div> */}
            </Container>
        </section>
    );
};
