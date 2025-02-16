import { Page } from '@/src/components/Page';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import stringInject from 'stringinject';

import { Section } from '@/src/components/Section';
import { AI_MODELS, useSettings } from '../SettingsContext';
import { MorningPostPreview } from './MorningPostPreview';

type News = {
  text: string;
  url: string;
  extra: string;
}[];

export const EveningForm = () => {
  const { settings } = useSettings();
  const [showGeneratedResponse, setShowGeneratedResponse] = useState(false);

  const t = useTranslations();

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      ...settings,
      weatherText: '',
      selectedModel: AI_MODELS[0],
      news: [{}, {}] as News,
    },
    onSubmit: () => setShowGeneratedResponse(true),
  });

  const handleAddNewsItem = useCallback(() => {
    setFieldValue('news', [...values.news, { text: '', url: '', extra: '' }]);
  }, [setFieldValue, values.news]);

  const handleRemoveNewsItem = useCallback(
    (index: number) => {
      const newNews = values.news.filter((_, i) => i !== index);
      setFieldValue('news', newNews);
    },
    [setFieldValue, values.news],
  );

  const handleUpdateNewsItem = useCallback(
    (index: number, field: keyof News[0], value: string) => {
      const newNews = [...values.news];
      newNews[index] = { ...newNews[index], [field]: value };
      setFieldValue('news', newNews);
    },
    [setFieldValue, values.news],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Page>
        <Section>
          <Typography variant="h5">{t('morningForm.weather')}</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label={t('morningForm.weatherTextPlaceholder')}
            name="weatherText"
            value={values.weatherText}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Typography variant="h5">{t('morningForm.news')}</Typography>
          {values.news.map((item, index) => (
            <Box key={index} display="flex" flexDirection="column" gap={1}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t('morningForm.newsTextPlaceholder')}
                value={item.text}
                onChange={(e) =>
                  handleUpdateNewsItem(index, 'text', e.target.value)
                }
              />
              <TextField
                fullWidth
                label={t('morningForm.newsUrlPlaceholder')}
                value={item.url}
                onChange={(e) =>
                  handleUpdateNewsItem(index, 'url', e.target.value)
                }
              />
              <TextField
                fullWidth
                label={t('morningForm.additionalInstructionsPlaceholder')}
                value={item.extra}
                onChange={(e) =>
                  handleUpdateNewsItem(index, 'extra', e.target.value)
                }
              />
              <Button
                onClick={() => handleRemoveNewsItem(index)}
                variant="outlined"
                color="error"
              >
                {t('morningForm.removeNewsItem')}
              </Button>
            </Box>
          ))}
          <Button onClick={handleAddNewsItem} variant="outlined">
            {t('morningForm.addNewsItem')}
          </Button>
        </Section>

        <Section>
          <Typography variant="h5">Текст для утра</Typography>
          <TextField
            fullWidth
            label="Заголовок"
            name="evening_text_header"
            value={values.evening_text_header}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Перед блоком"
            name="evening_text_before"
            value={values.evening_text_before}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Заголовок блока"
            name="evening_text_block_header"
            value={values.evening_text_block_header}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="После блока"
            name="evening_text_after"
            value={values.evening_text_after}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Typography variant="h5">{t('model')}</Typography>
          <div>
            {AI_MODELS.map((model) => (
              <FormControlLabel
                key={model}
                control={
                  <Radio
                    checked={values.selectedModel === model}
                    onChange={() => setFieldValue('selectedModel', model)}
                  />
                }
                label={model}
              />
            ))}
          </div>
        </Section>

        <Section>
          {!showGeneratedResponse ? (
            <Button variant="contained" type="submit">
              {t('common.generate')}
            </Button>
          ) : (
            <MorningPostPreview
              textHeader={values.evening_text_header || ''}
              textBefore={values.evening_text_before || ''}
              textAfter={values.evening_text_after || ''}
              textBlockHeader={values.evening_text_block_header || ''}
              selectedModel={values.selectedModel || ''}
              weatherPrompt={stringInject(values.weather_evening_prompt || '', {
                weather: values.weatherText,
              })}
              news={values.news || []}
              newsPrompt={values.evening_prompt || ''}
            />
          )}
        </Section>
      </Page>
    </form>
  );
};
