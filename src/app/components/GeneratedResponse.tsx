'use client';

import ReplayIcon from '@mui/icons-material/Replay';
import { Box, IconButton, TextField } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { getChatGPTResponse, getClaudeResponse } from '../service';
import { useSettings } from '../SettingsContext';

type GeneratedResponseProps = {
  model: string;
  prompt: string;
};
export const GeneratedResponse: FC<GeneratedResponseProps> = ({
  model,
  prompt,
}) => {
  const { settings } = useSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError('');

    let res;
    let err;

    if (!settings?.api_chat_gpt || !settings?.api_claude) {
      setError('API keys are not set');
      setIsLoading(false);
      return;
    }

    if (model === 'Claude') {
      const { data, error } = await getClaudeResponse(
        settings.api_claude,
        prompt,
      );
      res = data;
      err = error;
    } else {
      const { data, error } = await getChatGPTResponse(
        settings.api_chat_gpt,
        prompt,
        (res) => setGeneratedText(res.text),
      );
      res = data;
      err = error;
    }

    if (err) setError(err);
    if (res) setGeneratedText(res);

    setIsLoading(false);
  }, [prompt, model, settings.api_chat_gpt, settings.api_claude]);

  return (
    <Box display="flex" gap={2} component="form" alignItems="flex-start">
      <IconButton onClick={handleGenerate} loading={isLoading} sx={{ mb: 2 }}>
        <ReplayIcon />
      </IconButton>
      <Box flex={1} display="flex" flexDirection="column" gap={2}>
        <TextField
          value={error ?? generatedText}
          fullWidth
          error={!!error}
          color={!!error ? 'error' : 'info'}
        />
        <TextField fullWidth multiline disabled size="small" value={prompt} />
      </Box>
    </Box>
  );
};
