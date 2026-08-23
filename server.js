const express = require('express');
const cors = require('cors');
const app = express();

// Разрешаем запросы с любых источников (для GitHub Pages)
app.use(cors());
app.use(express.json());

// Главный эндпоинт для чата
app.post('/api/chat', async (req, res) => {
    try {
        // Получаем API ключ из переменных окружения (безопасно!)
        const apiKey = process.env.OPENROUTER_API_KEY;
        
        if (!apiKey) {
            throw new Error('OPENROUTER_API_KEY не установлен в переменных окружения');
        }

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('❌ Ошибка сервера:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Простой тестовый эндпоинт
app.get('/', (req, res) => {
    res.send('✅ Ox-Alpha прокси сервер работает!');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
