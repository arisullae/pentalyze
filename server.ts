import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isDev = process.env.NODE_ENV !== 'production';

app.use(express.json({ limit: '10mb' }));

const LANGUAGE_NAMES: Record<string, string> = {
  ko: '한국어 (Korean)',
  en: 'English (US/UK)',
  ja: '日本語 (Japanese)',
  hi: 'हिन्दी (Hindi)',
  es: 'Español (Spanish)',
  fr: 'Français (French)',
  de: 'Deutsch (German)',
  it: 'Italiano (Italian)',
  pt: 'Português (Portuguese)',
  ru: 'Русский (Russian)',
};

// 5단계 분석 프롬프트 생성기 (다국어 지원)
function buildPrompt(text: string, mode: 'analysis' | 'correction', targetLang: string = 'ko'): string {
  const isAnalysis = mode === 'analysis';
  const langName = LANGUAGE_NAMES[targetLang] || '한국어 (Korean)';

  return `You are 'Pentalyze (다섯결)', an elite multi-dimensional sentence analysis and literary engineering AI.
Perform a 5-step deep insight analysis on the following input text.
CRITICAL REQUIREMENT: Output all keys and content in the specified target language: **${langName}**.

[Input Text]
"${text}"

[Analysis Mode]
${isAnalysis ? '💡 Analyzed Quoted / Others’ Text Mode (Exploration & Subtext)' : '✍️ Polishing Own Writing Mode (Correction & Clarity)'}

[Target Language for Analysis Output]
**${langName}** (All explanations, titles, subtitles, details, advice, and summaries MUST be written fluently in this language).

[5-Step Criteria]
- Step 1 (Interpretation): Hidden intent, nuance, context exploration, or intent alignment audit.
- Step 2 (Summary): 1-2 sentence hyper-condensed core takeaway for speed-reading or single-line focus.
- Step 3 (Deep Explanation): Advanced vocabulary, technical terms, background concepts, or elevated context-appropriate synonyms.
- Step 4 (Grammar & Tone): Grammar error critique, unnatural translationese removal, typo fix, and rewrite in professional/business/natural tone.
- Step 5 (Paraphrasing / Alternatives): 3 refined sentence alternatives or paraphrasing options utilizing the vocabulary pool.

Respond ONLY with valid JSON conforming strictly to this format:
{
  "summaryShort": "Intuitive 1-sentence summary of the core insight in ${langName}",
  "steps": {
    "step1": {
      "title": "Step 1 title in ${langName}",
      "subtitle": "Step 1 subtitle in ${langName}",
      "mainContent": "Detailed step 1 analysis (2-4 sentences) in ${langName}",
      "details": ["Point 1", "Point 2", "Point 3"],
      "tags": ["Tag1", "Tag2"],
      "actionableAdvice": "Key insight or reading advice in ${langName}"
    },
    "step2": {
      "title": "Step 2 title in ${langName}",
      "subtitle": "Step 2 subtitle in ${langName}",
      "mainContent": "Condensed summary content in ${langName}",
      "details": ["Core Fact 1", "Core Fact 2"],
      "tags": ["Tag1", "Tag2"],
      "actionableAdvice": "Speed-reading takeaway in ${langName}"
    },
    "step3": {
      "title": "Step 3 title in ${langName}",
      "subtitle": "Step 3 subtitle in ${langName}",
      "mainContent": "Vocabulary and background explanation in ${langName}",
      "details": ["Vocab 1 explanation", "Vocab 2 explanation", "Vocab 3 explanation"],
      "tags": ["Tag1", "Tag2"],
      "actionableAdvice": "Literacy tip in ${langName}"
    },
    "step4": {
      "title": "Step 4 title in ${langName}",
      "subtitle": "Step 4 subtitle in ${langName}",
      "mainContent": "Grammar polish & rewrite overview in ${langName}",
      "details": [
        "Formal/Business: ...",
        "Natural/Conversational: ...",
        "Concise/Impactful: ..."
      ],
      "tags": ["Tag1", "Tag2"],
      "actionableAdvice": "Writing habit tip in ${langName}"
    },
    "step5": {
      "title": "Step 5 title in ${langName}",
      "subtitle": "Step 5 subtitle in ${langName}",
      "mainContent": "Paraphrase & alternative candidates overview in ${langName}",
      "details": [
        "Alternative 1: ...",
        "Alternative 2: ...",
        "Alternative 3: ..."
      ],
      "tags": ["Tag1", "Tag2"],
      "actionableAdvice": "Selection guide in ${langName}"
    }
  }
}`;
}

