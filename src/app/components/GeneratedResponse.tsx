'use client';

import ReplayIcon from '@mui/icons-material/Replay';
import { Box, IconButton, TextField } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { getChatGPTResponse, getClaudeResponse } from '../service';

type GeneratedResponseProps = {
  model: string;
  prompt: string;
  apiKey: string;
};
export const GeneratedResponse: FC<GeneratedResponseProps> = ({
  model,
  prompt,
  apiKey,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError('');

    let res;
    let err;

    if (model === 'Claude') {
      const { data, error } = await getClaudeResponse(apiKey, prompt);
      res = data;
      err = error;
    } else {
      const { data, error } = await getChatGPTResponse(apiKey, prompt, (res) =>
        setGeneratedText(res.text),
      );
      res = data;
      err = error;
    }

    if (err) setError(err);
    if (res) setGeneratedText(res);

    setIsLoading(false);
  }, [apiKey, prompt, model]);

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
