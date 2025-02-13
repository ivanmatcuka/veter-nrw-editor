import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import stringInject from "stringinject";

import { useSettings } from "../SettingsContext";
import { GeneratedResponse } from "./GeneratedResponse";

const AI_MODELS = ["ChatGPT", "Claude"];
const PARAGRAPH_OPTIONS = [1, 2, 3, 4, 5];

export const NewsForm = () => {
  const { settings } = useSettings();

  const [newsText, setNewsText] = useState("");
  const [newsUrl, setNewsUrl] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [showGeneratedResponse, setShowGeneratedResponse] = useState(false);
  const [propmpt, setPropmpt] = useState("");
  const [paragraphCount, setParagraphCount] = useState(3);
  const [additionalInstructions, setAdditionalInstructions] = useState("");

  useEffect(() => {
    if (settings?.default_model) setSelectedModel(settings.default_model);
    if (settings?.news_prompt) setPropmpt(settings.news_prompt);
  }, [settings?.default_model, settings?.news_prompt]);

  return (
    <Box
      maxWidth="md"
      width="100%"
      margin="auto"
      p={3}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          Поле для вставки текста статьи
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Текст статьи..."
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Поле для вставки URL статьи
        </Typography>
        <TextField
          fullWidth
          label="News URL"
          value={newsUrl}
          onChange={(e) => setNewsUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Используемая модель
        </Typography>
        <Box display="flex" gap={2} mb={2}>
          {AI_MODELS.map((model) => (
            <FormControlLabel
              key={model}
              defaultValue={settings.default_model}
              control={
                <Radio
                  checked={selectedModel === model}
                  onChange={() => setSelectedModel(model)}
                />
              }
              label={model}
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Количество абзацев
        </Typography>
        <Select
          value={paragraphCount}
          onChange={(e) => setParagraphCount(Number(e.target.value))}
          sx={{ mb: 2 }}
        >
          {PARAGRAPH_OPTIONS.map((count) => (
            <MenuItem key={count} value={count}>
              {count}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Тон
        </Typography>
        <Box display="flex" gap={2} mb={2} flexWrap="wrap">
          {/* {settings.tones?.map((tone) => (
          <FormControlLabel
            key={tone.id}
            control={
              <Radio
                checked={selectedTone === tone.title}
                onChange={() => setSelectedTone(tone.title)}
              />
            }
            label={tone.title}
          />
        ))} */}
        </Box>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Дополнение к запросу
        </Typography>
        <Box display="flex" gap={2} mb={2} flexWrap="wrap">
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Дополнение к запросу..."
            value={additionalInstructions}
            onChange={(e) => setAdditionalInstructions(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>
      </Box>

      {propmpt && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Запрос
          </Typography>
          <Box display="flex" gap={2} mb={2} flexWrap="wrap">
            <TextField
              fullWidth
              multiline
              disabled
              value={stringInject(propmpt, {
                count: paragraphCount,
                tone: selectedTone,
                add: additionalInstructions,
                news_text: newsText,
              })}
              sx={{ mb: 2 }}
            />
          </Box>
        </Box>
      )}

      <Box display="flex" flexDirection="column" gap={2}>
        {!showGeneratedResponse ? (
          <Button
            variant="contained"
            onClick={() => setShowGeneratedResponse(true)}
            sx={{ mb: 2 }}
          >
            Сгенерировать
          </Button>
        ) : (
          selectedModel &&
          propmpt &&
          settings.news_header_prompt && (
            <>
              <GeneratedResponse
                model={selectedModel}
                prompt={propmpt}
                apiKey={settings.api_chat_gpt ?? ""}
              />
              <GeneratedResponse
                model={selectedModel}
                prompt={settings.news_header_prompt}
                apiKey={settings.api_chat_gpt ?? ""}
              />
            </>
          )
        )}
      </Box>
    </Box>
  );
};