// Gemini 장애 대비 다단계 모델 폴백 실행기
async function generateGeminiWithFallback(ai: GoogleGenAI, request: { contents: any; config?: any }) {
  const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3.1-pro-preview'];
  let lastError: any = null;
  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: request.contents,
        config: request.config
      });
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini Fallback] Model ${model} failed: ${err?.message || err}`);
    }
  }
  throw lastError || new Error('Gemini 모델 응답에 실패했습니다.');
}

// 5단계 분석 API
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { text, mode = 'analysis', apiKey, provider = 'gemini', language = 'ko' } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: '분석할 문장을 입력해 주세요.' });
    }

    const currentMode = mode === 'correction' ? 'correction' : 'analysis';
    const effectiveKey = apiKey?.trim() || process.env.GEMINI_API_KEY || '';

    // OpenAI provider 선택 시 BYOK 처리
    if (provider === 'openai') {
      if (!apiKey?.trim()) {
        return res.status(400).json({ 
          error: 'OpenAI 모델을 사용하려면 [설정]에서 OpenAI API Key를 입력해야 합니다.' 
        });
      }

      const prompt = buildPrompt(text, currentMode, language);
      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are Pentalyze, an expert sentence analyzer and writing coach. Respond in valid JSON only.' },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7
        })
      });

      if (!openAiRes.ok) {
        const errText = await openAiRes.text();
        return res.status(openAiRes.status).json({ 
          error: `OpenAI API 오류 (${openAiRes.status}): ${errText}` 
        });
      }

      const openAiData = await openAiRes.json();
      const content = openAiData.choices?.[0]?.message?.content;
      const parsed = JSON.parse(content);
      return res.json({ result: parsed });
    }

    // Gemini provider (기본)
    if (!effectiveKey) {
      return res.status(400).json({
        error: 'Gemini API Key가 설정되지 않았습니다. 상단 [⚙️ API 설정]에서 본인의 Gemini API Key를 입력하거나 환경변수를 구성해 주세요.'
      });
    }

    const ai = new GoogleGenAI({ apiKey: effectiveKey });
    const prompt = buildPrompt(text, currentMode, language);

    const response = await generateGeminiWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.6,
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('AI 모델로부터 응답을 받지 못했습니다.');
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch {
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedResult = JSON.parse(cleaned);
    }

    return res.json({ result: parsedResult });
  } catch (err: any) {
    console.error('Analyze error:', err);
    return res.status(500).json({ 
      error: err?.message || '분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' 
    });
  }
});

// 서버 상태 확인 API (서버 환경변수 Gemini 키 존재 여부)
app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    hasServerGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

// API 키 유효성 테스트 API
app.post('/api/test-key', async (req: Request, res: Response) => {
  try {
    const { provider = 'gemini', apiKey } = req.body;
    const effectiveKey = apiKey?.trim() || (provider === 'gemini' ? process.env.GEMINI_API_KEY : '');

    if (!effectiveKey) {
      return res.status(400).json({ success: false, error: '테스트할 API 키가 비어 있습니다.' });
    }

    if (provider === 'openai') {
      const openAiRes = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${effectiveKey}` }
      });
      if (!openAiRes.ok) {
        const errText = await openAiRes.text();
        return res.status(openAiRes.status).json({ 
          success: false, 
          error: `OpenAI 인증 실패 (${openAiRes.status}): ${errText.slice(0, 150)}` 
        });
      }
      return res.json({ success: true, message: 'OpenAI API 키가 정상적으로 연결되었습니다.' });
    }

    // Gemini
    const ai = new GoogleGenAI({ apiKey: effectiveKey });
    const response = await generateGeminiWithFallback(ai, {
      contents: 'Ping',
    });
    if (response.text) {
      return res.json({ 
        success: true, 
        message: apiKey?.trim() 
          ? '사용자 입력 Gemini API 키가 성공적으로 연결되었습니다.' 
          : '서버 내장 Gemini API 키가 활성화되어 있습니다.' 
      });
    }
    return res.status(500).json({ success: false, error: '응답을 받지 못했습니다.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || '연결 테스트에 실패했습니다.' });
  }
});

