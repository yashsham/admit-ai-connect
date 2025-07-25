import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, task = 'text-generation' } = await req.json();

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    console.log('Processing request with prompt:', prompt.substring(0, 100) + '...');

    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          do_sample: true,
          return_full_text: false,
          repetition_penalty: 1.1
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Hugging Face API error:', error);
      throw new Error(`Hugging Face API error: ${error}`);
    }

    const data = await response.json();
    let generatedText = '';

    console.log('HF API Response:', JSON.stringify(data).substring(0, 200));

    if (Array.isArray(data) && data.length > 0) {
      generatedText = data[0].generated_text || data[0].translation_text || '';
    } else if (data.generated_text) {
      generatedText = data.generated_text;
    } else if (typeof data === 'string') {
      generatedText = data;
    } else {
      console.log('Unexpected response format:', data);
      generatedText = JSON.stringify(data);
    }

    const finalText = generatedText.trim();
    console.log('Generated text length:', finalText.length);

    return new Response(JSON.stringify({ 
      generatedText: finalText,
      task,
      model: 'mistralai/Mistral-7B-Instruct-v0.1'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in huggingface-ai function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check the console logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});