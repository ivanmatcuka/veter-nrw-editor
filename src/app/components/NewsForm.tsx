import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import stringInject from 'stringinject';

import { Page } from '@/src/components/Page';
import { useSettings } from '../SettingsContext';
import { GeneratedResponse } from './GeneratedResponse';

const AI_MODELS = ['ChatGPT', 'Claude'];
const PARAGRAPH_OPTIONS = [1, 2, 3, 4, 5];

export const NewsForm = () => {
  const { settings } = useSettings();
  const [showGeneratedResponse, setShowGeneratedResponse] = useState(false);

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      newsText: '',
      newsUrl: '',
      selectedModel: AI_MODELS[0],
      selectedTone: '',
      propmpt: '',
      paragraphCount: 3,
      additionalInstructions: '',
    },
    onSubmit: () => setShowGeneratedResponse(true),
  });

  useEffect(() => {
    if (settings?.news_prompt) setFieldValue('propmpt', settings.news_prompt);
  }, [settings?.news_prompt, setFieldValue]);

  return (
    <form onSubmit={handleSubmit}>
      <Page>
        <Box>
          <Typography variant="h5" gutterBottom>
            Поле для вставки текста статьи
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            onChange={handleChange}
            label="Текст статьи..."
            name="newsText"
            value={values.newsText}
          />
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Поле для вставки URL статьи
          </Typography>
          <TextField
            fullWidth
            label="News URL"
            value={values.newsUrl}
            name="newsUrl"
            onChange={handleChange}
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
                value={model}
                name="selectedModel"
                onChange={handleChange}
                control={<Radio checked={values.selectedModel === model} />}
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
            value={values.paragraphCount}
            name="paragraphCount"
            onChange={handleChange}
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
              name="additionalInstructions"
              value={values.additionalInstructions}
              onChange={handleChange}
            />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {!showGeneratedResponse ? (
            <Button variant="contained" type="submit" sx={{ mb: 2 }}>
              Сгенерировать
            </Button>
          ) : (
            values.selectedModel &&
            values.propmpt &&
            settings.news_header_prompt && (
              <>
                <GeneratedResponse
                  model={values.selectedModel}
                  prompt={stringInject(values.propmpt, {
                    count: values.paragraphCount,
                    tone: values.selectedTone,
                    add: values.additionalInstructions,
                    news_text: values.newsText,
                  })}
                  apiKey={settings.api_chat_gpt ?? ''}
                />
                <GeneratedResponse
                  model={values.selectedModel}
                  prompt={settings.news_header_prompt}
                  apiKey={settings.api_chat_gpt ?? ''}
                />
              </>
            )
          )}
        </Box>
      </Page>
    </form>
  );
};
