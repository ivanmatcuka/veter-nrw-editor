import Anthropic from '@anthropic-ai/sdk';
import { ChatGPTAPI, ChatGPTError, ChatMessage } from 'chatgpt';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

type ToneResponse = {
  data: {
    id: 'string';
    name: 'string';
    photo: 'string';
    date_of_birth: 'string';
  }[];
  targetDate: string;
  weekLater: string;
};

export type SettingsResponse = {
  id: number;
  default_model: string;
  api_chat_gpt: string;
  api_claude: string;
  morning_text_header: string;
  morning_text_before: string;
  morning_text_block_header: string;
  morning_text_after: string;
  evening_text_header: string;
  evening_text_before: string;
  evening_text_block_header: string;
  evening_text_after: string;
  created_at: string;
  updated_at: string;
  news_prompt: string;
  news_header_prompt: string;
  weather_morning_prompt: string;
};

type UpdateSettingsRequest = Omit<
  SettingsResponse,
  'id' | 'created_at' | 'updated_at'
>;

export const getTones = async (): Promise<ToneResponse['data']> => {
  try {
    const response = await fetch(`${API_URL}/tones`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get tones');
    }

    return await response.json();
  } catch {
    return [];
  }
};

export const getSettings = async (): Promise<SettingsResponse | null> => {
  try {
    const response = await fetch(
      `${API_URL}/wp-json/veter-nrw-plugin/v1/settings`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to get tones');
    }

    return await response.json();
  } catch {
    return null;
  }
};

export const updateSettings = async (data: UpdateSettingsRequest) => {
  try {
    const response = await fetch(`${API_URL}/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update settings');
    }
  } catch {
    return null;
  }
};

export const getChatGPTResponse = async (
  apiKey: string,
  prompt: string,
  onProgress?: ((partialResponse: ChatMessage) => void) | undefined,
) => {
  try {
    const api = new ChatGPTAPI({
      apiKey,
    });

    const res = await api.sendMessage(prompt, {
      onProgress,
    });

    return { data: res.text, error: null };
  } catch (error) {
    const errorResponse = error as ChatGPTError;
    console.error(errorResponse);
    return { data: null, error: errorResponse.message };
  }
};

export const getClaudeResponse = async (apiKey: string, prompt: string) => {
  try {
    const api = new Anthropic({
      dangerouslyAllowBrowser: true,
      apiKey,
    });

    const res = await api.messages.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 1024,
    });

    return { data: res.content, error: null };
  } catch (error) {
    const { error: errorResponse } = error as {
      error: Anthropic.ErrorResponse;
    };
    console.error(errorResponse);
    return { data: null, error: errorResponse.error.message };
  }
};
