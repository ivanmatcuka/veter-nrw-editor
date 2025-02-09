const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ToneResponse = {
  data: {
    id: "string";
    name: "string";
    photo: "string";
    date_of_birth: "string";
  }[];
  targetDate: string;
  weekLater: string;
};

type SettingsResponse = {
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
};

type UpdateSettingsRequest = Omit<
  SettingsResponse,
  "id" | "created_at" | "updated_at"
>;

export const getTones = async (): Promise<ToneResponse["data"]> => {
  try {
    const response = await fetch(`${API_URL}/tones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get tones");
    }

    return await response.json();
  } catch {
    return [];
  }
};

export const getSettings = async (): Promise<SettingsResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/settings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get tones");
    }

    return await response.json();
  } catch {
    return null;
  }
};

export const updateSettings = async (data: UpdateSettingsRequest) => {
  try {
    const response = await fetch(`${API_URL}/settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update settings");
    }
  } catch {
    return null;
  }
};