// 기존 분석 결과 실시간 번역 API
app.post('/api/translate', async (req: Request, res: Response) => {
  try {
    const { summaryShort, steps, targetLang, apiKey, provider = 'gemini' } = req.body;
    if (!steps || !targetLang) {
      return res.status(400).json({ error: '번역할 내용 및 대상 언어가 필요합니다.' });
    }

    const langName = LANGUAGE_NAMES[targetLang] || targetLang;

    // OpenAI provider 처리
    if (provider === 'openai') {
      if (!apiKey?.trim()) {
        return res.status(400).json({ 
          error: 'OpenAI 모델로 번역하려면 [설정]에서 OpenAI API Key를 입력해야 합니다.' 
        });
      }

      const prompt = `Translate the following Pentalyze sentence insight JSON into **${langName}**.
Maintain the exact JSON structure and key names. Translate all human-readable values (summaryShort, titles, subtitles, mainContent, details, tags, actionableAdvice) naturally and eloquently into ${langName}.

Input JSON:
${JSON.stringify({ summaryShort, steps })}

Respond with valid JSON only:`;

      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are Pentalyze translator. Respond in valid JSON only.' },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3
        })
      });

      if (!openAiRes.ok) {
        const errText = await openAiRes.text();
        return res.status(openAiRes.status).json({ 
          error: `OpenAI 번역 오류 (${openAiRes.status}): ${errText}` 
        });
      }

      const openAiData = await openAiRes.json();
      const content = openAiData.choices?.[0]?.message?.content;
      const parsed = JSON.parse(content);
      return res.json({ result: parsed });
    }

    // Gemini provider
    const effectiveKey = apiKey?.trim() || process.env.GEMINI_API_KEY || '';

    if (!effectiveKey) {
      return res.status(400).json({ error: 'Gemini API 키가 필요합니다.' });
    }

    const prompt = `Translate the following Pentalyze sentence insight JSON into **${langName}**.
Maintain the exact JSON structure and key names. Translate all human-readable values (summaryShort, titles, subtitles, mainContent, details, tags, actionableAdvice) naturally and eloquently into ${langName}.

Input JSON:
${JSON.stringify({ summaryShort, steps })}

Respond with valid JSON only:`;

    const ai = new GoogleGenAI({ apiKey: effectiveKey });
    const response = await generateGeminiWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3
      }
    });

    const responseText = response.text;
    if (!responseText) throw new Error('번역 실패');
    let translated;
    try {
      translated = JSON.parse(responseText);
    } catch {
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      translated = JSON.parse(cleaned);
    }

    return res.json({ result: translated });
  } catch (err: any) {
    console.error('Translate error:', err);
    return res.status(500).json({ error: err?.message || '번역 중 오류가 발생했습니다.' });
  }
});

// ElevenLabs 음성 합성 프록시 (BYOK)
app.post('/api/tts/elevenlabs', async (req: Request, res: Response) => {
  try {
    const { text, voiceId, apiKey } = req.body;
    if (!text || !apiKey || !voiceId) {
      return res.status(400).json({ 
        error: 'ElevenLabs API Key, Voice ID, 그리고 읽을 텍스트가 모두 필요합니다.' 
      });
    }

    const elevenRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey.trim()
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8
        }
      })
    });

    if (!elevenRes.ok) {
      const errText = await elevenRes.text();
      return res.status(elevenRes.status).json({ 
        error: `ElevenLabs API 오류: ${errText}` 
      });
    }

    const audioBuffer = await elevenRes.arrayBuffer();
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.byteLength
    });
    return res.send(Buffer.from(audioBuffer));
  } catch (err: any) {
    console.error('TTS error:', err);
    return res.status(500).json({ error: err?.message || 'TTS 생성 오류가 발생했습니다.' });
  }
});

// Vite / Static 서빙
async function startServer() {
  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Pentalyze Server] Running at http://localhost:${PORT}`);
  });
}

startServer();
