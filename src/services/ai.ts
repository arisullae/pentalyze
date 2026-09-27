import { GoogleGenAI } from '@google/genai';
import { AnalysisMode, StepsResult, LanguageCode } from '../types';

export interface AnalyzeParams {
  text: string;
  mode: AnalysisMode;
  provider: 'gemini' | 'openai';
  apiKey?: string;
  language?: LanguageCode;
}

export async function analyzeSentence(params: AnalyzeParams): Promise<{
  summaryShort: string;
  steps: StepsResult;
}> {
  const { text, mode, provider, apiKey, language = 'ko' } = params;

  // 1. 먼저 백엔드 API 엔드포인트 호출 시도 (/api/analyze)
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        mode,
        provider,
        apiKey: apiKey?.trim() || undefined,
        language
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.result && data.result.steps) {
        return data.result;
      }
    } else {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.error && (!apiKey || provider !== 'gemini')) {
        throw new Error(errorData.error);
      }
    }
  } catch (err: any) {
    if (apiKey?.trim() && provider === 'gemini') {
      console.warn('Backend call failed, trying client-side fallback with user API key...', err);
      return executeClientGemini(text, mode, apiKey.trim(), language);
    }
    throw err;
  }

  // Fallback: 클라이언트 직접 실행
  if (apiKey?.trim() && provider === 'gemini') {
    return executeClientGemini(text, mode, apiKey.trim(), language);
  }

  throw new Error('분석 요청에 실패했습니다. 상단 [API 설정]에서 본인의 Gemini 또는 OpenAI API 키를 등록해 주세요.');
}

export async function translateSentenceRecord(params: {
  summaryShort: string;
  steps: StepsResult;
  targetLang: LanguageCode;
  apiKey?: string;
  provider?: 'gemini' | 'openai';
}): Promise<{ summaryShort: string; steps: StepsResult }> {
  const { summaryShort, steps, targetLang, apiKey, provider = 'gemini' } = params;

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summaryShort,
        steps,
        targetLang,
        apiKey: apiKey?.trim() || undefined,
        provider
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.result && data.result.steps) {
        return data.result;
      }
    }
  } catch (err) {
    console.warn('Backend translate failed, fallback to client...', err);
  }

  // Fallback: 클라이언트 Gemini 직통 번역
  if (apiKey?.trim()) {
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
    const prompt = `Translate this Pentalyze JSON into language: ${targetLang}.
Return JSON only:
${JSON.stringify({ summaryShort, steps })}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.steps) return parsed;
  }

  throw new Error('번역에 실패했습니다.');
}

async function executeClientGemini(
  text: string,
  mode: AnalysisMode,
  apiKey: string,
  language: LanguageCode = 'ko'
): Promise<{ summaryShort: string; steps: StepsResult }> {
  const ai = new GoogleGenAI({ apiKey });
  const isAnalysis = mode === 'analysis';

  const prompt = `You are 'Pentalyze (다섯결)', an elite multi-dimensional sentence analysis AI.
Perform a 5-step deep analysis on the following text.
Target language for all text values: ${language}.

[Input Text]
"${text}"

[Mode]
${isAnalysis ? 'Analyzed Quoted / Others’ Text Mode' : 'Polishing Own Writing Mode'}

Return valid JSON:
{
  "summaryShort": "One sentence summary in ${language}",
  "steps": {
    "step1": {
      "title": "Title in ${language}",
      "subtitle": "Subtitle in ${language}",
      "mainContent": "Content in ${language}",
      "details": ["Detail 1", "Detail 2", "Detail 3"],
      "tags": ["Tag1", "Tag2"],
      "actionableAdvice": "Advice in ${language}"
    },
    "step2": {
      "title": "Title in ${language}",
      "subtitle": "Subtitle in ${language}",
      "mainContent": "Content in ${language}",
      "details": ["Detail 1", "Detail 2"],
      "tags": ["Tag1", "Tag2"],
      "actionableAdvice": "Advice in ${language}"
    },
    "step3": {
      "title": "Title in ${language}",
      "subtitle": "Subtitle in ${language}",
      "mainContent": "Content in ${language}",
      "details": ["Detail 1", "Detail 2", "Detail 3"],
      "tags": ["Tag1", "Tag2"],
      "actionableAdvice": "Advice in ${language}"
    },
    "step4": {
      "title": "Title in ${language}",
      "subtitle": "Subtitle in ${language}",
      "mainContent": "Content in ${language}",
      "details": ["Detail 1", "Detail 2", "Detail 3"],
      "tags": ["Tag1", "Tag2"],
      "actionableAdvice": "Advice in ${language}"
    },
    "step5": {
      "title": "Title in ${language}",
      "subtitle": "Subtitle in ${language}",
      "mainContent": "Content in ${language}",
      "details": ["Detail 1", "Detail 2", "Detail 3"],
      "tags": ["Tag1", "Tag2"],
      "actionableAdvice": "Advice in ${language}"
    }
  }
}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      temperature: 0.6
    }
  });

  const responseText = response.text;
  if (!responseText) {
    throw new Error('응답을 생성하지 못했습니다.');
  }

  try {
    return JSON.parse(responseText);
  } catch {
    const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  }
}
