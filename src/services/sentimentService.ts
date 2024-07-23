import axios from 'axios';

const sentimentApiUrl = 'https://api.meaningcloud.com/sentiment-2.1';
const apiKey = 'cffcf81df0467221129291d2192c60f3';

export async function analyzeSentiment(text: string): Promise<string> {
  try {
    const response = await axios.post(sentimentApiUrl, null, {
      params: {
        key: apiKey,
        lang: 'pt',
        model: 'general_pt',
        txt: text,
      },
    });

    // Ensure that `score_tag` is a valid string for relevance
    const scoreTag = response.data.score_tag;
    console.log(scoreTag)
    return scoreTag;
  } catch (error: any) {
    throw new Error(`Failed to analyze sentiment: ${error.message}`);
  }
}

