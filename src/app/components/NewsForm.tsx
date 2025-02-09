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
import { useState } from "react";
import { useSettings } from "../SettingsContext";

const AI_MODELS = ["ChatGPT", "Claude"];
const PARAGRAPH_OPTIONS = [1, 2, 3, 4, 5];

export const NewsForm = () => {
  const { settings } = useSettings();

  const [newsText, setNewsText] = useState("");
  const [newsUrl, setNewsUrl] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [paragraphCount, setParagraphCount] = useState(3);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const promptTemplate = `You are news writer. Write news article in Russian based on text below. Write only article, no additional text. Article should be ${paragraphCount} paragraphs lengh. The tone of voice is ${selectedTone}. {add}

Text: ${newsText}`;

  const handleGenerate = async () => {
    // Simulating API call or text generation process
    const prompt = `You are news writer. Write news article in Russian based on text below. Write only article, no additional text. Article should be ${paragraphCount} paragraphs length. The tone of voice is ${selectedTone}. ${additionalInstructions}. Text: ${newsText}`;

    // In a real scenario, you'd make an API call here
    console.log("Generating with prompt:", prompt);
    // Simulated response
    setGeneratedText("Generated text would appear here...");
  };

  return (
    <Box maxWidth="md" width="100%" margin="auto" p={3}>
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

      <Typography variant="h5" gutterBottom>
        Используемая модель
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        {AI_MODELS.map((model) => (
          <FormControlLabel
            key={model}
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

      <Typography variant="h6" gutterBottom>
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

      <Typography variant="h5" gutterBottom>
        Тон
      </Typography>
      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        {settings.tones?.map((tone) => (
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
        ))}
      </Box>

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

      <Typography variant="h5" gutterBottom>
        Запрос
      </Typography>
      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <TextField
          fullWidth
          multiline
          rows={2}
          value={promptTemplate}
          disabled
          onChange={(e) => setAdditionalInstructions(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <Button variant="contained" onClick={handleGenerate} sx={{ mb: 2 }}>
        Сгенерировать
      </Button>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Generated Text"
        value={generatedText}
        disabled
      />
    </Box>
  );
};
