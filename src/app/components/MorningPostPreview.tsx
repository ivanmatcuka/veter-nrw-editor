import { Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import stringInject from 'stringinject';

import { GeneratedResponse } from './GeneratedResponse';

type News = Partial<{
  text: string;
  url: string;
  extra: string;
}>[];

type MorningPostPreviewProps = {
  textHeader: string;
  textBefore: string;
  textBlockHeader: string;
  textAfter: string;
  selectedModel: string;
  weatherPrompt: string;
  news: News;
  newsPrompt: string;
};
export const MorningPostPreview: FC<
  PropsWithChildren<MorningPostPreviewProps>
> = ({
  textAfter,
  textHeader,
  textBefore,
  textBlockHeader,
  selectedModel,
  weatherPrompt,
  news,
  newsPrompt,
}) => (
  <>
    <Typography variant="h5">{textHeader}</Typography>
    <Typography variant="h5">{textBefore}</Typography>
    <GeneratedResponse model={selectedModel} prompt={weatherPrompt} />
    <Typography variant="h5">{textBlockHeader}</Typography>
    {news.map((item, index) => (
      <GeneratedResponse
        key={index}
        model={selectedModel}
        prompt={stringInject(newsPrompt, {
          news_X_URL: item.url,
          news_X_add: item.extra,
          news_X_text: item.text,
        })}
      />
    ))}
    <Typography variant="h5">{textAfter}</Typography>
  </>
);
